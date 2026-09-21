// components/drag/AudioPanel.tsx
"use client";

import { useRef, useState } from "react";
import { AudioItem } from "@/lib/type";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

interface Props {
    audio: AudioItem
    onUpdate: (id: string, updates: Partial<AudioItem>) => void
    onClose: () => void
    audioPlayer: ReturnType<typeof useAudioPlayer>
}

const AudioPanel = ({ audio, onUpdate, onClose, audioPlayer }: Props) => {
    const { play, seek, setVolume, playingId, progress, duration } = audioPlayer;

    const isPlaying = playingId === audio.id;
    const currentProgress = progress[audio.id] || 0;
    const currentDuration = duration[audio.id] || 0;

    const [urlInput, setUrlInput] = useState(audio.url || "");
    const [volume, setVolumeState] = useState(1);
    const overlayRef = useRef<HTMLDivElement>(null);

    const getProxyUrl = (url: string) => {
        if (!url) return "";
        if (url.startsWith("/")) return url;
        return `/api/audio-proxy?url=${encodeURIComponent(url)}`;
    };

    const convertToDirect = (url: string): string => {
        const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (driveMatch) {
            return `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`;
        }
        if (url.includes("dropbox.com")) {
            return url.replace("dl=0", "dl=1").replace("www.dropbox.com", "dl.dropboxusercontent.com");
        }
        return url;
    };

    const extractTitle = (url: string) => {
        try {
            const parts = url.split("/");
            const filename = parts[parts.length - 1];
            return decodeURIComponent(filename.split("?")[0]) || "Audio";
        } catch {
            return "Audio";
        }
    };

    const handleLoadUrl = () => {
        if (!urlInput.trim()) return;
        const directUrl = convertToDirect(urlInput.trim());
        onUpdate(audio.id, {
            url: directUrl,
            title: extractTitle(urlInput.trim()),
            status: "ready",
        });
    };

    const handleVolumeChange = (v: number) => {
        setVolumeState(v);
        setVolume(v);
    };

    const formatTime = (sec: number) => {
        if (!sec || isNaN(sec)) return "0:00";
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[999] flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        >
            <div
                className="rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                style={{ width: 400, background: "#1e1e2e" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm">
                            🎵
                        </div>
                        <span className="text-white font-medium text-sm truncate max-w-[220px]">
                            {audio.title || "Audio"}
                        </span>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
                </div>

                {/* URL Input */}
                <div className="px-5 py-4 border-b border-white/10">
                    <div className="flex gap-2">
                        <input
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleLoadUrl()}
                            placeholder="Paste audio URL (.mp3, .wav, .ogg...)"
                            className="flex-1 bg-white/10 text-white text-sm rounded-lg px-3 py-2 outline-none placeholder:text-gray-500 border border-white/10 focus:border-indigo-400"
                        />
                        <button
                            onClick={handleLoadUrl}
                            className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm rounded-lg"
                        >
                            Load
                        </button>
                    </div>
                </div>

                {/* Player */}
                {audio.status === "ready" && audio.url && (
                    <div className="px-5 py-5 flex flex-col gap-4">

                        {/* Waveform */}
                        {/* <div className="flex gap-0.5 items-center h-10">
                            {Array.from({ length: 40 }).map((_, i) => {
                                const barH = 8 + Math.abs(Math.sin(i * 0.5 + 1) * 20);
                                const filled = i / 40 < currentProgress;
                                return (
                                    <div
                                        key={i}
                                        className="rounded-full transition-colors cursor-pointer"
                                        style={{
                                            width: 4,
                                            height: barH,
                                            backgroundColor: filled ? "#6366f1" : "#374151",
                                        }}
                                        onClick={() => seek(audio.id, i / 40)}
                                    />
                                );
                            })}
                        </div> */}

                        {/* Controls */}
                        <div className="flex items-center gap-4">
                            {/* Play/Pause */}
                            <button
                                onClick={() => play(audio.id, getProxyUrl(audio.url))}
                                className="w-10 h-10 rounded-full bg-indigo-500 hover:bg-indigo-600 flex items-center justify-center text-white"
                            >
                                {isPlaying ? "⏸" : "▶"}
                            </button>

                            {/* Seek + Time */}
                            <div className="flex items-center gap-2 flex-1">
                                <span className="text-xs text-gray-400 w-8">
                                    {formatTime(currentProgress * currentDuration)}
                                </span>
                                <input
                                    type="range"
                                    min={0} max={1} step={0.001}
                                    value={currentProgress}
                                    onChange={(e) => seek(audio.id, Number(e.target.value))}
                                    className="flex-1 accent-indigo-500"
                                />
                                <span className="text-xs text-gray-400 w-8">
                                    {formatTime(currentDuration)}
                                </span>
                            </div>

                            {/* Volume */}
                            <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-400">🔊</span>
                                <input
                                    type="range"
                                    min={0} max={1} step={0.01}
                                    value={volume}
                                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                                    className="w-16 accent-indigo-500"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Idle state */}
                {audio.status === "idle" && (
                    <div className="px-5 py-8 flex flex-col items-center gap-2">
                        <span className="text-4xl">🎵</span>
                        <span className="text-gray-400 text-sm">Paste an audio URL above to get started</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AudioPanel;