export type CanvasItem = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  isEditing: boolean;
};

export type NoteItem = CanvasItem;
export type LinkItem = CanvasItem;