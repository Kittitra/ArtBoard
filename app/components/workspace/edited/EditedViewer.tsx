"use client";

import { useState, useRef, useEffect } from "react";
import { Paperclip, ChevronDown, Plus } from "lucide-react";
import { EditedVersion, User } from "@/app/generated/prisma";
import VideoUploader from "../../drag/VideoUploader";
import { createNewEditedVersion } from "@/action/video";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MuxPlayer from "@mux/mux-player-react";

interface Comment {
  id: string;
  author: string;
  avatar?: string;
  text: string;
}

interface Props {
  versions: EditedVersion[];
  comments: Comment[];
  moviePath: string; // animationId
  user: User;
  editedTitle: string; // เพิ่ม prop สำหรับชื่อของ animation
  loading?: boolean; // เพิ่ม prop สำหรับสถานะการโหลด
}


const EditedViewer = ({ versions: initialVersions, comments, moviePath, editedTitle, loading }: Props) => {
  const [versions, setVersions] = useState<EditedVersion[]>(initialVersions ?? []);
  const [selectedVersionId, setSelectedVersionId] = useState(initialVersions[0]?.id ?? "");
  const [versionDropdownOpen, setVersionDropdownOpen] = useState(false);

  // Add version flow
  const [step, setStep] = useState<"idle" | "form" | "upload">("idle");
  const [versionLabel, setVersionLabel] = useState("");
  const [labelError, setLabelError] = useState("");
  const [commentText, setCommentText] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedVersion = versions.find((v) => v.id === selectedVersionId && v.editedId === moviePath) ?? null;

  const version = versions.filter((v) => v.editedId === moviePath);

  console.log("version:", version);

  // --- Add Version handlers ---
  const handleOpenForm = () => {
    setVersionLabel("");
    setLabelError("");
    setStep("form");
  };

  const handleSubmitForm = () => {
    if (!versionLabel.trim()) {
      setLabelError("Please enter a version label");
      return;
    }
    const isDuplicate = versions.some((v) => v.label === versionLabel);
    if (isDuplicate) {
      setLabelError("Label already in use");
      return;
    }
    setStep("upload");
  };

  const handleVersionReady = async (
    uploadId: string,
    playbackId: string,
    thumbnailUrl: string
  ) => {
    const result = await createNewEditedVersion(
      {
        label: versionLabel,
        muxUploadId: uploadId,
        muxPlaybackId: playbackId,
        thumbnailUrl,
        videoId: moviePath,
      },
      "edited"
    );

    if (result?.error) {
      setLabelError(result.error);
      setStep("form");
      return;
    }

    if (result?.videoVersion) {
      setVersions((prev) => [...prev, result.videoVersion]);
      setSelectedVersionId(result.videoVersion.id);
    }

    setStep("idle");
  };

  const handleSend = () => {
    if (!commentText.trim()) return;
    setCommentText("");
    setAttachment(null);
  };

  useEffect(() => {
    if (initialVersions.length > 0 && !selectedVersionId) {
      setSelectedVersionId(initialVersions[0].id);
    }
    setVersions(initialVersions);
  }, [initialVersions]);

  return (
    <div className="flex flex-row flex-1 h-screen bg-[#2b2b2b] text-black p-10">
      {/* ── Left ── */}
      <div className="flex flex-col flex-1 p-6 gap-4 overflow-auto">
        <div className="w-full rounded-lg overflow-hidden bg-black aspect-video relative">
          {loading ? (
            // กำลังโหลดข้อมูล versions จาก server
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-400 text-sm">Loading...</span>
            </div>
          ) : selectedVersion?.muxPlaybackId  ? (
            <MuxPlayer
              key={selectedVersion.muxPlaybackId}
              playbackId={selectedVersion.muxPlaybackId}
              metadata={{ video_title: selectedVersion.label ?? "Untitled" }}
              className="w-full h-full"
              style={{ aspectRatio: "16/9" }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
              No video available
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 mt-1">
          <h1 className="text-2xl font-semibold text-white">{editedTitle}</h1>
          <p className="text-sm text-gray-400">
            Upload Date{" "}
            <span className="text-gray-300">
              {selectedVersion?.createdAt
                ? new Date(selectedVersion.createdAt).toLocaleDateString()
                : "-"}
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm text-blue-400">Link to</span>
          <button className="text-sm text-gray-400 hover:text-gray-200 text-left w-fit">open link</button>
          <button className="text-sm text-gray-400 hover:text-gray-200 text-left w-fit">open link split</button>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex flex-col w-[300px] border-l border-[#3a3a3a]">

        {/* Version Dropdown + Add button */}
        <div className="relative p-4 border-b border-[#3a3a3a] flex items-center gap-2">
          <button
            onClick={() => setVersionDropdownOpen((prev) => !prev)}
            className="flex-1 flex items-center justify-between px-3 py-2 bg-[#3a3a3a] rounded-md text-sm text-white hover:bg-[#444] transition-colors"
          >
            <span>{selectedVersion?.label ?? "Select version"}</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${versionDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* ปุ่ม Add Version */}
          <button
            onClick={handleOpenForm}
            title="Add new version"
            className="p-2 bg-[#3a3a3a] hover:bg-[#555] text-white rounded-md transition-colors"
          >
            <Plus size={16} />
          </button>

          {versionDropdownOpen && (
            <div className="absolute left-4 right-4 top-[calc(100%-8px)] z-50 bg-[#3a3a3a] rounded-md shadow-lg overflow-hidden">
              {version.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setSelectedVersionId(v.id);
                    setVersionDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-[#555] transition-colors ${
                    v.id === selectedVersionId ? "text-blue-400" : "text-white"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Comment Input */}
        <div className="flex flex-col gap-2 p-4 border-b border-[#3a3a3a]">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Comment"
            className="w-full bg-white text-black text-sm px-3 py-2 rounded-md outline-none"
          />
          <div className="flex items-center justify-between">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200"
            >
              <Paperclip size={13} />
              <span>{attachment ? attachment.name : "attach_file"}</span>
            </button>
            <button
              onClick={handleSend}
              className="text-sm text-white bg-[#555] hover:bg-[#666] px-3 py-1 rounded-md"
            >
              Send
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(e) => setAttachment(e.target.files?.[0] ?? null)}
          />
        </div>

        {/* Comments List */}
        <div className="flex flex-col gap-3 p-4 overflow-auto flex-1">
          {comments.length === 0 && (
            <p className="text-xs text-gray-500 text-center mt-4">No comments yet</p>
          )}
          {comments.map((c) => (
            <div key={c.id} className="flex flex-col gap-1 bg-[#333] rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#555] flex items-center justify-center text-xs font-semibold overflow-hidden">
                  {c.avatar ? (
                    <img src={c.avatar} alt={c.author} className="w-full h-full object-cover" />
                  ) : (
                    c.author[0]?.toUpperCase()
                  )}
                </div>
                <span className="text-sm font-medium">{c.author}</span>
              </div>
              <p className="text-sm text-gray-300 ml-8">{c.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Form กรอก label */}
      {step === "form" && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-5 w-96">
            <h3 className="font-semibold text-gray-700">New Version</h3>
            <div className="flex flex-col gap-2">
              <Label htmlFor="version-label" className="text-gray-700">Version Label</Label>
              <Input
                id="version-label"
                placeholder="e.g. Version 2, Draft 3..."
                value={versionLabel}
                onChange={(e) => {
                  setVersionLabel(e.target.value);
                  setLabelError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmitForm()}
              />
              {labelError && <span className="text-red-500 text-xs">{labelError}</span>}
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setStep("idle")}>Cancel</Button>
              <Button onClick={handleSubmitForm}>Next</Button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Upload */}
      {step === "upload" && (
        <VideoUploader
          onReady={handleVersionReady}
          onClose={() => setStep("form")}
        />
      )}
    </div>
  );
};

export default EditedViewer;