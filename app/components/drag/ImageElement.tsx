// components/drag/ImageElement.tsx
"use client";

import { Group, Rect, Text, Image as KonvaImage } from "react-konva";
import { ImageItem } from "@/lib/type";
import { useState, useEffect } from "react";

type Props = {
    images: ImageItem[]
    selectedImageId: string | null
    selectedIds?: string[]
    parentBoardId?: string
    updateImage: (id: string, updates: Partial<ImageItem>) => void
    selectImage: (id: string) => void
    setSelectedImageId: (id: string | null) => void
    onDragMove?: () => void
    onDragStart?: (id: string, x: number, y: number) => void
    onDragMove_group?: (id: string, x: number, y: number) => void
    onDragEnd?: (id: string, x: number, y: number) => void
    onOpenImage?: (id: string) => void
    onSelect?: () => void
    onViewImage?: (id: string) => void
}

const MIN_SIZE = 60;
const RESIZE_HANDLE_SIZE = 10;

const LoadedImage = ({ src, width, height }: { src: string; width: number; height: number }) => {
    const [image, setImage] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        if (!src) return;
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.onload = () => setImage(img);
        img.src = src;
    }, [src]);

    if (!image) return null;

    return <KonvaImage image={image} width={width} height={height} cornerRadius={6} />;
};

const ImageElement = ({
    images, selectedImageId, selectedIds, parentBoardId,
    updateImage, selectImage, setSelectedImageId,
    onDragMove, onDragStart, onDragMove_group, onDragEnd,
    onOpenImage, onSelect, onViewImage,
}: Props) => {
    const [resizeStart, setResizeStart] = useState<{ width: number; height: number } | null>(null);

    return (
        <>
            {images.map((image) => {
                if (image.parentBoardId !== parentBoardId) return null;

                const isSelected = selectedImageId === image.id;
                const isGroupSelected = selectedIds?.includes(image.id);

                return (
                    <Group key={image.id}>
                        <Group
                            x={image.x}
                            y={image.y}
                            draggable
                            onClick={() => { onSelect?.(); selectImage(image.id); }}
                            onTap={() => { onSelect?.(); selectImage(image.id); }}
                            onDblClick={() => {
                                if (image.status === "ready" && image.url) {
                                    onViewImage?.(image.id);   // ← เปิด viewer
                                } else {
                                    onOpenImage?.(image.id);   // ← เปิด uploader
                                }
                            }}
                            onDblTap={() => onOpenImage?.(image.id)}
                            onDragStart={(e) => {
                                const { x, y } = e.target.position();
                                onDragStart?.(image.id, x, y);
                            }}
                            onDragMove={(e) => {
                                const { x, y } = e.target.position();
                                updateImage(image.id, { x, y });
                                onDragMove?.();
                                if (isGroupSelected) onDragMove_group?.(image.id, x, y);
                            }}
                            onDragEnd={(e) => {
                                const { x, y } = e.target.position();
                                onDragEnd?.(image.id, x, y);
                            }}
                        >
                            {image.url && image.status === "ready" ? (
                                <LoadedImage src={image.url} width={image.width} height={image.height} />
                            ) : (
                                <>
                                    <Rect
                                        width={image.width}
                                        height={image.height}
                                        fill="#f3f4f6"
                                        cornerRadius={6}
                                        stroke={isGroupSelected ? "#4A90D9" : isSelected ? "#aaa" : "#e5e7eb"}
                                        strokeWidth={1.5}
                                    />
                                    <Text
                                        y={image.height / 2 - 20}
                                        width={image.width}
                                        text={image.status === "uploading" ? "⏳" : "🖼️"}
                                        fontSize={24}
                                        align="center"
                                    />
                                    <Text
                                        y={image.height / 2 + 8}
                                        width={image.width}
                                        text={
                                            image.status === "uploading" ? "Uploading..."
                                            : image.status === "error" ? "Upload failed"
                                            : "Double click to upload"
                                        }
                                        fontSize={10}
                                        fontFamily="Inter, system-ui, sans-serif"
                                        fill="#9ca3af"
                                        align="center"
                                    />
                                </>
                            )}

                            {/* border ตอน selected บนภาพจริง */}
                            {image.status === "ready" && (
                                <Rect
                                    width={image.width}
                                    height={image.height}
                                    fill="transparent"
                                    cornerRadius={6}
                                    stroke={isGroupSelected ? "#4A90D9" : isSelected ? "#aaa" : "transparent"}
                                    strokeWidth={2}
                                />
                            )}
                        </Group>

                        {/* Resize Handle */}
                        {isSelected && (
                            <Group
                                x={image.x + image.width}
                                y={image.y + image.height}
                                draggable
                                onDragStart={() => {
                                    setResizeStart({ width: image.width, height: image.height });
                                }}
                                onDragMove={(e) => {
                                    const pos = e.target.position();
                                    const newWidth = Math.max(MIN_SIZE, pos.x - image.x);
                                    const newHeight = Math.max(MIN_SIZE, pos.y - image.y);
                                    updateImage(image.id, { width: newWidth, height: newHeight });
                                    e.target.position({
                                        x: image.x + newWidth,
                                        y: image.y + newHeight,
                                    });
                                }}
                                onDragEnd={() => setResizeStart(null)}
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

export default ImageElement;