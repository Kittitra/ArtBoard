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
      updateBoard(id, { isEditing: false });
      setSelectedBoardId(id);
    };

  return (
        <Layer>
            {board.map((item) => {
            const isSelected = selectedBoardId === item.id;
            
            return (
                <Group key={item.id}>
                    <Group
                        x={item.x}
                        y={item.y}
                        draggable={!item.isEditing}
                        onClick={() => setSelectedBoardId(item.id)}
                        onTap={() => setSelectedBoardId(item.id)}
                        
                        onDragEnd={(e) => {
                            const { x, y } = e.target.position();
                            updateBoard(item.id, { x, y });
                        }}
                    >
                        <Rect
                        width={item.width}
                        height={item.height}
                        fill="white"
                        cornerRadius={8}
                        shadowBlur={4}
                        shadowOpacity={0.1}
                        shadowOffsetY={2}
                        stroke={isSelected ? "gray" : "transparent"}
                        strokeWidth={2}
                        />
                        <Text
                        text="5555555555555555555"
                        x={10}
                        y={PADDING + 60}
                        width={item.width - PADDING * 2}
                        fontFamily={FONT.family}
                        fontSize={FONT.size}
                        letterSpacing={FONT.letterSpacing}
                        lineHeight={FONT.lineHeight}
                        onDblClick={() => startEdit(item.id)}
                        onDblTap={() => startEdit(item.id)}
                        fill="#000"
                        opacity={item.isEditing ? 0 : 1}
                        // wrap="word"
                        />
                    </Group>
                </Group>
            );
            })}
        </Layer>
  )}
export default Board