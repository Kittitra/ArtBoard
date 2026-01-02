"use client";

import { LinkItem, NoteItem } from '@/lib/type';
import React, { useEffect, useRef, useState } from 'react'
import { Group, Layer, Rect, Stage, Text, Image as KonvaImage } from 'react-konva'
import useImage from "use-image";



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
            const imageHeight = link.previewImage ? link.height * 0.6 : 0;
            const proxiedSrc = `/api/image-proxy?url=${encodeURIComponent(link.previewImage!)}`;

            // console.log("proxy Image src:", proxiedSrc);
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
                    {link.previewImage && (
                        <Group
                        clip={{
                            x: 0,
                            y: 0,
                            width: link.width,
                            height: imageHeight,
                        }}
                        >
                        <LinkPreviewImage
                            src={proxiedSrc}
                            maxWidth={link.width}
                            maxHeight={imageHeight}
                        />
                        </Group>
                    )}
                    <Text
                    text={link.title || link.text}
                    x={PADDING}
                    y={imageHeight + PADDING}
                    width={link.width - PADDING * 2}
                    fontFamily={FONT.family}
                    fontSize={FONT.size}
                    lineHeight={FONT.lineHeight}
                    letterSpacing={FONT.letterSpacing}
                    fill="blue"
                    opacity={link.isEditing ? 0 : 1}
                    wrap="word"
                    textDecoration={isSelected ? "underline" : "none"}
                    onMouseEnter={(e) => {
                        const stage = e.target.getStage();
                        stage!.container().style.cursor = "pointer";
                    }}
                    onMouseLeave={(e) => {
                        const stage = e.target.getStage();
                        stage!.container().style.cursor = "default";
                    }}
                    onClick={() => window.open(link.text, "_blank")}
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

const LinkPreviewImage = ({
  src,
  maxWidth,
  maxHeight,
}: {
  src: string;
  maxWidth: number;
  maxHeight: number;
}) => {
  const [image] = useImage(src, "anonymous");

  if (!image) return null;

  const ratio = Math.min(
    maxWidth / image.width,
    maxHeight / image.height
  );

  const width = image.width * ratio;
  const height = image.height * ratio;

  return (
    <KonvaImage
      image={image}
      width={width}
      height={height}
      x={(maxWidth - width) / 2}   // จัดกึ่งกลาง
      y={(maxHeight - height) / 2}
    />
  );
};

