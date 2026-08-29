// components/drag/SketchEditor.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Props {
    sketchId: string
    initialData: string | null
    onSave: (id: string, dataUrl: string) => void
    onCancel: () => void
}

type Tool = "pen" | "eraser" | "select";

interface Stroke {
    id: string
    points: { x: number; y: number }[]
    color: string
    size: number
    tool: "pen" | "eraser"
}

const COLORS = [
    "#000000", "#ffffff", "#ef4444", "#f97316",
    "#eab308", "#22c55e", "#3b82f6", "#8b5cf6",
    "#ec4899", "#6b7280",
];

const SketchEditor = ({ sketchId, initialData, onSave, onCancel }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [tool, setTool] = useState<Tool>("pen");
    const [color, setColor] = useState("#000000");
    const [size, setSize] = useState(4);
    const [isDrawing, setIsDrawing] = useState(false);
    const [strokes, setStrokes] = useState<Stroke[]>([]);
    const [redoStack, setRedoStack] = useState<Stroke[][]>([]);
    const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
    const [selectedStrokeId, setSelectedStrokeId] = useState<string | null>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const bgImageRef = useRef<HTMLImageElement | null>(null);

    const W = 700;
    const H = 500;

    // โหลด initial data
    // useEffect(() => {
    //     if (!initialData || !canvasRef.current) return;
    //     const canvas = canvasRef.current;
    //     const ctx = canvas.getContext("2d");
    //     if (!ctx) return;
    //     const img = new window.Image();
    //     img.src = initialData;
    //     img.onload = () => ctx.drawImage(img, 0, 0);
    // }, []);

    useEffect(() => {
        if (!initialData) return;
        const img = new window.Image();
        img.src = initialData;
        img.onload = () => {
            bgImageRef.current = img;
            // redraw ใหม่หลัง image โหลดเสร็จ
            redraw(strokes);
        };
    }, []);



    

    // วาดทุก stroke ใหม่
    const redraw = useCallback((strokeList: Stroke[], current: Stroke | null = null) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, W, H);

        // ← ใช้ ref แทน new Image() ทุกครั้ง
        if (bgImageRef.current) {
            ctx.drawImage(bgImageRef.current, 0, 0, W, H);
        }

        [...strokeList, ...(current ? [current] : [])].forEach((stroke) => {
            if (stroke.points.length < 2) return;
            ctx.beginPath();
            ctx.globalCompositeOperation = stroke.tool === "eraser" ? "destination-out" : "source-over";
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.size;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
            stroke.points.slice(1).forEach((pt) => ctx.lineTo(pt.x, pt.y));
            ctx.stroke();
        });
        ctx.globalCompositeOperation = "source-over";
    }, [W, H]);

    useEffect(() => {
        redraw(strokes);
    }, [strokes]);

    const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left) * (W / rect.width),
            y: (e.clientY - rect.top) * (H / rect.height),
        };
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (tool === "select") return;
        const pos = getPos(e);
        const newStroke: Stroke = {
            id: crypto.randomUUID(),
            points: [pos],
            color: tool === "eraser" ? "#ffffff" : color,
            size: tool === "eraser" ? size * 3 : size,
            tool,
        };
        setCurrentStroke(newStroke);
        setIsDrawing(true);
        setRedoStack([]);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !currentStroke) return;
        const pos = getPos(e);
        const updated = { ...currentStroke, points: [...currentStroke.points, pos] };
        setCurrentStroke(updated);
        redraw(strokes, updated);
    };

    const handleMouseUp = () => {
        if (!isDrawing || !currentStroke) return;
        setStrokes((prev) => [...prev, currentStroke]);
        setCurrentStroke(null);
        setIsDrawing(false);
    };

    const handleUndo = () => {
        if (strokes.length === 0) return;
        const last = strokes[strokes.length - 1];
        setRedoStack((prev) => [...prev, strokes]);
        const newStrokes = strokes.slice(0, -1);
        setStrokes(newStrokes);
        redraw(newStrokes);
    };

    const handleRedo = () => {
        if (redoStack.length === 0) return;
        const next = redoStack[redoStack.length - 1];
        setRedoStack((prev) => prev.slice(0, -1));
        setStrokes(next);
        redraw(next);
    };

    const handleSave = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        // canvas มี background + strokes อยู่แล้ว export ได้เลย
        const dataUrl = canvas.toDataURL("image/png");
        onSave(sketchId, dataUrl);
    };

    const handleClear = () => {
        setStrokes([]);
        setRedoStack([]);
        redraw([]);
    };

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[999] flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
            onClick={(e) => { if (e.target === overlayRef.current) onCancel(); }}
        >
            <div className="bg-[#f8f8f8] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                style={{ width: W + 48, maxHeight: "95vh" }}>

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-100">
                    <span className="font-semibold text-gray-700">Sketch</span>
                    <div className="flex gap-2">
                        <button onClick={onCancel}
                            className="px-3 py-1 rounded-lg text-sm text-gray-500 hover:bg-gray-100">
                            Cancel
                        </button>
                        <button onClick={handleSave}
                            className="px-4 py-1 rounded-lg text-sm bg-gray-800 text-white hover:bg-gray-700">
                            Save
                        </button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-3 px-5 py-2 bg-white border-b border-gray-100 flex-wrap">
                    {/* Tools */}
                    <div className="flex gap-1 border border-gray-200 rounded-lg p-0.5">
                        {[
                            { t: "pen" as Tool, icon: "✏️", label: "Pen" },
                            { t: "eraser" as Tool, icon: "⬜", label: "Eraser" },
                        ].map(({ t, icon, label }) => (
                            <button
                                key={t}
                                onClick={() => setTool(t)}
                                title={label}
                                className={`px-2 py-1 rounded-md text-sm transition-colors
                                    ${tool === t ? "bg-gray-800 text-white" : "hover:bg-gray-100"}`}
                            >
                                {icon}
                            </button>
                        ))}
                    </div>

                    {/* ขนาดปากกา */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">Size</span>
                        <input
                            type="range" min={1} max={40} value={size}
                            onChange={(e) => setSize(Number(e.target.value))}
                            className="w-20 accent-gray-700"
                        />
                        <span className="text-xs text-gray-500 w-5">{size}</span>
                    </div>

                    {/* Preview size */}
                    <div className="flex items-center justify-center"
                        style={{ width: 24, height: 24 }}>
                        <div
                            className="rounded-full"
                            style={{
                                width: Math.min(size, 24),
                                height: Math.min(size, 24),
                                backgroundColor: tool === "eraser" ? "#e5e7eb" : color,
                                border: "1px solid #d1d5db"
                            }}
                        />
                    </div>

                    {/* สี */}
                    <div className="flex gap-1 flex-wrap">
                        {COLORS.map((c) => (
                            <button
                                key={c}
                                onClick={() => { setColor(c); setTool("pen"); }}
                                className="rounded-full border-2 transition-transform hover:scale-110"
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
                        <button onClick={handleUndo}
                            disabled={strokes.length === 0}
                            className="px-2 py-1 text-sm rounded hover:bg-gray-100 disabled:opacity-30"
                            title="Undo">↩</button>
                        <button onClick={handleRedo}
                            disabled={redoStack.length === 0}
                            className="px-2 py-1 text-sm rounded hover:bg-gray-100 disabled:opacity-30"
                            title="Redo">↪</button>
                        <button onClick={handleClear}
                            className="px-2 py-1 text-xs rounded hover:bg-red-50 text-red-400"
                            title="Clear all">Clear</button>
                    </div>
                </div>

                {/* Canvas */}
                <div className="flex items-center justify-center p-5">
                    <canvas
                        ref={canvasRef}
                        width={W}
                        height={H}
                        style={{
                            background: "#fff",
                            borderRadius: 8,
                            boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
                            cursor: tool === "pen" ? "crosshair"
                                : tool === "eraser" ? "cell"
                                : "default",
                            touchAction: "none",
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    />
                </div>
            </div>
        </div>
    );
};

export default SketchEditor;