"use client";

import { useRef, useState } from "react";

interface Props {
    onReady: (uploadId: string, playbackId: string, thumbnailUrl: string) => void;
    onClose: () => void;
    onStartUpload?: () => void;
}

const VideoUploader = ({ onReady, onClose, onStartUpload }: Props) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<"idle" | "uploading" | "processing" | "ready">("idle");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        setStatus("uploading");
        onStartUpload?.();
        // 1. ขอ upload URL จาก server
        const res = await fetch("/api/mux/upload", { method: "POST" });
        const { uploadId, uploadUrl } = await res.json();

        // 2. อัปโหลดตรงไปที่ Mux
        await new Promise<void>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.upload.onprogress = (e) => {
                if (e.lengthComputable) {
                    setProgress(Math.round((e.loaded / e.total) * 100));
                }
            };
            xhr.onload = () => resolve();
            xhr.onerror = () => reject();
            xhr.open("PUT", uploadUrl);
            xhr.send(file);
        });

        setStatus("processing");

        // 3. poll จนกว่า Mux จะ process เสร็จ
        const poll = async () => {
            const r = await fetch(`/api/mux/asset/${uploadId}`);
            const data = await r.json();

            if (data.status === "ready" && data.playbackId) {
                setStatus("ready");
                onReady(uploadId, data.playbackId, data.thumbnailUrl);
            } else {
                setTimeout(poll, 2000);
            }
        };
        poll();
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 w-96">
                <h3 className="font-semibold text-gray-700">Upload Video</h3>

                {status === "idle" && (
                    <>
                        <div
                            onClick={() => inputRef.current?.click()}
                            className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
                        >
                            <span className="text-gray-400 text-sm">Click to select video</span>
                        </div>
                        <input
                            ref={inputRef}
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFile(file);
                            }}
                        />
                    </>
                )}

                {status === "uploading" && (
                    <div className="w-full flex flex-col gap-2">
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                                className="bg-blue-500 h-2 rounded-full transition-all"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="text-sm text-gray-500 text-center">
                            Uploading... {progress}%
                        </span>
                    </div>
                )}

                {status === "processing" && (
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm text-gray-500">Processing video...</span>
                    </div>
                )}

                <button onClick={onClose} className="text-sm text-gray-400 hover:text-gray-600">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default VideoUploader;