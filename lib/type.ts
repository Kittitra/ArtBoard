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
}

export type NoteItem = CanvasItem;
// export type LinkItem = CanvasItem;

export interface Version {
    id: string
    name: string
    content: any
    createdAt: string
}
