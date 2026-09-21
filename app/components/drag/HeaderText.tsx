"use client";
import { HeaderTextItem } from '@/lib/type';
import { Group, Rect, Text } from 'react-konva'

type HeaderTextProps = {
  setSelectedTextId: (id: string | null) => void;
  texts: HeaderTextItem[];
  selectedTextId: string | null;
  updateText: (id: string, updates: Partial<HeaderTextItem>) => void;
  selectText: (id: string) => void;
  parentBoardId: string | undefined;
  onDragMove?: () => void;
  onDragEnd?: (id: string, x: number, y: number) => void;
  selectedIds?: string[];
  onDragMove_group?: (id: string, dx: number, dy: number) => void;
  onDragStart?: (id: string, x: number, y: number) => void;
};

const FONT = {
  family: "Inter, system-ui, -apple-system, sans-serif",
  size: 24,
  lineHeight: 1.4,
  letterSpacing: 0,
};

const PADDING = 8;
const MIN_SIZE = 100;
const RESIZE_HANDLE_SIZE = 10;

const HeaderText = ({ texts, updateText, selectedTextId, setSelectedTextId, selectText, parentBoardId, onDragMove, onDragEnd, selectedIds, onDragStart, onDragMove_group }: HeaderTextProps) => {

    const startEdit = (id: string) => {
      updateText(id, { isEditing: true });
      setSelectedTextId(id);
    };

  return (
    <>
        {texts.map((text) => {
            const isSelected = selectedTextId === text.id;

            if(text.parentBoardId && !parentBoardId || text.parentBoardId !== parentBoardId) {
                return null; // ข้ามการเรนเดอร์ถ้า parentBoardId มีค่า
            }

            return (
                <Group key={text.id}>
                <Group
                    x={text.x}
                    y={text.y}
                    draggable={!text.isEditing}
                    onClick={() => selectText(text.id)}
                    onTap={() => selectText(text.id)}
                    onDblClick={() => startEdit(text.id)}
                    onDblTap={() => startEdit(text.id)}
                     onDragStart={(e) => {
                        const { x, y } = e.target.position();
                        onDragStart?.(text.id, x, y);
                    }}
                    onDragMove={(e) => {
                        const { x, y } = e.target.position();
                        updateText(text.id, { x, y });  // ← ต้องมีบรรทัดนี้
                        onDragMove?.();
                        if (selectedIds?.includes(text.id)) {
                            onDragMove_group?.(text.id, x, y);
                        }
                    }}
                    onDragEnd={(e) => {
                        const { x, y } = e.target.position();
                        onDragEnd?.(text.id, x, y);
                    }}
                >
                    <Rect
                        width={text.width}
                        height={text.height}
                        fillEnabled={true}
                        fill="rgba(0,0,0,0)"
                        shadowBlur={4}
                        shadowOpacity={0.1}
                        shadowOffsetY={2}
                        stroke={selectedIds?.includes(text.id) ? "#4A90D9" : isSelected ? "gray" : "transparent"}
                        strokeWidth={1}
                        
                    />
                    <Text
                        text={text.text}
                        width={text.width}
                        height={text.height}
                        align="center"
                        verticalAlign="middle"
                        fontStyle="bold"
                        fontFamily={FONT.family}
                        fontSize={FONT.size}
                        lineHeight={FONT.lineHeight}
                        letterSpacing={FONT.letterSpacing}
                        fill="#333"
                        opacity={text.isEditing ? 0 : 1}
                        wrap="word"
                        
                    />
                </Group>
                
                {/* Resize Handle */}
                {isSelected && !text.isEditing && (
                    <Group
                        x={text.x + text.width}
                        y={text.y + text.height}
                        draggable
                        onDragMove={(e) => {
                            const pos = e.target.position();
                            const newWidth = Math.max(MIN_SIZE, pos.x - text.x);
                            const newHeight = Math.max(MIN_SIZE, pos.y - text.y);
                            
                            updateText(text.id, {
                                width: newWidth,
                                height: newHeight,
                            });
                            
                            // Reset handle position
                            e.target.position({
                                x: text.x + newWidth,
                                y: text.y + newHeight,
                            });
                        }}
                    >
                    <Rect
                        x={-RESIZE_HANDLE_SIZE / 2}
                        y={-RESIZE_HANDLE_SIZE / 2}
                        width={RESIZE_HANDLE_SIZE}
                        height={RESIZE_HANDLE_SIZE}
                        fill="gray"
                        cornerRadius={10}
                        strokeWidth={2}
                    />
                    
                    </Group>
                )}
                </Group>
            );
        })}
    </>
  )}
export default HeaderText