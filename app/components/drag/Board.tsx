"use client";

import Menu from '@/app/components/Menu'
import Navbar from '@/app/components/Navbar'
import Tools from '@/app/components/Tools'
import { BoardItem, NoteItem } from '@/lib/type';
import React, { useEffect, useRef, useState } from 'react'
import { Group, Image, Layer, Rect, Stage, Text } from 'react-konva'
import { renderToStaticMarkup } from "react-dom/server";
import { FaFlipboard } from 'react-icons/fa';
import { useRouter } from 'next/navigation';


type BoardProps = {
    setSelectedBoardId: (id: string | null) => void;
    board: BoardItem[];
    selectedBoardId: string | null;
    updateBoard: (id: string, updates: Partial<BoardItem>) => void;
    startEditBoardTitle : (id: string) => void;
    versionId: string;
    parentBoardId: string | undefined;
    onDragMove?: () => void;
    onDragEnd?: (id: string, x: number, y: number) => void;
    selectedIds?: string[];
    onDragMove_group?: (id: string, dx: number, dy: number) => void;
    onDragStart?: (id: string, x: number, y: number) => void;
    onSelect?: () => void;
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

const Board = ({ board, updateBoard, selectedBoardId, setSelectedBoardId, startEditBoardTitle, versionId, parentBoardId, onDragMove, onDragEnd, selectedIds, onDragStart, onDragMove_group, onSelect }: BoardProps) => {

    const startEdit = (id: string) => {
      updateBoard(id, { isEditing: false });
      setSelectedBoardId(id);
    };

        const [img, setImg] = useState<HTMLImageElement | null>(null);

        const router = useRouter();

        useEffect(() => {
            const svgString = renderToStaticMarkup(
            <FaFlipboard color="black" size={40} />
            );

            const svgBlob = new Blob([svgString], {
            type: "image/svg+xml;charset=utf-8",
            });

            const url = URL.createObjectURL(svgBlob);

            const image = new window.Image();

            image.onload = () => {
            setImg(image);
            URL.revokeObjectURL(url);
            };

            image.src = url;
        }, []);

  return (
        <>
            {board.map((item) => {
                const isSelected = selectedBoardId === item.id;
                if(!item.parentBoardId && parentBoardId) {
                    return null; // ข้ามการเรนเดอร์ถ้า parentBoardId ไม่มีค่า
                }
                return (
                    <Group key={item.id}>
                        <Group
                            x={item.x}
                            y={item.y}
                            draggable={!item.isEditing}
                            onClick={() => {
                                onSelect?.();           // ← เรียก clearSelection ก่อน
                                setSelectedBoardId(item.id);
                            }}
                            onTap={() => {
                                onSelect?.();
                                setSelectedBoardId(item.id);
                            }}
                             onDragStart={(e) => {
                                const { x, y } = e.target.position();
                                onDragStart?.(item.id, x, y);
                            }}
                            onDragMove={(e) => {
                                const { x, y } = e.target.position();
                                updateBoard(item.id, { x, y });  // ← เพิ่ม update ตัวเองด้วย
                                onDragMove?.();
                                if (selectedIds?.includes(item.id)) {
                                    onDragMove_group?.(item.id, x, y);
                                }
                            }}
                            onDragEnd={(e) => {
                                const { x, y } = e.target.position();
                                updateBoard(item.id, { x, y });
                                onDragEnd?.(item.id, x, y);
                            }}
                        >
                            <Group
                                onMouseEnter={(e:any) => {
                                    e.target.getStage().container().style.cursor = "pointer";
                                }}
                                onMouseLeave={(e:any) => {
                                    e.target.getStage().container().style.cursor = "default";
                                }}
                                onDblClick={() => {
                                    router.push(
                                    `/auth/project/ce34db1d-e682-4de3-8a9f-e88e0620d94e/design/${versionId}/${item.id}`
                                    );
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
                                    stroke={selectedIds?.includes(item.id) ? "#4A90D9" : isSelected ? "gray" : "transparent"}
                                    strokeWidth={2}
                                    
                                />
                                {img && (
                                    <Image
                                    image={img}
                                    x={10}
                                    y={15}
                                    width={40}
                                    height={40}
                                    />
                                )}
                            </Group>
                            <Text
                                text={item.title || "Untitled"}
                                // x={8}
                                y={-50}  // ← อยู่เหนือ board
                                fontSize={13}
                                fontStyle="600"
                                fill="#555"
                                onDblClick={() => startEditBoardTitle(item.id)}
                                onDblTap={() => startEditBoardTitle(item.id)}
                                opacity={item.isEditingTitle ? 0 : 1}  // ← ซ่อนตอน edit

                                // text={board.title}
                                width={item.width}
                                height={item.height}
                                align="center"
                                verticalAlign="middle"
                                wrap="none"
                                ellipsis={true}
                                // fontSize={16}
                                // fill="black"
                            />
                        </Group>
                    </Group>
                );
            })}
        </>
  )}
export default Board

