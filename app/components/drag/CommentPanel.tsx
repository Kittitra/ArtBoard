// components/drag/CommentPanel.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { CommentItem, CommentReply } from "@/lib/type";

interface Props {
    comment: CommentItem
    currentUser: { name: string; avatar?: string }
    onUpdate: (id: string, updates: Partial<CommentItem>) => void
    onClose: () => void
    onDelete: (id: string) => void
}

const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
};

const Avatar = ({ name, avatar, size = 28 }: { name: string; avatar?: string; size?: number }) => (
    <div
        className="rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
        style={{
            width: size, height: size, fontSize: size * 0.4,
            backgroundColor: avatar ? "transparent" : "#4A90D9",
            backgroundImage: avatar ? `url(${avatar})` : "none",
            backgroundSize: "cover",
        }}
    >
        {!avatar && name[0].toUpperCase()}
    </div>
);

const CommentPanel = ({ comment, currentUser, onUpdate, onClose, onDelete }: Props) => {
    const [replyText, setReplyText] = useState("");
    const [editingText, setEditingText] = useState(comment.text);
    const [isEditing, setIsEditing] = useState(!comment.text);
    const overlayRef = useRef<HTMLDivElement>(null);
    const replyRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEditing) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose, isEditing]);

    const handleSaveMain = () => {
        if (!editingText.trim()) return;
        onUpdate(comment.id, { text: editingText });
        setIsEditing(false);
    };

    const handleAddReply = () => {
        if (!replyText.trim()) return;
        const newReply: CommentReply = {
            id: crypto.randomUUID(),
            author: currentUser.name,
            avatar: currentUser.avatar,
            text: replyText,
            createdAt: new Date().toISOString(),
        };
        onUpdate(comment.id, { replies: [...comment.replies, newReply] });
        setReplyText("");
    };

    const handleDeleteReply = (replyId: string) => {
        onUpdate(comment.id, {
            replies: comment.replies.filter((r) => r.id !== replyId),
        });
    };

    const handleResolve = () => {
        onUpdate(comment.id, { resolved: !comment.resolved });
    };

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[999] flex items-start justify-center pt-20"
            style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
            onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                style={{ width: 380, maxHeight: "70vh" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <span className="text-sm font-semibold text-gray-600">Comment</span>
                    <div className="flex gap-2 items-center">
                        <button
                            onClick={handleResolve}
                            className={`text-xs px-2 py-1 rounded-lg border transition-colors
                                ${comment.resolved
                                    ? "bg-green-50 text-green-600 border-green-200"
                                    : "text-gray-500 border-gray-200 hover:bg-gray-50"
                                }`}
                        >
                            {comment.resolved ? "✓ Resolved" : "Resolve"}
                        </button>
                        <button
                            onClick={() => onDelete(comment.id)}
                            className="text-xs text-red-400 hover:text-red-600 px-1"
                        >
                            🗑
                        </button>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
                    </div>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto">
                    {/* Main comment */}
                    <div className="px-4 py-3 border-b border-gray-50">
                        <div className="flex gap-3">
                            <Avatar name={comment.author} avatar={comment.avatar} />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-800">
                                        {comment.author}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {formatTime(comment.createdAt)}
                                    </span>
                                </div>

                                {isEditing ? (
                                    <div className="flex flex-col gap-2">
                                        <textarea
                                            autoFocus
                                            value={editingText}
                                            onChange={(e) => setEditingText(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSaveMain();
                                                }
                                            }}
                                            placeholder="Add a comment..."
                                            className="w-full text-sm text-gray-700 resize-none outline-none border border-gray-200 rounded-lg p-2 focus:border-blue-300"
                                            rows={3}
                                        />
                                        <div className="flex gap-2 justify-end">
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="text-xs text-gray-400 hover:text-gray-600"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSaveMain}
                                                disabled={!editingText.trim()}
                                                className="text-xs bg-gray-800 text-white px-3 py-1 rounded-lg disabled:opacity-40"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p
                                        className="text-sm text-gray-700 cursor-pointer hover:bg-gray-50 rounded p-1 -m-1"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        {comment.text}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Replies */}
                    {comment.replies.map((reply) => (
                        <div key={reply.id} className="px-4 py-3 border-b border-gray-50 group">
                            <div className="flex gap-3">
                                <Avatar name={reply.author} avatar={reply.avatar} size={24} />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-medium text-gray-800">
                                            {reply.author}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-400">
                                                {formatTime(reply.createdAt)}
                                            </span>
                                            <button
                                                onClick={() => handleDeleteReply(reply.id)}
                                                className="text-xs text-gray-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-700">{reply.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Reply input */}
                <div className="px-4 py-3 border-t border-gray-100 flex gap-3 items-end">
                    <Avatar name={currentUser.name} avatar={currentUser.avatar} size={28} />
                    <div className="flex-1 flex flex-col gap-2">
                        <textarea
                            ref={replyRef}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleAddReply();
                                }
                            }}
                            placeholder="Reply..."
                            rows={1}
                            className="w-full text-sm text-gray-700 resize-none outline-none border border-gray-200 rounded-lg px-3 py-2 focus:border-blue-300"
                        />
                        <button
                            onClick={handleAddReply}
                            disabled={!replyText.trim()}
                            className="self-end text-xs bg-gray-800 text-white px-3 py-1 rounded-lg disabled:opacity-40 hover:bg-gray-700"
                        >
                            Reply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentPanel;