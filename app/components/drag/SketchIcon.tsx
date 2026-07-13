"use client";

import { Group, Rect, Image as KonvaImage, Text } from "react-konva";
import { SketchItem } from "@/lib/type";
import { useEffect, useState } from "react";
import useImage from "use-image";

type Props = {
    sketches: SketchItem[]
    selectedSketchId: string | null
    selectedIds?: string[]
    parentBoardId?: string
    updateSketch: (id: string, updates: Partial<SketchItem>) => void
    selectSketch: (id: string) => void
    setSelectedSketchId: (id: string | null) => void
    onDragMove?: () => void
    onDragStart?: (id: string, x: number, y: number) => void
    onDragMove_group?: (id: string, x: number, y: number) => void
    onDragEnd?: (id: string, x: number, y: number) => void
    onOpenSketch?: (id: string) => void
}

const MIN_SIZE = 60;
const RESIZE_HANDLE_SIZE = 10;

const SketchIcon = ({
    sketches, selectedSketchId, selectedIds, parentBoardId,
    updateSketch, selectSketch, setSelectedSketchId,
    onDragMove, onDragStart, onDragMove_group, onDragEnd, onOpenSketch
}: Props) => {
    return (
        <>
            {sketches.map((sketch) => {
                if (sketch.parentBoardId !== parentBoardId) return null;
                const isSelected = selectedSketchId === sketch.id;
                const isGroupSelected = selectedIds?.includes(sketch.id);

                return (
                    <Group key={sketch.id}>
                        <Group
                            x={sketch.x}
                            y={sketch.y}
                            draggable
                            onClick={() => selectSketch(sketch.id)}
                            onTap={() => selectSketch(sketch.id)}
                            onDblClick={() => onOpenSketch?.(sketch.id)}
                            onDblTap={() => onOpenSketch?.(sketch.id)}
                            onDragStart={(e) => {
                                const { x, y } = e.target.position();
                                onDragStart?.(sketch.id, x, y);
                            }}
                            onDragMove={(e) => {
                                const { x, y } = e.target.position();
                                updateSketch(sketch.id, { x, y });
                                onDragMove?.();
                                if (isGroupSelected) onDragMove_group?.(sketch.id, x, y);
                            }}
                            onDragEnd={(e) => {
                                const { x, y } = e.target.position();
                                onDragEnd?.(sketch.id, x, y);
                            }}
                        >
                            {/* กล่อง preview */}
                            <Rect
                                width={sketch.width}
                                height={sketch.height - 18}
                                fill="#fff"
                                cornerRadius={6}
                                shadowBlur={4}
                                shadowOpacity={0.12}
                                shadowOffsetY={2}
                                stroke={isGroupSelected ? "#4A90D9" : isSelected ? "#aaa" : "#e5e7eb"}
                                strokeWidth={1.5}
                            />

                            {/* thumbnail หรือ placeholder */}
                            {sketch.thumbnail ? (
                                <ThumbnailImage
                                    src={sketch.thumbnail}
                                    width={sketch.width}
                                    height={sketch.height - 18}
                                />
                            ) : (
                                <Text
                                    y={(sketch.height - 18) / 2 - 8}
                                    width={sketch.width}
                                    text="✏️"
                                    fontSize={20}
                                    align="center"
                                />
                            )}

                            {/* label */}
                            <Text
                                y={sketch.height - 14}
                                width={sketch.width}
                                text="Sketch"
                                fontSize={10}
                                fontFamily="Inter, system-ui, sans-serif"
                                fill="#6b7280"
                                align="center"
                            />
                        </Group>
                        {/* Resize Handle — แสดงตอน selected */}
                        {isSelected && (
                            <Group
                                x={sketch.x + sketch.width}
                                y={sketch.y + sketch.height}
                                draggable
                                onDragMove={(e) => {
                                    const pos = e.target.position();
                                    const newWidth = Math.max(MIN_SIZE, pos.x - sketch.x);
                                    const newHeight = Math.max(MIN_SIZE, pos.y - sketch.y);

                                    updateSketch(sketch.id, {
                                        width: newWidth,
                                        height: newHeight,
                                    });

                                    // reset handle position
                                    e.target.position({
                                        x: sketch.x + newWidth,
                                        y: sketch.y + newHeight,
                                    });
                                }}
                            >
                                <Rect
                                    x={-RESIZE_HANDLE_SIZE / 2}
                                    y={-RESIZE_HANDLE_SIZE - 15}
                                    width={RESIZE_HANDLE_SIZE}
                                    height={RESIZE_HANDLE_SIZE}
                                    fill="#gray"
                                    cornerRadius={10}
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

export default SketchIcon;

// แยก component สำหรับ load image
const ThumbnailImage = ({ src, width, height }: {
    src: string;
    width: number;
    height: number;
}) => {
    const [image, status] = useImage(src);

    if (status !== "loaded" || !image) return null;

    return (
        <KonvaImage
            image={image}
            width={width}
            height={height}
            cornerRadius={6}
        />
    );
};