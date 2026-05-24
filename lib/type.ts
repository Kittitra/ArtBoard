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

export type NoteItem = CanvasItem;
// export type LinkItem = CanvasItem;

export interface Version {
    id: string
    name: string
    content: any
    createdAt: string
}
