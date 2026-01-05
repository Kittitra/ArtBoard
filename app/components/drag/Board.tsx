"use client";

import Menu from '@/app/components/Menu'
import Navbar from '@/app/components/Navbar'
import Tools from '@/app/components/Tools'
import { BoardItem, NoteItem } from '@/lib/type';
import React, { useEffect, useRef, useState } from 'react'
import { Group, Layer, Rect, Stage, Text } from 'react-konva'


type BoardProps = {
  setSelectedBoardId: (id: string | null) => void;
  board: NoteItem[];
  selectedBoardId: string | null;
  updateBoard: (id: string, updates: Partial<BoardItem>) => void;
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

const Board = ({ board, updateBoard, selectedBoardId, setSelectedBoardId }: BoardProps) => {

  const startEdit = (id: string) => {
      updateBoard(id, { isEditing: true });
      setSelectedBoardId(id);
    };

  return (
        <Layer>
            {board.map((note) => {
            const isSelected = selectedBoardId === note.id;
            
            return (
                <Group key={note.id}>
                <Group
                    x={note.x}
                    y={note.y}
                    draggable={!note.isEditing}
                    onClick={() => setSelectedBoardId(note.id)}
                    onTap={() => setSelectedBoardId(note.id)}
                    onDblClick={() => startEdit(note.id)}
                    onDblTap={() => startEdit(note.id)}
                    onDragEnd={(e) => {
                        const { x, y } = e.target.position();
                        updateBoard(note.id, { x, y });
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
                    stroke={isSelected ? "gray" : "transparent"}
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
                        
                        updateBoard(note.id, {
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
        </Layer>
  )}
export default Board