// components/drag/DocumentIcon.tsx
"use client";

import { Group, Rect, Text, Path } from "react-konva";
import { DocumentItem } from "@/lib/type";

type Props = {
    documents: DocumentItem[]
    selectedDocId: string | null
    selectedIds?: string[]
    parentBoardId?: string
    updateDoc: (id: string, updates: Partial<DocumentItem>) => void
    selectDoc: (id: string) => void
    setSelectedDocId: (id: string | null) => void
    onDragMove?: () => void
    onDragStart?: (id: string, x: number, y: number) => void
    onDragMove_group?: (id: string, x: number, y: number) => void
    onDragEnd?: (id: string, x: number, y: number) => void
    onOpenDoc?: (id: string) => void
}

const DocumentIcon = ({
    documents, selectedDocId, selectedIds, parentBoardId,
    updateDoc, selectDoc, setSelectedDocId,
    onDragMove, onDragStart, onDragMove_group, onDragEnd, onOpenDoc
}: Props) => {
    return (
        <>
            {documents.map((doc) => {
                if (doc.parentBoardId !== parentBoardId) return null;

                const isSelected = selectedDocId === doc.id;
                const isGroupSelected = selectedIds?.includes(doc.id);
                const W = 70;
                const H = 80;

                return (
                    <Group key={doc.id}>
                        <Group
                            x={doc.x}
                            y={doc.y}
                            draggable
                            onClick={() => selectDoc(doc.id)}
                            onTap={() => selectDoc(doc.id)}
                            onDblClick={() => onOpenDoc?.(doc.id)}
                            onDblTap={() => onOpenDoc?.(doc.id)}
                            onDragStart={(e) => {
                                const { x, y } = e.target.position();
                                onDragStart?.(doc.id, x, y);
                            }}
                            onDragMove={(e) => {
                                const { x, y } = e.target.position();
                                updateDoc(doc.id, { x, y });
                                onDragMove?.();
                                if (isGroupSelected) onDragMove_group?.(doc.id, x, y);
                            }}
                            onDragEnd={(e) => {
                                const { x, y } = e.target.position();
                                onDragEnd?.(doc.id, x, y);
                            }}
                        >
                            {/* กล่อง icon */}
                            <Rect
                                width={W}
                                height={H - 18}
                                fill="#fff"
                                cornerRadius={6}
                                shadowBlur={4}
                                shadowOpacity={0.12}
                                shadowOffsetY={2}
                                stroke={isGroupSelected ? "#4A90D9" : isSelected ? "#aaa" : "#e5e7eb"}
                                strokeWidth={1.5}
                            />

                            {/* เส้นจำลอง text ใน doc */}
                            {[16, 24, 32, 40].map((y, i) => (
                                <Rect
                                    key={i}
                                    x={8}
                                    y={y}
                                    width={i === 3 ? 30 : 54}
                                    height={3}
                                    fill="#d1d5db"
                                    cornerRadius={2}
                                />
                            ))}

                            {/* dog-ear มุมขวาบน */}
                            <Path
                                data="M 54 0 L 70 16 L 54 16 Z"
                                fill="#e5e7eb"
                            />
                            <Path
                                data="M 54 0 L 70 16"
                                stroke="#d1d5db"
                                strokeWidth={1}
                            />

                            {/* ชื่อ doc */}
                            <Text
                                y={H - 10}
                                width={W}
                                text={doc.title || "Document"}
                                fontSize={10}
                                fontFamily="Inter, system-ui, sans-serif"
                                fill="#6b7280"
                                align="center"
                                ellipsis
                                wrap="none"
                            />
                        </Group>
                    </Group>
                );
            })}
        </>
    );
};

export default DocumentIcon;