"use client";

import Menu from '@/app/components/Menu'
import Navbar from '@/app/components/Navbar'
import Tools from '@/app/components/Tools'
import { LinkItem, NoteItem } from '@/lib/type';
import React, { useEffect, useRef, useState } from 'react'
import { Group, Layer, Rect, Stage, Text } from 'react-konva'


type NoteProps = {
    setSelectedLinkId: (id: string | null) => void;
    links: LinkItem[];
    selectedLinkId: string | null;
    updateLink: (id: string, updates: Partial<LinkItem>) => void;
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

const Link = ({ links, updateLink, setSelectedLinkId, selectedLinkId }: NoteProps) => {

  const startEdit = (id: string) => {
      updateLink(id, { isEditing: true });
      setSelectedLinkId(id);
    };

  return (
        <Layer>
            {links.map((link) => {
            const isSelected = link.id === selectedLinkId;
            
            return (
                <Group key={link.id}>
                <Group
                    x={link.x}
                    y={link.y}
                    draggable={!link.isEditing}
                    onClick={() => setSelectedLinkId(link.id)}
                    onTap={() => setSelectedLinkId(link.id)}
                    onDblClick={() => startEdit(link.id)}
                    onDblTap={() => startEdit(link.id)}
                    onDragEnd={(e) => {
                        const { x, y } = e.target.position();
                        updateLink(link.id, { x, y });
                    }}
                >
                    <Rect
                    width={link.width}
                    height={link.height}
                    fill="white"
                    cornerRadius={0}
                    shadowBlur={4}
                    shadowOpacity={0.1}
                    shadowOffsetY={2}
                    stroke={isSelected ? "gray" : "transparent"}
                    strokeWidth={2}
                    />
                    <Text
                    text={link.text}
                    x={PADDING}
                    y={PADDING}
                    width={link.width - PADDING * 2}
                    fontFamily={FONT.family}
                    fontSize={FONT.size}
                    lineHeight={FONT.lineHeight}
                    letterSpacing={FONT.letterSpacing}
                    fill="#333"
                    opacity={link.isEditing ? 0 : 1}
                    wrap="word"
                    />
                </Group>
                
                {/* Resize Handle */}
                {isSelected && !link.isEditing && (
                    <Group
                    x={link.x + link.width}
                    y={link.y + link.height}
                    draggable
                    onDragMove={(e) => {
                        const pos = e.target.position();
                        const newWidth = Math.max(MIN_SIZE, pos.x - link.x);
                        const newHeight = Math.max(MIN_SIZE, pos.y - link.y);
                        
                        updateLink(link.id, {
                        width: newWidth,
                        height: newHeight,
                        });
                        
                        // Reset handle position
                        e.target.position({
                        x: link.x + newWidth,
                        y: link.y + newHeight,
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
export default Link