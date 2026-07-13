// components/drag/CommentIcon.tsx
"use client";

import { Group, Rect, Text, Circle } from "react-konva";
import { CommentItem } from "@/lib/type";

type Props = {
    comments: CommentItem[]
    selectedCommentId: string | null
    selectedIds?: string[]
    parentBoardId?: string
    updateComment: (id: string, updates: Partial<CommentItem>) => void
    selectComment: (id: string) => void
    setSelectedCommentId: (id: string | null) => void
    onDragMove?: () => void
    onDragStart?: (id: string, x: number, y: number) => void
    onDragMove_group?: (id: string, x: number, y: number) => void
    onDragEnd?: (id: string, x: number, y: number) => void
    onOpenComment?: (id: string) => void
    onSelect?: () => void
}

const CommentIcon = ({
    comments, selectedCommentId, selectedIds, parentBoardId,
    updateComment, selectComment, setSelectedCommentId,
    onDragMove, onDragStart, onDragMove_group, onDragEnd,
    onOpenComment, onSelect,
}: Props) => {
    return (
        <>
            {comments.map((comment) => {
                if (comment.parentBoardId !== parentBoardId) return null;

                const isSelected = selectedCommentId === comment.id;
                const isGroupSelected = selectedIds?.includes(comment.id);
                const W = 48;
                const H = 48;
                const hasReplies = comment.replies.length > 0;

                return (
                    <Group key={comment.id}>
                        <Group
                            x={comment.x}
                            y={comment.y}
                            draggable
                            onClick={() => { onSelect?.(); selectComment(comment.id); }}
                            onTap={() => { onSelect?.(); selectComment(comment.id); }}
                            onDblClick={() => onOpenComment?.(comment.id)}
                            onDblTap={() => onOpenComment?.(comment.id)}
                            onDragStart={(e) => {
                                const { x, y } = e.target.position();
                                onDragStart?.(comment.id, x, y);
                            }}
                            onDragMove={(e) => {
                                const { x, y } = e.target.position();
                                updateComment(comment.id, { x, y });
                                onDragMove?.();
                                if (isGroupSelected) onDragMove_group?.(comment.id, x, y);
                            }}
                            onDragEnd={(e) => {
                                const { x, y } = e.target.position();
                                onDragEnd?.(comment.id, x, y);
                            }}
                        >
                            {/* bubble icon */}
                            <Rect
                                width={W}
                                height={H}
                                fill={comment.resolved ? "#d1fae5" : "#fef9c3"}
                                cornerRadius={8}
                                shadowBlur={4}
                                shadowOpacity={0.12}
                                shadowOffsetY={2}
                                stroke={
                                    isGroupSelected ? "#4A90D9"
                                    : isSelected ? "#aaa"
                                    : comment.resolved ? "#6ee7b7"
                                    : "#fde68a"
                                }
                                strokeWidth={1.5}
                            />

                            {/* icon */}
                            <Text
                                y={16}
                                width={W}
                                text={comment.resolved ? "✓" : "💬"}
                                fontSize={20}
                                align="center"
                            />

                            {/* reply count badge */}
                            {hasReplies && (
                                <>
                                    <Circle
                                        x={W - 6}
                                        y={6}
                                        radius={9}
                                        fill="#ef4444"
                                    />
                                    <Text
                                        x={W - 6 - 9}
                                        y={-1}
                                        width={18}
                                        text={String(comment.replies.length)}
                                        fontSize={9}
                                        fill="white"
                                        align="center"
                                        fontStyle="bold"
                                    />
                                </>
                            )}

                            {/* preview text */}
                            <Text
                                y={H + 4}
                                width={120}
                                x={-(120 - W) / 2}
                                text={comment.text.slice(0, 30) + (comment.text.length > 30 ? "..." : "")}
                                fontSize={14}
                                fontFamily="Inter, system-ui, sans-serif"
                                fill="#6b7280"
                                align="center"
                                wrap="none"
                                ellipsis
                                textDecoration={"underline"}
                            />
                        </Group>
                    </Group>
                );
            })}
        </>
    );
};

export default CommentIcon;