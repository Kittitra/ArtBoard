// components/drag/VideoIcon.tsx
"use client";

import { Group, Rect, Text, Image as KonvaImage } from "react-konva";
import { VideoItem } from "@/lib/type";
import { useState, useEffect } from "react";

// Player popup แยกต่างหาก
import dynamic from "next/dynamic";
const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), { ssr: false });

// VideoPlayer popup
export const VideoPlayer = ({ playbackId, onClose }: {
    playbackId: string;
    onClose: () => void;
}) => (
    <div
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70"
        onClick={onClose}
    >
        <div
            className="rounded-xl overflow-hidden shadow-2xl"
            style={{ width: 800 }}
            onClick={(e) => e.stopPropagation()}
        >
            <MuxPlayer
                playbackId={playbackId}
                style={{ width: "100%", aspectRatio: "16/9" }}
                autoPlay={false}
            />
        </div>
    </div>
);