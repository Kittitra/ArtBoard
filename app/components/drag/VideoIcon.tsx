// components/drag/VideoIcon.tsx
"use client";

import { Group, Rect, Text, Image as KonvaImage } from "react-konva";
import { VideoItem } from "@/lib/type";
import { useState, useEffect } from "react";

type Props = {
    videos: VideoItem[]
    selectedVideoId: string | null
    selectedIds?: string[]
    parentBoardId?: string
    updateVideo: (id: string, updates: Partial<VideoItem>) => void
    selectVideo: (id: string) => void
    setSelectedVideoId: (id: string | null) => void
    onDragMove?: () => void
    onDragStart?: (id: string, x: number, y: number) => void
    onDragMove_group?: (id: string, x: number, y: number) => void
    onDragEnd?: (id: string, x: number, y: number) => void
    onOpenVideo?: (id: string) => void
    onSelect?: () => void
}

const MIN_SIZE = 80;
const RESIZE_HANDLE_SIZE = 10;

const ThumbnailImage = ({ src, width, height }: {
    src: string;
    width: number;
    height: number;
}) => {
    const [image, setImage] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        if (!src) return;
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.onload = () => setImage(img);
        img.src = src;
    }, [src]);

    if (!image) return null;

    return (
        <KonvaImage
            image={image}
            width={width}
            height={height}
            cornerRadius={0}
        />
    );
};

const VideoIcon = ({
    videos, selectedVideoId, selectedIds, parentBoardId,
    updateVideo, selectVideo, setSelectedVideoId,
    onDragMove, onDragStart, onDragMove_group, onDragEnd,
    onOpenVideo, onSelect,
}: Props) => {
    return (
        <>
            {videos.map((video) => {
                if (video.parentBoardId !== parentBoardId) return null;

                const isSelected = selectedVideoId === video.id;
                const isGroupSelected = selectedIds?.includes(video.id);

                return (
                    <Group key={video.id}>
                        <Group
                            x={video.x}
                            y={video.y}
                            draggable
                            onClick={() => {
                                onSelect?.();
                                selectVideo(video.id);
                            }}
                            onTap={() => {
                                onSelect?.();
                                selectVideo(video.id);
                            }}
                            onDblClick={() => onOpenVideo?.(video.id)}
                            onDblTap={() => onOpenVideo?.(video.id)}
                            onDragStart={(e) => {
                                const { x, y } = e.target.position();
                                onDragStart?.(video.id, x, y);
                            }}
                            onDragMove={(e) => {
                                const { x, y } = e.target.position();
                                updateVideo(video.id, { x, y });
                                onDragMove?.();
                                if (isGroupSelected) onDragMove_group?.(video.id, x, y);
                            }}
                            onDragEnd={(e) => {
                                const { x, y } = e.target.position();
                                onDragEnd?.(video.id, x, y);
                            }}
                        >
                            {/* กล่อง thumbnail หรือ placeholder */}
                            {video.thumbnailUrl ? (
                                <ThumbnailImage
                                    src={video.thumbnailUrl}
                                    width={video.width}
                                    height={video.height}
                                />
                            ) : (
                                <>
                                    <Rect
                                        width={video.width}
                                        height={video.height}
                                        fill={video.status === "processing" ? "#f3f4f6" : "#1a1a2e"}
                                        cornerRadius={0}
                                        stroke={isGroupSelected ? "#4A90D9" : isSelected ? "#aaa" : "#e5e7eb"}
                                        strokeWidth={1.5}
                                    />

                                    {/* icon กลาง */}
                                    <Text
                                        y={video.height / 2 - 16}
                                        width={video.width}
                                        text={video.status === "processing" ? "⏳" : "🎬"}
                                        fontSize={24}
                                        align="center"
                                    />

                                    {/* status text */}
                                    <Text
                                        y={video.height / 2 + 12}
                                        width={video.width}
                                        text={
                                            video.status === "uploading" ? "Uploading..."
                                            : video.status === "processing" ? "Processing..."
                                            : video.status === "error" ? "Error"
                                            : "Click to play"
                                        }
                                        fontSize={10}
                                        fontFamily="Inter, system-ui, sans-serif"
                                        fill={video.status === "processing" ? "#9ca3af" : "#6b7280"}
                                        align="center"
                                    />
                                </>
                            )}

                            {/* overlay border ตอน selected */}
                            <Rect
                                width={video.width}
                                height={video.height}
                                fill="transparent"
                                cornerRadius={0}
                                stroke={isGroupSelected ? "#4A90D9" : isSelected ? "#aaa" : "transparent"}
                                strokeWidth={2}
                            />

                            {/* play button overlay ตอนมี thumbnail */}
                            {video.thumbnailUrl && (
                                <>
                                    <Rect
                                        x={video.width / 2 - 18}
                                        y={video.height / 2 - 18}
                                        width={36}
                                        height={36}
                                        fill="rgba(0,0,0,0.5)"
                                        cornerRadius={18}
                                    />
                                    <Text
                                        x={video.width / 2 - 18}
                                        y={video.height / 2 - 14}
                                        width={36}
                                        text="▶"
                                        fontSize={16}
                                        fill="white"
                                        align="center"
                                    />
                                </>
                            )}
                        </Group>

                        {/* Resize Handle */}
                        {isSelected && (
                            <Group
                                x={video.x + video.width}
                                y={video.y + video.height}
                                draggable
                                onDragMove={(e) => {
                                    const pos = e.target.position();
                                    const newWidth = Math.max(MIN_SIZE, pos.x - video.x);
                                    const newHeight = Math.max(MIN_SIZE, pos.y - video.y);

                                    updateVideo(video.id, {
                                        width: newWidth,
                                        height: newHeight,
                                    });

                                    e.target.position({
                                        x: video.x + newWidth,
                                        y: video.y + newHeight,
                                    });
                                }}
                            >
                                <Rect
                                    x={-RESIZE_HANDLE_SIZE / 2}
                                    y={-RESIZE_HANDLE_SIZE / 2}
                                    width={RESIZE_HANDLE_SIZE}
                                    height={RESIZE_HANDLE_SIZE}
                                    fill="#4A90D9"
                                    cornerRadius={2}
                                    stroke="white"
                                    strokeWidth={1.5}
                                />
                            </Group>
                        )}
                    </Group>
                );
            })}
        </>
    );
};

export default VideoIcon;