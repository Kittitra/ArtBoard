// components/drag/ColorCard.tsx
"use client";

import { Group, Rect, Text } from "react-konva";
import { ColorCardItem } from "@/lib/type";

type Props = {
    cards: ColorCardItem[]
    selectedCardId: string | null
    selectedIds?: string[]
    parentBoardId?: string
    updateCard: (id: string, updates: Partial<ColorCardItem>) => void
    selectCard: (id: string) => void
    setSelectedCardId: (id: string | null) => void
    onDragMove?: () => void
    onDragStart?: (id: string, x: number, y: number) => void
    onDragMove_group?: (id: string, x: number, y: number) => void
    onDragEnd?: (id: string, x: number, y: number) => void
    onOpenColorPicker?: (id: string, x: number, y: number) => void
    onEditCaption?: (id: string) => void
}

// แปลง hex → rgb
const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
};

// แปลง hex → hsl
const hexToHsl = (hex: string) => {
    let { r, g, b } = hexToRgb(hex);
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    };
};

// หาสีข้อความที่ contrast ดี
const getTextColor = (hex: string) => {
    const { r, g, b } = hexToRgb(hex);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#1a1a1a" : "#ffffff";
};

const CAPTION_HEIGHT = 40;
const PADDING = 10;
const FONT = "Inter, system-ui, sans-serif";

const ColorCard = ({
    cards, selectedCardId, selectedIds, parentBoardId,
    updateCard, selectCard, setSelectedCardId,
    onDragMove, onDragStart, onDragMove_group, onDragEnd,
    onOpenColorPicker, onEditCaption
}: Props) => {
    return (
        <>
            {cards.map((card) => {
                if (card.parentBoardId !== parentBoardId) return null;

                const isSelected = selectedCardId === card.id;
                const isGroupSelected = selectedIds?.includes(card.id);
                const textColor = getTextColor(card.color);

                const { r, g, b } = hexToRgb(card.color);
                const { h, s, l } = hexToHsl(card.color);

                const rgbText = `rgb(${r}, ${g}, ${b})`;
                const hslText = `hsl(${h}, ${s}%, ${l}%)`;
                const hexText = card.color.toUpperCase();

                return (
                    <Group key={card.id}>
                        <Group
                            x={card.x}
                            y={card.y}
                            draggable
                            onClick={() => selectCard(card.id)}
                            onTap={() => selectCard(card.id)}
                            onDblClick={(e) => {
                                // เปิด color picker ตอน double click
                                const stage = e.target.getStage();
                                if (!stage) return;
                                const pos = stage.getPointerPosition();
                                if (!pos) return;
                                onOpenColorPicker?.(card.id, pos.x + 10, pos.y + 10);
                            }}
                            onDragStart={(e) => {
                                const { x, y } = e.target.position();
                                onDragStart?.(card.id, x, y);
                            }}
                            onDragMove={(e) => {
                                const { x, y } = e.target.position();
                                updateCard(card.id, { x, y });
                                onDragMove?.();
                                if (isGroupSelected) onDragMove_group?.(card.id, x, y);
                            }}
                            onDragEnd={(e) => {
                                const { x, y } = e.target.position();
                                onDragEnd?.(card.id, x, y);
                            }}
                        >
                            {/* กล่องสีหลัก */}
                            <Rect
                                width={card.width}
                                height={card.height}
                                fill={card.color}
                                cornerRadius={[8, 8, 0, 0]}
                                stroke={isGroupSelected ? "#4A90D9" : isSelected ? "#999" : "transparent"}
                                strokeWidth={2}
                            />

                            {/* HEX */}
                            <Text
                                x={PADDING}
                                y={card.height - 58}
                                text={hexText}
                                fontSize={13}
                                fontStyle="bold"
                                fontFamily={FONT}
                                fill={textColor}
                                opacity={0.9}
                            />

                            {/* RGB */}
                            <Text
                                x={PADDING}
                                y={card.height - 42}
                                text={rgbText}
                                fontSize={10}
                                fontFamily={FONT}
                                fill={textColor}
                                opacity={0.7}
                            />

                            {/* HSL */}
                            <Text
                                x={PADDING}
                                y={card.height - 28}
                                text={hslText}
                                fontSize={10}
                                fontFamily={FONT}
                                fill={textColor}
                                opacity={0.7}
                            />

                            {/* Caption box */}
                            <Rect
                                y={card.height}
                                width={card.width}
                                height={CAPTION_HEIGHT}
                                fill="#ffffff"
                                cornerRadius={[0, 0, 8, 8]}
                                stroke={isGroupSelected ? "#4A90D9" : isSelected ? "#999" : "#e5e7eb"}
                                strokeWidth={1}
                                onDblClick={() => onEditCaption?.(card.id)}  // ← เพิ่ม
                                onDblTap={() => onEditCaption?.(card.id)}
                            />

                            {/* Caption text */}
                            <Text
                                x={PADDING}
                                y={card.height + 12}
                                text={card.caption || "Caption"}
                                fontSize={12}
                                fontFamily={FONT}
                                fill={card.caption ? "#333" : "#aaa"}
                                width={card.width - PADDING * 2}
                                ellipsis
                                wrap="none"
                                onDblClick={() => onEditCaption?.(card.id)}
                                onDblTap={() => onEditCaption?.(card.id)}

                            />
                        </Group>
                        
                    </Group>
                );
            })}
        </>
    );
};

export default ColorCard;