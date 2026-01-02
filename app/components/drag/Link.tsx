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
const MAX_TEXT_LINES = 2;
const HANDLE_OFFSET = 6;
const HANDLE_SIZE = 8;

const Link = ({ links, updateLink, setSelectedLinkId, selectedLinkId }: NoteProps) => {
    const startEdit = (id: string) => {
      updateLink(id, { isEditing: true });
      setSelectedLinkId(id);
    };
    const textLineHeight = FONT.size * FONT.lineHeight;
    const textHeight = MAX_TEXT_LINES * textLineHeight;

    

  return (
        <Layer>
            {links.map((link) => {
            const isSelected = link.id === selectedLinkId;
            const imageHeight = link.previewImage
            ? Math.min(
                link.height * 0.8,
                link.height - textHeight - PADDING * 2
                )
            : 0;
            const proxiedSrc = `/api/image-proxy?url=${encodeURIComponent(link.previewImage!)}`;

            //ขยายรูปภาพให้พอดีกับกล่อง
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
                            width={link.width}
                            height={imageHeight}
                       
                        />
                        </Group>
                    )}
                    <Text
                    text={link.title || link.text}
                    x={PADDING}
                    y={imageHeight + PADDING}
                    width={link.width - PADDING * 2}
                    height={textHeight}
                    fontFamily={FONT.family}
                    fontSize={FONT.size}
                    lineHeight={FONT.lineHeight}
                    letterSpacing={FONT.letterSpacing}
                    ellipsis
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
                        x={link.x + link.width - HANDLE_SIZE}
                        y={link.y + link.height - HANDLE_SIZE}
                        draggable
                        onMouseEnter={(e) => {
                            const stage = e.target.getStage();
                            if (stage) {
                                stage.container().style.cursor = "nwse-resize";
                            }
                        }}
                        onMouseLeave={(e) => {
                            const stage = e.target.getStage();
                            if (stage) {
                                stage.container().style.cursor = "default";
                            }
                        }}
                        onDragMove={(e) => {
                        const pos = e.target.position();

                        const newWidth = Math.max(
                            MIN_SIZE,
                            pos.x - link.x + HANDLE_SIZE
                        );

                        const newHeight = link.imageRatio
                            ? newWidth / link.imageRatio
                            : Math.max(
                                MIN_SIZE,
                                pos.y - link.y + HANDLE_SIZE
                            );

                        updateLink(link.id, {
                            width: newWidth,
                            height: newHeight,
                        });

                        e.target.position({
                            x: link.x + newWidth - HANDLE_SIZE,
                            y: link.y + newHeight - HANDLE_SIZE,
                        });
                        }}
                    >
                        <Rect
                        width={HANDLE_SIZE}
                        height={HANDLE_SIZE}
                        fill="rgba(0,0,0,0.25)"
                        cornerRadius={HANDLE_SIZE}
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
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) => {
  const [image] = useImage(src, "anonymous");

  if (!image) return null;

  const ratio = Math.max(width / image.width, height / image.height);

  return (
    <Group clip={{ x: 0, y: 0, width, height }}>
      <KonvaImage
        image={image}
        width={image.width * ratio}
        height={image.height * ratio}
        x={(width - image.width * ratio) / 2}
        y={(height - image.height * ratio) / 2}
      />
    </Group>
  );
};



