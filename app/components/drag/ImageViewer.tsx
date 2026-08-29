// components/drag/ImageViewer.tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
    url: string
    onClose: () => void
}

const ImageViewer = ({ url, onClose }: Props) => {
    const [scale, setScale] = useState(1);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const overlayRef = useRef<HTMLDivElement>(null);

    const MIN_SCALE = 0.2;
    const MAX_SCALE = 5;

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "+" || e.key === "=") zoomIn();
            if (e.key === "-") zoomOut();
            if (e.key === "0") resetView();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [scale]);

    const zoomIn = () => setScale((s) => Math.min(s * 1.2, MAX_SCALE));
    const zoomOut = () => setScale((s) => Math.max(s / 1.2, MIN_SCALE));
    const resetView = () => { setScale(1); setPos({ x: 0, y: 0 }); };

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        setScale((s) => Math.min(Math.max(s * delta, MIN_SCALE), MAX_SCALE));
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button !== 0) return;
        setIsDragging(true);
        setDragStart({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setPos({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    };

    const handleMouseUp = () => setIsDragging(false);

    const handleDownload = async () => {
        try {
            const res = await fetch(url);
            const blob = await res.blob();
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = `image_${Date.now()}.${blob.type.split("/")[1] || "jpg"}`;
            a.click();
            URL.revokeObjectURL(a.href);
        } catch {
            window.open(url, "_blank");
        }
    };

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[999] flex flex-col"
            style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
            onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        >
            {/* Toolbar */}
            <div className="flex items-center justify-between px-5 py-3 flex-shrink-0">
                <div className="flex items-center gap-2">
                    {/* Zoom out */}
                    <button
                        onClick={zoomOut}
                        disabled={scale <= MIN_SCALE}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 transition-colors"
                        title="Zoom out ( - )"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            <line x1="8" y1="11" x2="14" y2="11"/>
                        </svg>
                    </button>

                    {/* Scale display + reset */}
                    <button
                        onClick={resetView}
                        className="px-3 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono min-w-[56px] text-center"
                        title="Reset view ( 0 )"
                    >
                        {Math.round(scale * 100)}%
                    </button>

                    {/* Zoom in */}
                    <button
                        onClick={zoomIn}
                        disabled={scale >= MAX_SCALE}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 transition-colors"
                        title="Zoom in ( + )"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                        </svg>
                    </button>

                    {/* Fit to screen */}
                    <button
                        onClick={resetView}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                        title="Fit to screen"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                        </svg>
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    {/* Download */}
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-3 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors"
                        title="Download"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Download
                    </button>

                    {/* Open in new tab */}
                    <button
                        onClick={() => window.open(url, "_blank")}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                        title="Open in new tab"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                    </button>

                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                        title="Close (Esc)"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Image area */}
            <div
                className="flex-1 overflow-hidden flex items-center justify-center"
                style={{ cursor: isDragging ? "grabbing" : "grab" }}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <img
                    src={url}
                    alt=""
                    draggable={false}
                    style={{
                        transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                        transformOrigin: "center center",
                        maxWidth: "90vw",
                        maxHeight: "85vh",
                        objectFit: "contain",
                        userSelect: "none",
                        borderRadius: 4,
                        transition: isDragging ? "none" : "transform 0.1s ease",
                    }}
                />
            </div>

            {/* Hint */}
            <div className="text-center py-2 text-white/30 text-xs flex-shrink-0">
                Scroll to zoom · Drag to pan · Press Esc to close
            </div>
        </div>
    );
};

export default ImageViewer;