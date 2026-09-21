import { isDeepStrictEqual } from "util";

export type CanvasItem = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  isEditing: boolean;
  version?: any
  parentBoardId?: string;
};

export type LinkItem = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;            // URL ที่ user ใส่
  previewImage?: string | null;   // og:image (URL รูป)
  imageRatio?: number;
  title?: string;
  isEditing: boolean;
  parentBoardId?: string;
};

export interface BoardItem {
    id: string
    x: number
    y: number
    width: number
    height: number
    text: string
    title: string        // ← เพิ่ม
    isEditingTitle: boolean  // ← เพิ่ม
    isEditing: boolean
    parentBoardId?: string
}

export interface LineItem {
    id: string
    fromId: string      // id ของ element ต้นทาง
    toId: string        // id ของ element ปลายทาง
    points: number[]    // [x1, y1, x2, y2]
    parentBoardId?: string
}

export interface ArrowItem {
    id: string
    fromId: string | null   // null = ยังไม่ได้เชื่อม
    toId: string | null
    fromX: number
    fromY: number
    toX: number
    toY: number
    unconnected?: boolean
    parentBoardId?: string
}

export interface HeaderTextItem {
    id: string
    x: number
    y: number
    width: number
    height: number
    text: string
    isEditing: boolean
    parentBoardId?: string
}

export interface ColorCardItem {
    id: string
    x: number
    y: number
    width: number
    height: number
    color: string        // hex
    caption: string
    isEditingCaption: boolean
    parentBoardId?: string
}

export interface DocumentItem {
    id: string
    x: number
    y: number
    width: number
    height: number
    title: string
    content: string  // JSON string จาก tiptap
    parentBoardId?: string
    isDeepStrictEqual?: boolean
}

export interface SketchItem {
    id: string
    x: number
    y: number
    width: number
    height: number
    thumbnail: string | null  // base64 preview
    parentBoardId?: string
}

export interface VideoItem {
    id: string
    x: number
    y: number
    width: number
    height: number
    uploadId: string | null
    playbackId: string | null
    thumbnailUrl: string | null
    status: "uploading" | "processing" | "ready" | "error" | "idle"
    parentBoardId?: string
}

export interface CommentReply {
    id: string
    author: string
    avatar?: string
    text: string
    createdAt: string
}

export interface CommentItem {
    id: string
    x: number
    y: number
    width: number
    height: number
    author: string
    avatar?: string
    text: string
    replies: CommentReply[]
    resolved: boolean
    createdAt: string
    parentBoardId?: string
}

export interface AudioItem {
    id: string
    x: number
    y: number
    width: number
    height: number
    url: string
    title: string
    status: "idle" | "ready" | "error"
    parentBoardId?: string
}

export interface GroupItem {
    id: string
    x: number
    y: number
    width: number
    height: number
    title: string
    isEditingTitle: boolean
    color: string
    parentBoardId?: string
}

export interface DrawStroke {
    id: string
    points: number[]  // [x1, y1, x2, y2, ...]
    color: string
    size: number
    tool: "pen" | "eraser"
}

export interface DrawItem {
    id: string
    x: number
    y: number
    width: number
    height: number
    strokes: DrawStroke[]
    parentBoardId?: string
}

export interface ImageItem {
    id: string
    x: number
    y: number
    width: number
    height: number
    url: string | null
    publicId: string | null
    status: "idle" | "uploading" | "ready" | "error"
    parentBoardId?: string
}

export type NoteItem = CanvasItem;
// export type LinkItem = CanvasItem;

export interface Version {
    id: string
    name: string
    content: any
    createdAt: string
}
