// components/drag/ArrowConnector.tsx
"use client";

import { Arrow, Circle, Group } from "react-konva";
import { ArrowItem } from "@/lib/type";
import Konva from "konva";

type AnyItem = { id: string; x: number; y: number; width: number; height: number };

interface Props {
    arrows: ArrowItem[]
    draggingArrow: ArrowItem | null
    onDelete: (id: string) => void
    onConnectHead: (arrowId: string, side: "from" | "to", x: number, y: number, targetId?: string | undefined, isDragging?: boolean) => void  // ← ลาก endpoint
    allItems: AnyItem[]
    draggingArrowId: string | null
    selectedArrowId: string | null
    onSelectArrow: (id: string | null) => void
    parentBoardId?: string
    
}

const getCenter = (item: AnyItem) => ({
    x: item.x + item.width / 2,
    y: item.y + item.height / 2,
});

// หาจุด edge ของ element ที่ใกล้กับ target มากที่สุด
export const getEdgePoint = (item: AnyItem, targetX: number, targetY: number) => {
    const cx = item.x + item.width / 2;
    const cy = item.y + item.height / 2;
    const dx = targetX - cx;
    const dy = targetY - cy;
    const angle = Math.atan2(dy, dx);

    const hw = item.width / 2;
    const hh = item.height / 2;

    const absCos = Math.abs(Math.cos(angle));
    const absSin = Math.abs(Math.sin(angle));

    let ex, ey;
    if (hw * absSin <= hh * absCos) {
        ex = cx + (dx > 0 ? hw : -hw);
        ey = cy + (hw * absSin * (dy > 0 ? 1 : -1)) / absCos || cy;
    } else {
        ex = cx + (hh * absCos * (dx > 0 ? 1 : -1)) / absSin || cx;
        ey = cy + (dy > 0 ? hh : -hh);
    }

    return { x: ex, y: ey };
};

