"use client";
import { NoteItem } from '@/lib/type';
import { Group, Rect, Text } from 'react-konva'

type NoteProps = {
  setSelectedNoteId: (id: string | null) => void;
  notes: NoteItem[];
  selectedNoteId: string | null;
  updateNote: (id: string, updates: Partial<NoteItem>) => void;
  selectNote: (id: string) => void;
  parentBoardId: string | undefined;
  onDragMove?: () => void;
  onDragEnd?: (id: string, x: number, y: number) => void;
  selectedIds?: string[];
  onDragMove_group?: (id: string, dx: number, dy: number) => void;
  onDragStart?: (id: string, x: number, y: number) => void;
};

const FONT = {
  family: "Inter, system-ui, -apple-system, sans-serif",
  size: 16,
  lineHeight: 1.4,
  letterSpacing: 0,
};

const PADDING = 8;
const MIN_SIZE = 100;
const RESIZE_HANDLE_SIZE = 12;

const Note = ({ notes, updateNote, selectedNoteId, setSelectedNoteId, selectNote, parentBoardId, onDragMove, onDragEnd, selectedIds, onDragStart, onDragMove_group }: NoteProps) => {

    const startEdit = (id: string) => {
      updateNote(id, { isEditing: true });
      setSelectedNoteId(id);
    };

  return (
    <>
        {notes.map((note) => {
            const isSelected = selectedNoteId === note.id;

            if(note.parentBoardId && !parentBoardId || note.parentBoardId !== parentBoardId) {
                return null; // ข้ามการเรนเดอร์ถ้า parentBoardId มีค่า
            }

            return (
                <Group key={note.id}>
                <Group
                    x={note.x}
                    y={note.y}
                    draggable={!note.isEditing}
                    onClick={() => selectNote(note.id)}
                    onTap={() => selectNote(note.id)}
                    onDblClick={() => startEdit(note.id)}
                    onDblTap={() => startEdit(note.id)}
                     onDragStart={(e) => {
                        const { x, y } = e.target.position();
                        onDragStart?.(note.id, x, y);
                    }}
                    onDragMove={(e) => {
                        const { x, y } = e.target.position();
                        updateNote(note.id, { x, y });  // ← ต้องมีบรรทัดนี้
                        onDragMove?.();
                        if (selectedIds?.includes(note.id)) {
                            onDragMove_group?.(note.id, x, y);
                        }
                    }}
                    onDragEnd={(e) => {
                        const { x, y } = e.target.position();
                        onDragEnd?.(note.id, x, y);
                    }}
                >
                    <Rect
                        width={note.width}
                        height={note.height}
                        fill="white"
                        cornerRadius={8}
                        shadowBlur={4}
                        shadowOpacity={0.1}
                        shadowOffsetY={2}
                        stroke={selectedIds?.includes(note.id) ? "#4A90D9" : isSelected ? "gray" : "transparent"}
                        strokeWidth={2}
                        
                    />
                    <Text
                        text={note.text}
                        x={PADDING}
                        y={PADDING}
                        width={note.width - PADDING * 2}
                        fontFamily={FONT.family}
                        fontSize={FONT.size}
                        lineHeight={FONT.lineHeight}
                        letterSpacing={FONT.letterSpacing}
                        fill="#333"
                        opacity={note.isEditing ? 0 : 1}
                        wrap="word"
                    />
                </Group>
                
                {/* Resize Handle */}
                {isSelected && !note.isEditing && (
                    <Group
                        x={note.x + note.width}
                        y={note.y + note.height}
                        draggable
                        onDragMove={(e) => {
                            const pos = e.target.position();
                            const newWidth = Math.max(MIN_SIZE, pos.x - note.x);
                            const newHeight = Math.max(MIN_SIZE, pos.y - note.y);
                            
                            updateNote(note.id, {
                                width: newWidth,
                                height: newHeight,
                            });
                            
                            // Reset handle position
                            e.target.position({
                                x: note.x + newWidth,
                                y: note.y + newHeight,
                            });
                        }}
                    >
                    <Rect
                        x={-RESIZE_HANDLE_SIZE / 2}
                        y={-RESIZE_HANDLE_SIZE / 2}
                        width={RESIZE_HANDLE_SIZE}
                        height={RESIZE_HANDLE_SIZE}
                        fill="gray"
                        cornerRadius={2}
                        stroke="white"
                        strokeWidth={2}
                    />
                    
                    </Group>
                )}
                </Group>
            );
        })}
    </>
  )}
export default Note