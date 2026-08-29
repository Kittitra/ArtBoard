// components/drag/AudioElement.tsx
"use client";

import { Group, Rect, Text, Path, Circle } from "react-konva";
import { AudioItem } from "@/lib/type";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

type Props = {
    audios: AudioItem[]
    selectedAudioId: string | null
    selectedIds?: string[]
    parentBoardId?: string
    updateAudio: (id: string, updates: Partial<AudioItem>) => void
    selectAudio: (id: string) => void
    setSelectedAudioId: (id: string | null) => void
    onDragMove?: () => void
    onDragStart?: (id: string, x: number, y: number) => void
    onDragMove_group?: (id: string, x: number, y: number) => void
    onDragEnd?: (id: string, x: number, y: number) => void
    onOpenAudio?: (id: string) => void
    onSelect?: () => void
    audioPlayer: ReturnType<typeof useAudioPlayer>
}

const W = 220;
const H = 64;

const AudioElement = ({
    audios, selectedAudioId, selectedIds, parentBoardId,
    updateAudio, selectAudio, setSelectedAudioId,
    onDragMove, onDragStart, onDragMove_group, onDragEnd,
    onOpenAudio, onSelect, audioPlayer
}: Props) => {
    const { playingId, progress, play } = audioPlayer;

    const getProxyUrl = (url: string) => {
        if (!url) return "";
        if (url.startsWith("/")) return url;
        return `/api/audio-proxy?url=${encodeURIComponent(url)}`;
    };  
    return (
        <>
            {audios.map((audio) => {
                if (audio.parentBoardId !== parentBoardId) return null;

                const isSelected = selectedAudioId === audio.id;
                const isGroupSelected = selectedIds?.includes(audio.id);
                const isReady = audio.status === "ready";

                const isPlaying = playingId === audio.id;
                const currentProgress = progress[audio.id] || 0;

                return (
                    <Group key={audio.id}>
                        <Group
                            x={audio.x}
                            y={audio.y}
                            draggable
                            onClick={() => { onSelect?.(); selectAudio(audio.id); }}
                            onTap={() => { onSelect?.(); selectAudio(audio.id); }}
                            onDblClick={() => onOpenAudio?.(audio.id)}
                            onDblTap={() => onOpenAudio?.(audio.id)}
                            onDragStart={(e) => {
                                const { x, y } = e.target.position();
                                onDragStart?.(audio.id, x, y);
                            }}
                            onDragMove={(e) => {
                                const { x, y } = e.target.position();
                                updateAudio(audio.id, { x, y });
                                onDragMove?.();
                                if (isGroupSelected) onDragMove_group?.(audio.id, x, y);
                            }}
                            onDragEnd={(e) => {
                                const { x, y } = e.target.position();
                                onDragEnd?.(audio.id, x, y);
                            }}
                        >
                            {/* กล่องหลัก */}
                            <Rect
                                width={audio.width}
                                height={audio.height}
                                fill="white"
                                cornerRadius={10}
                                shadowBlur={6}
                                shadowOpacity={0.15}
                                shadowOffsetY={2}
                                stroke={
                                    isGroupSelected ? "#4A90D9"
                                    : isSelected ? "#000000"
                                    : "transparent"
                                }
                                strokeWidth={2}
                            />

                            {/* play button circle */}
                            <Circle
                                x={36}
                                y={audio.height / 2}
                                radius={18}
                                fill={isReady ? "#6366f1" : "#374151"}
                            />

                            {/* waveform bars — แสดง progress */}
                            {/* {isReady && Array.from({ length: 18 }).map((_, i) => {
                                const filled = i / 18 < currentProgress;
                                const barH = 6 + Math.abs(Math.sin(i * 0.8) * 10);
                                return (
                                    <Rect
                                        key={i}
                                        x={65 + i * 8}
                                        y={audio.height / 2 - barH / 2}
                                        width={4}
                                        height={barH}
                                        fill={filled ? "#818cf8" : "#6366f1"}
                                        opacity={filled ? 1 : 0.4}
                                        cornerRadius={2}
                                    />
                                );
                            })} */}

                            {/* play icon */}
                            <Text
                                x={28}
                                y={audio.height / 2 - 8}
                                text={isPlaying ? "⏸" : "▶"}
                                fontSize={14}
                                fill="white"
                                onClick={() => play(audio.id, getProxyUrl(audio.url))}
                            />

                            {/* waveform bars */}
                            {/* {isReady && Array.from({ length: 18 }).map((_, i) => {
                                const barH = 6 + Math.sin(i * 0.8) * 10 + Math.random() * 8;
                                return (
                                    <Rect
                                        key={i}
                                        x={65 + i * 8}
                                        y={audio.height / 2 - barH / 2}
                                        width={4}
                                        height={barH}
                                        fill="#6366f1"
                                        opacity={0.6 + (i % 3) * 0.1}
                                        cornerRadius={2}
                                    />
                                );
                            })} */}

                            {/* title หรือ placeholder */}
                            <Text
                                x={65}
                                y={isReady ? audio.height - 18 : audio.height / 2 - 7}
                                width={audio.width - 75}
                                text={audio.title || (isReady ? "" : "Double click to add URL")}
                                fontSize={12}
                                fontFamily="Inter, system-ui, sans-serif"
                                fill={audio.title ? "#000000" : "#e5e7eb"}
                                ellipsis
                                wrap="none"
                            />
                        </Group>
                    </Group>
                );
            })}
        </>
    );
};

export default AudioElement;