// ArrowConnector.tsx
const ArrowConnector = ({ arrows, draggingArrowId, onDelete, onConnectHead, allItems, selectedArrowId, onSelectArrow, parentBoardId }: Props) => {
    // console.log("Rendering ArrowConnector with arrows:", arrows);

    

    return (
        <>
            {arrows.map((arrow) => {
                if (arrow.parentBoardId !== parentBoardId) return null;
                const isDragging = arrow.id === draggingArrowId;
                const isSelected = arrow.id === selectedArrowId

                // ← คำนวณจาก element จริงๆ ทุกครั้งที่ render
                const fromItem = allItems.find((i) => i.id === arrow.fromId);
                const toItem = allItems.find((i) => i.id === arrow.toId);

                // ถ้าเชื่อมกับ element → คำนวณ edge ใหม่
                // ถ้ายังไม่เชื่อม → ใช้ fromX/toX ที่เก็บไว้
                const fromPoint = fromItem
                    ? getEdgePoint(fromItem,
                        toItem ? toItem.x + toItem.width / 2 : arrow.toX,
                        toItem ? toItem.y + toItem.height / 2 : arrow.toY)
                    : { x: arrow.fromX, y: arrow.fromY };

                const toPoint = toItem
                    ? getEdgePoint(toItem,
                        fromItem ? fromItem.x + fromItem.width / 2 : arrow.fromX,
                        fromItem ? fromItem.y + fromItem.height / 2 : arrow.fromY)
                    : { x: arrow.toX, y: arrow.toY };

                const midX = (fromPoint.x + toPoint.x) / 2;
                const midY = (fromPoint.y + toPoint.y) / 2;

                return (
                    <Group key={arrow.id}>
                        <Arrow
                            points={[fromPoint.x, fromPoint.y, toPoint.x, toPoint.y]}
                            tension={0.5}
                            bezier={false}
                            dash={isDragging ? [6, 3] : undefined}
                            pointerLength={10}
                            pointerWidth={8}
                            stroke={isSelected ? "#4A90D9" : arrow.unconnected ? "#aaa" : "#555"}
                            fill={isSelected ? "#4A90D9" : arrow.unconnected ? "#aaa" : "#555"}
                            strokeWidth={isSelected ? 3 : 2}
                            hitStrokeWidth={20}  // ← เพิ่ม hit area ให้คลิกง่ายขึ้น
                            onClick={() => onSelectArrow(arrow.id)}
                            onTap={() => onSelectArrow(arrow.id)}
                        />

                        {/* ปุ่มลบ */}
                        {isSelected && (
                            <Circle
                                x={midX}
                                y={midY}
                                radius={7}
                                fill="red"
                                opacity={0.8}
                                onClick={() => onDelete(arrow.id)}
                            />
                        )}

                        {/* Handle ต้นทาง */}
                         {isSelected && (
                           <Circle
                                x={fromPoint.x}   // ← ใช้ fromPoint แทน arrow.fromX
                                y={fromPoint.y}
                                radius={6}
                                fill="white"
                                stroke={arrow.fromId ? "#4A90D9" : "#aaa"}
                                strokeWidth={2}
                                draggable
                                onDragMove={(e) => {
                                    const stage = e.target.getStage();
                                    if (!stage) return;
                                    const pos = stage.getPointerPosition();
                                    if (!pos) return;
                                    const transform = stage.getAbsoluteTransform().copy().invert();
                                    const stagePos = transform.point(pos);
                                    onConnectHead(arrow.id, "from", stagePos.x, stagePos.y, undefined, true);
                                    e.target.position({ x: fromPoint.x, y: fromPoint.y });
                                }}
                                onDragEnd={(e) => {
                                    const stage = e.target.getStage();
                                    if (!stage) return;
                                    const pos = stage.getPointerPosition();
                                    if (!pos) return;
                                    const transform = stage.getAbsoluteTransform().copy().invert();
                                    const stagePos = transform.point(pos);
                                    const target = allItems.find(
                                        (i) => stagePos.x >= i.x && stagePos.x <= i.x + i.width &&
                                                stagePos.y >= i.y && stagePos.y <= i.y + i.height
                                    );
                                    onConnectHead(arrow.id, "from", stagePos.x, stagePos.y, target?.id, false);
                                }}
                            />
                        )}

                        {/* Handle ปลายทาง */}
                        {isSelected && (
                           <Circle
                                x={toPoint.x}   // ← ใช้ toPoint แทน arrow.toX
                                y={toPoint.y}
                                radius={6}
                                fill="white"
                                stroke={arrow.toId ? "#4A90D9" : "#aaa"}
                                strokeWidth={2}
                                draggable
                                onDragMove={(e) => {
                                    const stage = e.target.getStage();
                                    if (!stage) return;
                                    const pos = stage.getPointerPosition();
                                    if (!pos) return;
                                    const transform = stage.getAbsoluteTransform().copy().invert();
                                    const stagePos = transform.point(pos);
                                    onConnectHead(arrow.id, "to", stagePos.x, stagePos.y, undefined, true);
                                    e.target.position({ x: toPoint.x, y: toPoint.y });
                                }}
                                onDragEnd={(e) => {
                                    const stage = e.target.getStage();
                                    if (!stage) return;
                                    const pos = stage.getPointerPosition();
                                    if (!pos) return;
                                    const transform = stage.getAbsoluteTransform().copy().invert();
                                    const stagePos = transform.point(pos);
                                    const target = allItems.find(
                                        (i) => stagePos.x >= i.x && stagePos.x <= i.x + i.width &&
                                                stagePos.y >= i.y && stagePos.y <= i.y + i.height
                                    );
                                    onConnectHead(arrow.id, "to", stagePos.x, stagePos.y, target?.id, false);
                                }}
                                
                            />
                        )}

                        
                    </Group>
                );
            })}
        </>
    );
};

export default ArrowConnector;