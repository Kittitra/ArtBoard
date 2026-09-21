// components/drag/DocumentEditor.tsx
"use client";

import { useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { DocumentItem } from "@/lib/type";

interface Props {
    doc: DocumentItem
    onClose: () => void
    onUpdate: (id: string, updates: Partial<DocumentItem>) => void
}

const DocumentEditor = ({ doc, onClose, onUpdate }: Props) => {
    const overlayRef = useRef<HTMLDivElement>(null);

    const editor = useEditor({
        immediatelyRender: false, // ไม่ต้องเรนเดอร์ตอนแรก
        extensions: [
            StarterKit,
            Placeholder.configure({ placeholder: "Start writing..." }),
            
        ],
        content: doc.content ? JSON.parse(doc.content) : "",
        onUpdate: ({ editor }) => {
            onUpdate(doc.id, { content: JSON.stringify(editor.getJSON()) });
        },
    });

    // ปิดตอนกด Escape
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    // ปิดตอนคลิก overlay
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) onClose();
    };

    return (
        <div
            ref={overlayRef}
            onMouseDown={handleOverlayClick} // ใช้ onMouseDown แทน onClick เพื่อให้แน่ใจว่า Konva จะไม่ได้รับ event นี้
            className="fixed inset-0 z-[999] flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        >
            <div className="bg-white rounded-2xl shadow-2xl flex flex-col"
                style={{ width: 680, height: "80vh" }}>

                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-100">
                    <input
                        className="text-xl font-semibold text-gray-800 outline-none flex-1 bg-transparent"
                        placeholder="Untitled"
                        value={doc.title}
                        onChange={(e) => onUpdate(doc.id, { title: e.target.value })}
                    />
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-xl ml-4"
                    >
                        ✕
                    </button>
                </div>

                {/* Toolbar */}
                {editor && (
                    <div className="flex gap-1 px-6 py-2 border-b border-gray-100 flex-wrap">
                        {[
                            { label: "B", action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold") },
                            { label: "I", action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic") },
                            { label: "S", action: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive("strike") },
                            { label: "H1", action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive("heading", { level: 1 }) },
                            { label: "H2", action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }) },
                            { label: "• List", action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList") },
                            { label: "1. List", action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList") },
                            { label: "Code", action: () => editor.chain().focus().toggleCode().run(), active: editor.isActive("code") },
                        ].map(({ label, action, active }) => (
                            <button
                                key={label}
                                onClick={action}
                                onMouseDown={(e) => e.preventDefault()}
                                className={`px-2 py-1 rounded text-sm font-medium transition-colors
                                    ${active
                                        ? "bg-gray-800 text-white"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                )}

                {/* Editor */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                   <EditorContent
                        editor={editor}
                        className="
                            prose prose-sm max-w-none min-h-full focus:outline-none
                            [&_ul]:list-disc
                            [&_ul]:pl-6
                            [&_ol]:list-decimal
                            [&_ol]:pl-6
                        "
                    />
                </div>
            </div>
        </div>
    );
};

export default DocumentEditor;