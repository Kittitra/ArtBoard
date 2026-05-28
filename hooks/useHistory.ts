// แทนที่ canUndoRef/canRedoRef ทั้งหมด
// ให้ useHistory return ref ของ index และ history length แทน

// hooks/useHistory.ts
import { useState, useCallback, useRef } from "react";

export function useHistory<T>(initialState: T) {
    const historyRef = useRef<T[]>([initialState]);
    const indexRef = useRef(0);
    const [, forceRender] = useState(0);

    const state = historyRef.current[indexRef.current];
    const canUndo = indexRef.current > 0;
    const canRedo = indexRef.current < historyRef.current.length - 1;

    const push = useCallback((newState: T) => {
        historyRef.current = historyRef.current.slice(0, indexRef.current + 1);
        historyRef.current.push(newState);
        indexRef.current = historyRef.current.length - 1;
        forceRender((n) => n + 1);
    }, []);

    const undo = useCallback(() => {
        if (indexRef.current <= 0) return;
        indexRef.current -= 1;
        forceRender((n) => n + 1);
    }, []);

    const redo = useCallback(() => {
        if (indexRef.current >= historyRef.current.length - 1) return;
        indexRef.current += 1;
        forceRender((n) => n + 1);
    }, []);

    // expose ref สำหรับ keyboard handler
    const canUndoRef = useRef(false);
    const canRedoRef = useRef(false);
    canUndoRef.current = canUndo;   // ← update ทุก render โดยไม่ต้องใช้ useEffect
    canRedoRef.current = canRedo;

    return { state, push, undo, redo, canUndo, canRedo, canUndoRef, canRedoRef };
}