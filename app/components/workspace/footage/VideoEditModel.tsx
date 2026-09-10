"use client";

import { useEffect, useRef, useState } from "react";
import { X, Play, Pause, Scissors, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createEditedFootageVersion } from "@/action/video-edit-action";

const SPEED_OPTIONS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 4];
const LOOKAHEAD_SECONDS = 1.2; // how far before a segment boundary to pre-seek the hidden video

interface Segment {
  id: string;
  start: number;
  end: number;
  speed: number;
}

interface Props {
  videoId: string;
  sourcePlaybackId: string;
  mp4Filename: string;
  defaultLabel?: string;
  onClose: () => void;
  onSaved: (version: any) => void;
}

let segCounter = 0;
const newSegId = () => `seg-${Date.now()}-${segCounter++}`;

export default function VideoEditModal({
  videoId,
  sourcePlaybackId,
  mp4Filename,
  defaultLabel,
  onClose,
  onSaved,
}: Props) {
  // Two video elements, only one visible/audible at a time. The hidden one
  // is used to pre-seek + pre-decode the next segment ahead of time so the
  // swap at the boundary is instant, with no visible stutter.
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [activeIsA, setActiveIsA] = useState(true);
  const rafRef = useRef<number | null>(null);
  const preSeekedSegmentId = useRef<string | null>(null);

  const activeRef = activeIsA ? videoARef : videoBRef;
  const hiddenRef = activeIsA ? videoBRef : videoARef;

  const [duration, setDuration] = useState(0);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const [label, setLabel] = useState(defaultLabel ? `${defaultLabel} (edited)` : "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [isBuffering, setIsBuffering] = useState(false);

  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoadingSource, setIsLoadingSource] = useState(true);
  const [loadError, setLoadError] = useState("");

  const sourceUrl = `https://stream.mux.com/${sourcePlaybackId}/${mp4Filename}`;

  // Download the whole source file into memory once, up front - removes
  // network latency from the picture entirely so we can isolate/fix the
  // remaining decoder-side seek cost with the dual-video technique below
  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    let objectUrl: string | null = null;

    async function loadSource() {
      setIsLoadingSource(true);
      setLoadError("");
      setLoadProgress(0);
      try {
        const res = await fetch(sourceUrl, { signal: controller.signal });
        if (!res.ok || !res.body) throw new Error(`Failed to fetch source (${res.status})`);
        const contentLength = Number(res.headers.get("Content-Length")) || 0;
        const reader = res.body.getReader();
        const chunks: Uint8Array[] = [];
        let received = 0;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          received += value.length;
          if (contentLength > 0) setLoadProgress(received / contentLength);
        }
        const blob = new Blob(chunks as BlobPart[], { type: "video/mp4" });
        objectUrl = URL.createObjectURL(blob);
        if (!cancelled) {
          setBlobUrl(objectUrl);
          setIsLoadingSource(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to preload video:", err);
          setLoadError("Failed to load video for editing. Please try again.");
          setIsLoadingSource(false);
        }
      }
    }

    loadSource();
    return () => {
      cancelled = true;
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [sourceUrl]);

  const handleLoadedMetadata = () => {
    const video = videoARef.current;
    if (!video) return;
    setDuration(video.duration);
    const initial: Segment = { id: newSegId(), start: 0, end: video.duration, speed: 1 };
    setSegments([initial]);
    setSelectedSegmentId(initial.id);
  };

  // Force the browser to fully initialize the decode pipeline for BOTH
  // video elements right away, instead of letting the first real seek near
  // a segment boundary pay that one-time cold-start cost. This is separate
  // from the blob download - it's the codec/decoder setup cost, which can
  // be significant right after a hard refresh.
  useEffect(() => {
    if (!blobUrl) return;
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b) return;

    let cancelled = false;

    async function warmUp(video: HTMLVideoElement) {
      const wasMuted = video.muted;
      try {
        video.muted = true;
        await video.play();
        if (cancelled) return;
        video.pause();
        video.currentTime = 0;
      } catch {
        // ignore - some browsers reject play() before enough data is buffered,
        // that's fine, the real seek later will just pay the init cost then
      } finally {
        video.muted = wasMuted;
      }
    }

    warmUp(a);
    warmUp(b);

    return () => {
      cancelled = true;
    };
  }, [blobUrl]);

  const sortedSegments = [...segments].sort((a, b) => a.start - b.start);
  const findSegmentAt = (time: number) => sortedSegments.find((s) => time >= s.start && time < s.end);
  const findNextSegment = (afterEnd: number) =>
    sortedSegments.find((s) => s.start >= afterEnd) ?? sortedSegments[0];

  // Buffering indicator - only meaningful for the visible/active element
  useEffect(() => {
    const video = activeRef.current;
    if (!video) return;
    const onWaiting = () => setIsBuffering(true);
    const onPlaying = () => setIsBuffering(false);
    const onCanPlay = () => setIsBuffering(false);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("canplay", onCanPlay);
    return () => {
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("canplay", onCanPlay);
    };
  }, [activeIsA]);

  const togglePlay = async () => {
    const video = activeRef.current;
    if (!video || sortedSegments.length === 0) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    let active = findSegmentAt(video.currentTime);
    if (!active) {
      const next = findNextSegment(video.currentTime);
      video.currentTime = next.start;
      active = next;
    }
    video.playbackRate = active.speed;
    setIsPlaying(true);

    try {
      await video.play();
    } catch (err) {
      if ((err as DOMException)?.name !== "AbortError") {
        console.error("Video play failed:", err);
      }
      setIsPlaying(false);
    }
  };

  // Main playback loop: advances currentTime for UI, pre-seeks the hidden
  // video ahead of upcoming boundaries, and performs the instant swap
  useEffect(() => {
    const tick = () => {
      const video = activeRef.current;
      const hidden = hiddenRef.current;
      if (!video || !hidden) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const active = findSegmentAt(video.currentTime);

      // Watchdog: if we believe playback should be running but the element
      // reports paused (e.g. a programmatic play() got silently rejected by
      // the browser's autoplay policy after the segment swap), retry play()
      // immediately instead of sitting frozen until some unrelated state
      // change happens to nudge it.
      if (isPlaying && video.paused) {
        video.play().catch((err) => {
          if ((err as DOMException)?.name !== "AbortError") {
            console.error("[watchdog] play() retry failed:", err);
          }
        });
      }

      if (!active) {
        // fell into a gap - jump immediately (rare: only happens on manual
        // seeks while paused, not during normal segment-to-segment playback)
        const next = sortedSegments.find((s) => s.start >= video.currentTime) ?? sortedSegments[0];
        if (next) video.currentTime = next.start;
      } else {
        // Keep playbackRate in sync with whichever segment is actually
        // under the playhead right now - self-healing against any path
        // that moves currentTime without explicitly setting playbackRate
        // (e.g. a manual timeline click while mid-playback)
        if (video.playbackRate !== active.speed) {
          video.playbackRate = active.speed;
        }

        const remaining = active.end - video.currentTime;
        const next = findNextSegment(active.end);

        // Pre-seek the hidden element once we're close to the boundary, so
        // the decode happens while the active element is still playing
        if (remaining <= LOOKAHEAD_SECONDS && preSeekedSegmentId.current !== active.id && next) {
          preSeekedSegmentId.current = active.id;
          hidden.pause();
          hidden.muted = true;
          hidden.currentTime = next.start;
        }

        // Boundary reached - swap to the pre-seeked hidden element instantly
        if (video.currentTime >= active.end && next) {
          video.pause();
          hidden.playbackRate = next.speed;
          // Start muted first - browsers always allow muted autoplay, so this
          // avoids any risk of a programmatic unmuted play() getting silently
          // rejected by autoplay policy. Unmute right after it's confirmed playing.
          hidden.muted = true;
          hidden
            .play()
            .then(() => {
              hidden.muted = false;
            })
            .catch((err) => {
              if ((err as DOMException)?.name !== "AbortError") {
                console.error("[swap] play() failed:", err);
              }
            });
          preSeekedSegmentId.current = null;
          setActiveIsA((prev) => !prev);
        }
      }

      setCurrentTime(video.currentTime);
      rafRef.current = requestAnimationFrame(tick);
    };

    if (isPlaying) rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, segments, activeIsA]);

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const time = Math.min(duration, Math.max(0, ratio * duration));
    const video = activeRef.current;
    if (video) {
      video.currentTime = time;
      const seg = findSegmentAt(time);
      if (seg) video.playbackRate = seg.speed;
    }
    setCurrentTime(time);
    preSeekedSegmentId.current = null;
  };

  const handleSplit = () => {
    const active = findSegmentAt(currentTime);
    if (!active) return;
    if (currentTime - active.start < 0.2 || active.end - currentTime < 0.2) return;

    const left: Segment = { id: newSegId(), start: active.start, end: currentTime, speed: active.speed };
    const right: Segment = { id: newSegId(), start: currentTime, end: active.end, speed: active.speed };

    setSegments((prev) => [...prev.filter((s) => s.id !== active.id), left, right]);
    setSelectedSegmentId(right.id);
  };

  const handleDeleteSegment = (id: string) => {
    setSegments((prev) => (prev.length <= 1 ? prev : prev.filter((s) => s.id !== id)));
    setSelectedSegmentId(null);
  };

  const updateSegmentBound = (id: string, key: "start" | "end", value: number) => {
    setSegments((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        if (key === "start") return { ...s, start: Math.min(value, s.end - 0.1) };
        return { ...s, end: Math.max(value, s.start + 0.1) };
      })
    );
  };

  const updateSegmentSpeed = (id: string, speed: number) => {
    setSegments((prev) => prev.map((s) => (s.id === id ? { ...s, speed } : s)));
    const video = activeRef.current;
    if (video && findSegmentAt(currentTime)?.id === id) {
      video.playbackRate = speed;
    }
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const totalOutputDuration = sortedSegments.reduce((sum, s) => sum + (s.end - s.start) / s.speed, 0);

  const handleSave = async () => {
    if (!label.trim()) {
      setError("Please enter a version label");
      return;
    }
    if (sortedSegments.length === 0) {
      setError("At least one segment must remain");
      return;
    }
    setError("");
    setIsSaving(true);
    try {
      const result = await createEditedFootageVersion({
        footageId: videoId,
        sourcePlaybackId,
        sourceMp4Filename: mp4Filename,
        label,
        segments: sortedSegments.map(({ start, end, speed }) => ({ start, end, speed })),
      });
      if (result?.error) {
        setError(result.error);
        setIsSaving(false);
        return;
      }
      if (result?.videoVersion) onSaved(result.videoVersion);
    } catch (err) {
      console.error(err);
      setError("Failed to process video. Please try again.");
      setIsSaving(false);
    }
  };

  const selectedSegment = segments.find((s) => s.id === selectedSegmentId) ?? null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70">
      <div className="bg-[#1f1f1f] rounded-2xl shadow-2xl w-[760px] max-w-[95vw] flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Scissors size={16} /> Edit Video
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="w-full rounded-lg overflow-hidden bg-black aspect-video relative">
          {blobUrl && (
            <>
              <video
                ref={videoARef}
                src={blobUrl}
                onLoadedMetadata={handleLoadedMetadata}
                className="absolute inset-0 w-full h-full"
                style={{ opacity: activeIsA ? 1 : 0, zIndex: activeIsA ? 1 : 0 }}
                playsInline
              />
              <video
                ref={videoBRef}
                src={blobUrl}
                className="absolute inset-0 w-full h-full"
                style={{ opacity: activeIsA ? 0 : 1, zIndex: activeIsA ? 0 : 1 }}
                playsInline
              />
            </>
          )}
          {isLoadingSource && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/80 z-10">
              <Loader2 size={28} className="text-white animate-spin" />
              <span className="text-white text-sm">Loading video... {Math.round(loadProgress * 100)}%</span>
              <div className="w-48 h-1.5 bg-[#3a3a3a] rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 transition-all" style={{ width: `${loadProgress * 100}%` }} />
              </div>
            </div>
          )}
          {loadError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 px-6 z-10">
              <span className="text-red-400 text-sm text-center">{loadError}</span>
            </div>
          )}
          {isBuffering && !isLoadingSource && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none z-10">
              <Loader2 size={28} className="text-white animate-spin" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            disabled={isLoadingSource}
            className="p-2 bg-[#3a3a3a] hover:bg-[#444] disabled:opacity-40 rounded-full text-white"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <span className="text-xs text-gray-400 tabular-nums">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <div className="flex-1" />
          <button
            onClick={handleSplit}
            disabled={isLoadingSource}
            className="flex items-center gap-1.5 text-xs text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-40 px-3 py-1.5 rounded-md"
          >
            <Scissors size={13} /> Split here
          </button>
        </div>

        {duration > 0 && (
          <div className="flex flex-col gap-2">
            <div
              onMouseDown={handleTimelineClick}
              className="relative h-10 rounded-md bg-[#141414] cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#2a2a2a,#2a2a2a_4px,#1a1a1a_4px,#1a1a1a_8px)]" />
              {sortedSegments.map((s) => (
                <div
                  key={s.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSegmentId(s.id);
                  }}
                  className={`absolute top-0 bottom-0 border-2 flex items-center justify-center ${
                    s.id === selectedSegmentId ? "bg-blue-500/70 border-blue-300" : "bg-blue-600/40 border-blue-600/60"
                  }`}
                  style={{ left: `${(s.start / duration) * 100}%`, width: `${((s.end - s.start) / duration) * 100}%` }}
                  title={`${formatTime(s.start)} – ${formatTime(s.end)} @ ${s.speed}x`}
                >
                  {s.speed !== 1 && (
                    <span className="text-[10px] text-white font-semibold pointer-events-none">{s.speed}x</span>
                  )}
                </div>
              ))}
              <div className="absolute top-0 bottom-0 w-0.5 bg-white" style={{ left: `${(currentTime / duration) * 100}%` }} />
            </div>
            <p className="text-xs text-gray-500">
              Output length: {formatTime(totalOutputDuration)} — click timeline to move playhead, "Split here" to cut
            </p>
          </div>
        )}

        <div className="flex flex-col gap-1.5 max-h-32 overflow-auto">
          {sortedSegments.map((s, idx) => (
            <div
              key={s.id}
              onClick={() => setSelectedSegmentId(s.id)}
              className={`flex items-center justify-between px-3 py-1.5 rounded-md text-xs cursor-pointer ${
                s.id === selectedSegmentId ? "bg-[#3a3a3a]" : "bg-[#262626] hover:bg-[#2f2f2f]"
              }`}
            >
              <span className="text-gray-300">
                Segment {idx + 1}: {formatTime(s.start)} – {formatTime(s.end)}
                {s.speed !== 1 && <span className="text-blue-400"> · {s.speed}x</span>}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteSegment(s.id);
                }}
                disabled={segments.length <= 1}
                className="text-gray-500 hover:text-red-400 disabled:opacity-30 disabled:hover:text-gray-500"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>

        {selectedSegment && (
          <div className="flex flex-col gap-3 p-3 bg-[#262626] rounded-md">
            <div className="flex items-end gap-3">
              <div className="flex flex-col gap-1">
                <Label className="text-gray-400 text-xs">Start (s)</Label>
                <Input
                  type="number"
                  step={0.1}
                  value={selectedSegment.start.toFixed(1)}
                  onChange={(e) => updateSegmentBound(selectedSegment.id, "start", Number(e.target.value))}
                  className="bg-[#1f1f1f] text-white border-[#3a3a3a] w-24 h-8 text-xs"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-gray-400 text-xs">End (s)</Label>
                <Input
                  type="number"
                  step={0.1}
                  value={selectedSegment.end.toFixed(1)}
                  onChange={(e) => updateSegmentBound(selectedSegment.id, "end", Number(e.target.value))}
                  className="bg-[#1f1f1f] text-white border-[#3a3a3a] w-24 h-8 text-xs"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-gray-400 text-xs">Speed for this segment</Label>
              <div className="flex gap-2 flex-wrap">
                {SPEED_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateSegmentSpeed(selectedSegment.id, s)}
                    className={`px-3 py-1 rounded-md text-xs ${
                      selectedSegment.speed === s ? "bg-blue-500 text-white" : "bg-[#3a3a3a] text-gray-300 hover:bg-[#444]"
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 pt-2 border-t border-[#3a3a3a]">
          <Label className="text-gray-300 text-xs">New version label</Label>
          <Input
            value={label}
            onChange={(e) => {
              setLabel(e.target.value);
              setError("");
            }}
            placeholder="e.g. Trimmed, middle cut, slow-mo ending"
            className="bg-[#2b2b2b] text-white border-[#3a3a3a]"
          />
          {error && <span className="text-red-400 text-xs">{error}</span>}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving || isLoadingSource}>
            {isSaving ? (
              <span className="flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" /> Processing...
              </span>
            ) : (
              "Save as new version"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}