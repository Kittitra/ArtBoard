// components/drag/DrawElement.tsx
"use client";

import { Group, Rect, Line } from "react-konva";
import { DrawItem } from "@/lib/type";

type Props = {
    draws: DrawItem[]
    selectedDrawId: string | null
    selectedIds?: string[]
    parentBoardId?: string
    updateDraw: (id: string, updates: Partial<DrawItem>) => void
    selectDraw: (id: string) => void
    setSelectedDrawId: (id: string | null) => void
    onDragMove?: () => void
    onDragStart?: (id: string, x: number, y: number) => void
    onDragMove_group?: (id: string, x: number, y: number) => void
    onDragEnd?: (id: string, x: number, y: number) => void
    onOpenDraw?: (id: string) => void
    onSelect?: () => void
}

const MIN_SIZE = 60;
const RESIZE_HANDLE_SIZE = 10;

const DrawElement = ({
    draws, selectedDrawId, selectedIds, parentBoardId,
    updateDraw, selectDraw, setSelectedDrawId,
    onDragMove, onDragStart, onDragMove_group, onDragEnd,
    onOpenDraw, onSelect,
}: Props) => {
    return (
        <>
            {draws.map((draw) => {
                if (draw.parentBoardId !== parentBoardId) return null;

                const isSelected = selectedDrawId === draw.id;
                const isGroupSelected = selectedIds?.includes(draw.id);
                const isEmpty = draw.strokes.length === 0;

                return (
                    <Group key={draw.id}>
                        <Group
                            x={draw.x}
                            y={draw.y}
                            draggable
                            onClick={() => { onSelect?.(); selectDraw(draw.id); }}
                            onTap={() => { onSelect?.(); selectDraw(draw.id); }}
                            onDblClick={() => onOpenDraw?.(draw.id)}
                            onDblTap={() => onOpenDraw?.(draw.id)}
                            onDragStart={(e) => {
                                const { x, y } = e.target.position();
                                onDragStart?.(draw.id, x, y);
                            }}
                            onDragMove={(e) => {
                                const { x, y } = e.target.position();
                                updateDraw(draw.id, { x, y });
                                onDragMove?.();
                                if (isGroupSelected) onDragMove_group?.(draw.id, x, y);
                            }}
                            onDragEnd={(e) => {
                                const { x, y } = e.target.position();
                                onDragEnd?.(draw.id, x, y);
                            }}
                        >
                            {/* พื้นหลัง transparent — แสดงเฉพาะตอน selected หรือ empty */}
                            <Rect
                                width={draw.width}
                                height={draw.height}
                                fill={isEmpty ? "rgba(200,200,200,0.08)" : "transparent"}
                                cornerRadius={4}
                                stroke={
                                    isGroupSelected ? "#4A90D9"
                                    : isSelected ? "#aaa"
                                    : isEmpty ? "#d1d5db"
                                    : "transparent"
                                }
                                strokeWidth={isSelected ? 2 : 1}
                                dash={isSelected || isEmpty ? [4, 3] : undefined}
                            />

                            {/* แสดงเส้นที่วาดไว้ */}
                            {draw.strokes.map((stroke) => (
                                <Line
                                    key={stroke.id}
                                    points={stroke.points}
                                    stroke={stroke.tool === "eraser" ? "white" : stroke.color}
                                    strokeWidth={stroke.size}
                                    tension={0.4}
                                    lineCap="round"
                                    lineJoin="round"
                                    globalCompositeOperation={
                                        stroke.tool === "eraser"
                                            ? "destination-out"
                                            : "source-over"
                                    }
                                />
                            ))}

                            {/* placeholder ตอนยังไม่ได้วาด */}
                            {isEmpty && (
                                <>
                                    <Line
                                        points={[20, draw.height / 2 + 5, 40, draw.height / 2 - 5, 60, draw.height / 2 + 8, 80, draw.height / 2 - 3]}
                                        stroke="#d1d5db"
                                        strokeWidth={2}
                                        tension={0.4}
                                        lineCap="round"
                                    />
                                </>
                            )}
                        </Group>

                        {/* Resize Handle */}
                        {isSelected && (
                            <Group
                                x={draw.x + draw.width}
                                y={draw.y + draw.height}
                                draggable
                                onDragMove={(e) => {
                                   const pos = e.target.position();
                                    const newWidth = Math.max(MIN_SIZE, pos.x - draw.x);
                                    const newHeight = Math.max(MIN_SIZE, pos.y - draw.y);

                                    const scaleX = newWidth / draw.width;
                                    const scaleY = newHeight / draw.height;

                                    // scale points ของทุก stroke ตามอัตราส่วนใหม่
                                    const newStrokes = draw.strokes.map((stroke) => ({
                                        ...stroke,
                                        points: stroke.points.map((p, i) =>
                                            i % 2 === 0 ? p * scaleX : p * scaleY
                                        ),
                                        size: stroke.size * ((scaleX + scaleY) / 2),  // scale ขนาดเส้นด้วย
                                    }));

                                    updateDraw(draw.id, {
                                        width: newWidth,
                                        height: newHeight,
                                        strokes: newStrokes,
                                    });

                                    e.target.position({
                                        x: draw.x + newWidth,
                                        y: draw.y + newHeight,
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

export default DrawElement;