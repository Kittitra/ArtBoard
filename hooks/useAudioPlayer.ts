// hooks/useAudioPlayer.ts
import { useRef, useState, useCallback } from "react";

export const useAudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const animRef = useRef<number | null>(null);
    const isPlayingRef = useRef(false);
    const playPromiseRef = useRef<Promise<void> | null>(null);

    const [playingId, setPlayingId] = useState<string | null>(null);
    const [progress, setProgress] = useState<Record<string, number>>({});
    const [duration, setDuration] = useState<Record<string, number>>({});

    const play = useCallback(async (id: string, url: string) => {
        // ถ้าเล่น id เดิมอยู่ให้ pause
        if (playingId === id && isPlayingRef.current) {
            if (playPromiseRef.current) await playPromiseRef.current;
            audioRef.current?.pause();
            cancelAnimationFrame(animRef.current!);
            isPlayingRef.current = false;
            setPlayingId(null);
            return;
        }

        // ถ้าเล่น id อื่นอยู่ให้หยุดก่อน
        if (isPlayingRef.current) {
            if (playPromiseRef.current) await playPromiseRef.current;
            audioRef.current?.pause();
            cancelAnimationFrame(animRef.current!);
        }

        if (!audioRef.current) {
            audioRef.current = new Audio();
        }

        const a = audioRef.current;
        a.src = url;
        a.load();

        a.onloadedmetadata = () => {
            setDuration((prev) => ({ ...prev, [id]: a.duration }));
        };

        a.onended = () => {
            isPlayingRef.current = false;
            playPromiseRef.current = null;
            setPlayingId(null);
            setProgress((prev) => ({ ...prev, [id]: 0 }));
            cancelAnimationFrame(animRef.current!);
        };

        playPromiseRef.current = a.play();
        isPlayingRef.current = true;
        setPlayingId(id);

        playPromiseRef.current
            .then(() => {
                const tick = () => {
                    setProgress((prev) => ({ ...prev, [id]: a.currentTime / a.duration || 0 }));
                    animRef.current = requestAnimationFrame(tick);
                };
                animRef.current = requestAnimationFrame(tick);
            })
            .catch((err) => {
                if (err.name !== "AbortError") console.error(err);
                isPlayingRef.current = false;
                setPlayingId(null);
            });
    }, [playingId]);

    const seek = useCallback((id: string, val: number) => {
        const a = audioRef.current;
        if (!a || !duration[id]) return;
        a.currentTime = val * duration[id];
        setProgress((prev) => ({ ...prev, [id]: val }));
    }, [duration]);

    const setVolume = useCallback((vol: number) => {
        if (audioRef.current) audioRef.current.volume = vol;
    }, []);

    const stop = useCallback(() => {
        audioRef.current?.pause();
        cancelAnimationFrame(animRef.current!);
        isPlayingRef.current = false;
        setPlayingId(null);
    }, []);

    return { play, seek, setVolume, stop, playingId, progress, duration };
};