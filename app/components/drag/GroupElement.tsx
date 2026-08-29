// components/drag/GroupElement.tsx
"use client";

import { Group, Rect, Text } from "react-konva";
import { GroupItem, NoteItem, LinkItem, BoardItem, HeaderTextItem, ColorCardItem, DocumentItem, SketchItem, VideoItem, AudioItem, CommentItem } from "@/lib/type";

type AnyItem = { id: string; x: number; y: number; width: number; height: number; parentBoardId?: string };

type Props = {
    groups: GroupItem[]
    selectedGroupId: string | null
    selectedIds?: string[]
    parentBoardId?: string
    allItems: AnyItem[]
    updateGroup: (id: string, updates: Partial<GroupItem>) => void
    selectGroup: (id: string) => void
    setSelectedGroupId: (id: string | null) => void
    onDragMove?: () => void
    onDragStart?: (id: string, x: number, y: number) => void
    onDragMove_group?: (id: string, x: number, y: number) => void
    onDragEnd?: (id: string, x: number, y: number) => void
    onSelect?: () => void
    // callback เมื่อ group ขยับ → ขยับ element ที่อยู่ข้างใน
    onGroupDragMove?: (groupId: string, dx: number, dy: number) => void
    onGroupDragEnd?: (groupId: string, dx: number, dy: number) => void
}

const TITLE_HEIGHT = 24;
const MIN_SIZE = 80;
const RESIZE_HANDLE_SIZE = 10;
const PADDING = 12;

// หา element ที่อยู่ใน group
const getItemsInsideGroup = (group: GroupItem, items: AnyItem[]) => {
    return items.filter((item) =>
        item.x >= group.x + PADDING &&
        item.y >= group.y + TITLE_HEIGHT &&
        item.x + item.width <= group.x + group.width - PADDING &&
        item.y + item.height <= group.y + group.height - PADDING
    );
};

const GroupElement = ({
    groups, selectedGroupId, selectedIds, parentBoardId,
    allItems, updateGroup, selectGroup, setSelectedGroupId,
    onDragMove, onDragStart, onDragMove_group, onDragEnd,
    onSelect, onGroupDragMove, onGroupDragEnd,
}: Props) => {

    return (
        <>
            {groups.map((group) => {
                if (group.parentBoardId !== parentBoardId) return null;

                const isSelected = selectedGroupId === group.id;
                const isGroupSelected = selectedIds?.includes(group.id);
                const itemsInside = getItemsInsideGroup(group, allItems);

                return (
                    <Group key={group.id} index={0} > 
                        {/* Main draggable group */}
                        <Group
                            x={group.x}
                            y={group.y}
                            draggable
                            onClick={() => { onSelect?.(); selectGroup(group.id); }}
                            onTap={() => { onSelect?.(); selectGroup(group.id); }}
                            onDblClick={() => updateGroup(group.id, { isEditingTitle: true })}
                            onDragStart={(e) => {
                                const { x, y } = e.target.position();
                                onDragStart?.(group.id, x, y);
                            }}
                            onDragMove={(e) => {
                                const { x, y } = e.target.position();
                                const dx = x - group.x;
                                const dy = y - group.y;
                                updateGroup(group.id, { x, y });
                                onGroupDragMove?.(group.id, dx, dy);
                                onDragMove?.();
                                if (isGroupSelected) onDragMove_group?.(group.id, x, y);
                            }}
                            onDragEnd={(e) => {
                                const { x, y } = e.target.position();
                                const dx = x - group.x;
                                const dy = y - group.y;
                                onGroupDragEnd?.(group.id, dx, dy);
                                onDragEnd?.(group.id, x, y);
                            }}
                        >
                            {/* พื้นหลัง */}
                            <Rect
                                width={group.width}
                                height={group.height}
                                fill={group.color || "rgba(240,240,255,0.6)"}
                                cornerRadius={8}
                                stroke={
                                    isGroupSelected ? "#4A90D9"
                                    : isSelected ? "#000"
                                    : "#9C9C9C"
                                }
                                strokeWidth={isSelected ? 2 : 1}
                                dash={isSelected ? undefined : [6, 3]}
                            />

                            {/* Title bar */}
                            <Rect
                                width={group.width}
                                height={TITLE_HEIGHT}
                                fill={isSelected ? "#9C9C9C" : "#CCCCCC"}
                                cornerRadius={[8, 8, 0, 0]}
                            />

                            {/* Title text */}
                            <Text
                                x={10}
                                y={5}
                                width={group.width - 20}
                                text={group.title || "Group"}
                                fontSize={12}
                                fontStyle="600"
                                fontFamily="Inter, system-ui, sans-serif"
                                fill={isSelected ? "#000" : "#9C9C9C"}
                                ellipsis
                                wrap="none"
                            />

                            {/* จำนวน element ข้างใน */}
                            <Text
                                x={group.width - 30}
                                y={5}
                                width={25}
                                text={String(itemsInside.length)}
                                fontSize={11}
                                fontFamily="Inter, system-ui, sans-serif"
                                fill={isSelected ? "#000" : "#9C9C9C"}
                                align="right"
                            />
                        </Group>

                        {/* Resize Handle */}
                        {isSelected && (
                            <Group
                                x={group.x + group.width}
                                y={group.y + group.height}
                                draggable
                                onDragMove={(e) => {
                                    const pos = e.target.position();
                                    const newWidth = Math.max(MIN_SIZE, pos.x - group.x);
                                    const newHeight = Math.max(MIN_SIZE, pos.y - group.y);
                                    updateGroup(group.id, { width: newWidth, height: newHeight });
                                    e.target.position({
                                        x: group.x + newWidth,
                                        y: group.y + newHeight,
                                    });
                                }}
                            >
                                <Rect
                                    x={-RESIZE_HANDLE_SIZE / 2}
                                    y={-RESIZE_HANDLE_SIZE / 2}
                                    width={RESIZE_HANDLE_SIZE}
                                    height={RESIZE_HANDLE_SIZE}
                                    fill="#9c9c9c"
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

export default GroupElement;
export { getItemsInsideGroup };