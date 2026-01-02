export type CanvasItem = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  isEditing: boolean;
};

export type LinkItem = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;            // URL ที่ user ใส่
  previewImage?: string | null;   // og:image (URL รูป)
  title?: string;
  isEditing: boolean;
};

export type NoteItem = CanvasItem;
// export type LinkItem = CanvasItem;