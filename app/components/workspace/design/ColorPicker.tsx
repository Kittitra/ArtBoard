// components/ColorPicker.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import useEyeDropper from "use-eye-dropper";

interface Props {
    color: string;
    onChange: (color: string) => void;
    onClose: () => void;
}
const ColorPicker = ({ color, onChange, onClose }: Props) => {
    const [hex, setHex] = useState(color);
    const { open, isSupported } = useEyeDropper();
    const ref = useRef<HTMLDivElement>(null);

    // ปิดตอนคลิกนอก
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClose();
            }
        };
        window.addEventListener("mousedown", handleClick);
        return () => window.removeEventListener("mousedown", handleClick);
    }, [onClose]);

    const handleChange = (newColor: string) => {
        setHex(newColor);
        onChange(newColor);
    };

    const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setHex(val);
        if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
            onChange(val);
        }
    };

    const handleEyeDropper = async () => {
        try {
            const result = await open();
            handleChange(result.sRGBHex);
        } catch (e) {
            // ผู้ใช้กด Escape
        }
    };

    return (
        <div
            ref={ref}
            className="absolute z-50 bg-white rounded-xl shadow-2xl p-3 flex flex-col gap-3 w-[220px]"
            onMouseDown={(e) => e.stopPropagation()}  // ← ไม่ให้ Konva รับ event
        >
            {/* Color Picker */}
            <HexColorPicker color={hex} onChange={handleChange} draggable={true} style={{ width: "100%" }} />

            {/* Hex Input + EyeDropper */}
            <div className="flex h-full gap-2 items-center">
                <div
                    className="w-8 h-8 rounded-md border border-gray-200 flex-shrink-0"
                    style={{ backgroundColor: hex }}
                />
                <input
                    value={hex}
                    onChange={handleHexInput}
                    className="flex-1 border w-full border-gray-200 rounded-md px-2 py-1 text-sm font-mono"
                    maxLength={7}
                />
                {isSupported() && (
                    <button
                        onClick={handleEyeDropper}
                        className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-100"
                        title="Eyedropper"
                    >
                        {/* Eyedropper icon */}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2l9 9-9 9M3 12h18"/>
                            <path d="m2 22 5-5"/>
                            <path d="M14.5 9.5 20 4l-4-4-5.5 5.5"/>
                            <path d="m4 20 1.5-1.5"/>
                            <path d="M9.5 14.5 4 20l4 4 5.5-5.5"/>
                        </svg>
                    </button>
                )}
            </div>

           
        </div>
    );
};

export default ColorPicker;