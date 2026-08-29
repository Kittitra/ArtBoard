// components/drag/DrawEditor.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DrawItem, DrawStroke } from "@/lib/type";

interface Props {
    draw: DrawItem
    onUpdate: (id: string, updates: Partial<DrawItem>) => void
    onClose: () => void
}

const COLORS = [
    "#000000", "#374151", "#ef4444", "#f97316",
    "#eab308", "#22c55e", "#3b82f6", "#8b5cf6",
    "#ec4899", "#ffffff",
];

const DrawEditor = ({ draw, onUpdate, onClose }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [tool, setTool] = useState<"pen" | "eraser">("pen");
    const [color, setColor] = useState("#000000");
    const [size, setSize] = useState(3);
    const [isDrawing, setIsDrawing] = useState(false);
    const [strokes, setStrokes] = useState<DrawStroke[]>(draw.strokes || []);
    const [redoStack, setRedoStack] = useState<DrawStroke[][]>([]);
    const currentStrokeRef = useRef<DrawStroke | null>(null);

    const W = draw.width;
    const H = draw.height;
    const SCALE = Math.min(700 / W, 500 / H, 2);
    const CW = Math.round(W * SCALE);
    const CH = Math.round(H * SCALE);

    const redraw = useCallback((strokeList: DrawStroke[]) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, CW, CH);

        // checkerboard pattern สำหรับ transparent background
        const cs = 10;
        for (let y = 0; y < CH; y += cs) {
            for (let x = 0; x < CW; x += cs) {
                ctx.fillStyle = (Math.floor(x / cs) + Math.floor(y / cs)) % 2 === 0
                    ? "#f0f0f0" : "#e0e0e0";
                ctx.fillRect(x, y, cs, cs);
            }
        }

        strokeList.forEach((stroke) => {
            if (stroke.points.length < 4) return;
            ctx.beginPath();
            ctx.globalCompositeOperation =
                stroke.tool === "eraser" ? "destination-out" : "source-over";
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.size * SCALE;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.moveTo(stroke.points[0] * SCALE, stroke.points[1] * SCALE);
            for (let i = 2; i < stroke.points.length; i += 2) {
                ctx.lineTo(stroke.points[i] * SCALE, stroke.points[i + 1] * SCALE);
            }
            ctx.stroke();
        });
        ctx.globalCompositeOperation = "source-over";
    }, [CW, CH, SCALE]);

    useEffect(() => {
        redraw(strokes);
    }, [strokes, redraw]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
            if (e.ctrlKey && !e.shiftKey && e.key.toLowerCase() === "z") handleUndo();
            if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "z") handleRedo();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [strokes, redoStack]);

    const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left) / SCALE,
            y: (e.clientY - rect.top) / SCALE,
        };
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const { x, y } = getPos(e);
        currentStrokeRef.current = {
            id: crypto.randomUUID(),
            points: [x, y],
            color: tool === "eraser" ? "#000000" : color,
            size: tool === "eraser" ? size * 3 : size,
            tool,
        };
        setIsDrawing(true);
        setRedoStack([]);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !currentStrokeRef.current) return;
        const { x, y } = getPos(e);
        currentStrokeRef.current.points.push(x, y);

        // วาด incremental
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!ctx || currentStrokeRef.current.points.length < 4) return;

        const pts = currentStrokeRef.current.points;
        const len = pts.length;
        ctx.beginPath();
        ctx.globalCompositeOperation =
            tool === "eraser" ? "destination-out" : "source-over";
        ctx.strokeStyle = color;
        ctx.lineWidth = (tool === "eraser" ? size * 3 : size) * SCALE;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.moveTo(pts[len - 4] * SCALE, pts[len - 3] * SCALE);
        ctx.lineTo(pts[len - 2] * SCALE, pts[len - 1] * SCALE);
        ctx.stroke();
        ctx.globalCompositeOperation = "source-over";
    };

    const handleMouseUp = () => {
        if (!isDrawing || !currentStrokeRef.current) return;
        const newStrokes = [...strokes, currentStrokeRef.current];
        setStrokes(newStrokes);
        currentStrokeRef.current = null;
        setIsDrawing(false);
    };

    const handleUndo = () => {
        if (strokes.length === 0) return;
        setRedoStack((prev) => [...prev, strokes]);
        setStrokes((prev) => prev.slice(0, -1));
    };

    const handleRedo = () => {
        if (redoStack.length === 0) return;
        const next = redoStack[redoStack.length - 1];
        setRedoStack((prev) => prev.slice(0, -1));
        setStrokes(next);
    };

    const handleClear = () => {
        setRedoStack([...redoStack, strokes]);
        setStrokes([]);
    };

    const handleClose = () => {
        onUpdate(draw.id, { strokes });
        onClose();
    };

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[999] flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
            onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                    <span className="font-semibold text-gray-700 text-sm">Draw</span>
                    <div className="flex gap-2">
                        <button
                            onClick={handleClose}
                            className="px-4 py-1.5 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                        >
                            Done
                        </button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 border-b border-gray-100 flex-wrap">
                    {/* Pen / Eraser */}
                    <div className="flex gap-1 border border-gray-200 rounded-lg p-0.5 bg-white">
                        {[
                            { t: "pen" as const, icon: "✏️" },
                            { t: "eraser" as const, icon: "◻️" },
                        ].map(({ t, icon }) => (
                            <button
                                key={t}
                                onClick={() => setTool(t)}
                                className={`px-2 py-1 rounded-md text-sm transition-colors
                                    ${tool === t ? "bg-gray-800 text-white" : "hover:bg-gray-100"}`}
                            >
                                {icon}
                            </button>
                        ))}
                    </div>

                    {/* Size */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">Size</span>
                        <input
                            type="range" min={1} max={30} value={size}
                            onChange={(e) => setSize(Number(e.target.value))}
                            className="w-20 accent-gray-700"
                        />
                        <div
                            className="rounded-full border border-gray-200 flex-shrink-0"
                            style={{
                                width: Math.min(size * 1.5, 24),
                                height: Math.min(size * 1.5, 24),
                                backgroundColor: tool === "eraser" ? "#e5e7eb" : color,
                            }}
                        />
                    </div>

                    {/* Colors */}
                    <div className="flex gap-1 flex-wrap">
                        {COLORS.map((c) => (
                            <button
                                key={c}
                                onClick={() => { setColor(c); setTool("pen"); }}
                                className="rounded-full border-2 transition-transform hover:scale-110 flex-shrink-0"
                                style={{
                                    width: 20, height: 20,
                                    backgroundColor: c,
                                    borderColor: color === c && tool === "pen" ? "#4A90D9" : "#e5e7eb",
                                }}
                            />
                        ))}
                    </div>

                    {/* Undo / Redo / Clear */}
                    <div className="flex gap-1 ml-auto">
                        <button
                            onClick={handleUndo}
                            disabled={strokes.length === 0}
                            className="px-2 py-1 text-sm rounded hover:bg-gray-100 disabled:opacity-30"
                        >↩</button>
                        <button
                            onClick={handleRedo}
                            disabled={redoStack.length === 0}
                            className="px-2 py-1 text-sm rounded hover:bg-gray-100 disabled:opacity-30"
                        >↪</button>
                        <button
                            onClick={handleClear}
                            className="px-2 py-1 text-xs rounded hover:bg-red-50 text-red-400"
                        >Clear</button>
                    </div>
                </div>

                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    width={CW}
                    height={CH}
                    style={{
                        cursor: tool === "pen" ? "crosshair" : "cell",
                        touchAction: "none",
                        display: "block",
                        backgroundColor: "transparent",
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                />
            </div>
        </div>
    );
};

export default DrawEditor;