// components/drag/ImageUploader.tsx
"use client";

import { useRef, useState } from "react";

interface Props {
    onUploaded: (url: string, publicId: string, width: number, height: number) => void;
    onStartUpload?: () => void;
    onClose: () => void;
}

const ImageUploader = ({ onUploaded, onStartUpload, onClose }: Props) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        if (!file.type.startsWith("image/")) {
            setError("Please select an image file");
            setStatus("error");
            return;
        }

        setStatus("uploading");
        onStartUpload?.();

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        try {
            const xhr = new XMLHttpRequest();
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

            const result = await new Promise<any>((resolve, reject) => {
                xhr.upload.onprogress = (e) => {
                    if (e.lengthComputable) {
                        setProgress(Math.round((e.loaded / e.total) * 100));
                    }
                };
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(new Error("Upload failed"));
                    }
                };
                xhr.onerror = () => reject(new Error("Upload failed"));
                xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);
                xhr.send(formData);
            });

            onUploaded(result.secure_url, result.public_id, result.width, result.height);
        } catch (err) {
            setError("Upload failed. Please try again.");
            setStatus("error");
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 w-96">
                <h3 className="font-semibold text-gray-700">Upload Image</h3>

                {status === "idle" && (
                    <>
                        <div
                            onClick={() => inputRef.current?.click()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                            className="w-full h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors gap-2"
                        >
                            <span className="text-3xl">🖼️</span>
                            <span className="text-gray-400 text-sm">Click or drag image here</span>
                        </div>
                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
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

                {status === "error" && (
                    <div className="text-center">
                        <p className="text-red-500 text-sm mb-3">{error}</p>
                        <button
                            onClick={() => { setStatus("idle"); setError(""); }}
                            className="text-sm text-blue-500 hover:underline"
                        >
                            Try again
                        </button>
                    </div>
                )}

                <button onClick={onClose} className="text-sm text-gray-400 hover:text-gray-600">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ImageUploader;