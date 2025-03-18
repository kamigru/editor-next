import { Editor, TLShapeId } from "@tldraw/tldraw";

export type EditorInstance = Pick<
  Editor,
  | 'createShape'
  | 'getCurrentPageShapes'
  | 'store'
  | 'getShape'
  | 'getSortedChildIdsForParent'
  | 'select'
  | 'updateShape'
  | 'getSelectedShapeIds'
>;

export type ShapeData = {
  id: TLShapeId;
  type: string;
  x: number;
  y: number;
  rotation?: number;
  props?: Record<string, unknown>;
  parentId?: TLShapeId;
};