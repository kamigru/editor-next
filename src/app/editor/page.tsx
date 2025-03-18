"use client";

import { Tldraw, useEditor, useValue, TLComponents, TLShapeId } from "@tldraw/tldraw";
import "tldraw/tldraw.css";
import { api } from "@/lib/trpc";
import { useCallback, useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { EditorInstance, ShapeData } from "@/types/tldraw";

function FrameHelper() {
  const editor = useEditor() as EditorInstance;
  const selectedShapeIds = useValue("selectedShapeIds", () => editor.getSelectedShapeIds(), [editor]);
  const [showTip, setShowTip] = useState(false);

  const hasFrameSelected = selectedShapeIds.some((id: TLShapeId) => {
    const shape = editor.getShape(id);
    return shape?.type === "frame";
  });

  const frameName = useMemo(() => {
    if (!hasFrameSelected || selectedShapeIds.length !== 1) return "";
    const frameId = selectedShapeIds[0];
    const frame = editor.getShape(frameId);
    return (frame?.props as Record<string, unknown>)?.name?.toString() || "Sin nombre";
  }, [editor, selectedShapeIds, hasFrameSelected]);

  const selectFrameContent = useCallback(() => {
    if (!hasFrameSelected || selectedShapeIds.length !== 1) return;
    const frameId = selectedShapeIds[0];
    const childrenIds = editor.getSortedChildIdsForParent(frameId);
    if (childrenIds.length === 0) {
      setShowTip(true);
      setTimeout(() => setShowTip(false), 3000);
      return;
    }
    editor.select(...childrenIds);
    setShowTip(true);
    setTimeout(() => setShowTip(false), 5000);
  }, [editor, selectedShapeIds, hasFrameSelected]);

  if (!hasFrameSelected) return null;

  return (
    <div className="absolute top-16 right-2 z-50 bg-white shadow-lg rounded-lg p-4">
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium">
          Frame <span className="font-bold">{frameName}</span> seleccionado
        </h3>
        {showTip && (
          <div className="text-xs text-blue-600 mb-1 max-w-[250px]">
            {editor.getSelectedShapeIds().length > 1
              ? "Usa la paleta de estilos de Tldraw para cambiar propiedades."
              : "Este frame no tiene contenido para seleccionar."}
          </div>
        )}
        <Button onClick={selectFrameContent} variant="default" className="w-full bg-black text-white hover:bg-gray-800">
          Seleccionar contenido
        </Button>
      </div>
    </div>
  );
}

export default function Editor() {
  const { data, isLoading, isError, error } = api.editor.getDocument.useQuery();
  const saveMutation = api.editor.saveDocument.useMutation();
  const [editor, setEditor] = useState<EditorInstance | null>(null);

  const handleSave = useCallback(
    async (newShapes: ShapeData[]) => {
      try {
        await saveMutation.mutateAsync({ shapes: newShapes });
      } catch (err) {
        console.error("Error al guardar las formas:", err);
      }
    },
    [saveMutation]
  );

  const handleMount = useCallback((editorInstance: EditorInstance) => {
    setEditor(editorInstance);
    if (data?.shapes && data.shapes.length > 0) {
      data.shapes.forEach((shape: ShapeData) => {
        editorInstance.createShape(shape);
      });
    }
  }, [data]);

  const modifyShape = useCallback(() => {
    if (!editor) return;
    const shapes = editor.getCurrentPageShapes();
    if (shapes.length > 0) {
      const firstShape = shapes[0];
      editor.updateShape({
        ...firstShape,
        props: { ...firstShape.props, color: "red" },
      });
    }
  }, [editor]);

  useEffect(() => {
    if (!editor) return;
    const handleChangeEvent = () => {
      const allShapes = editor.getCurrentPageShapes() as ShapeData[];
      if (allShapes.length > 0) {
        handleSave(allShapes);
      }
    };
    const unsubscribe = editor.store.listen(handleChangeEvent, { source: "user", scope: "document" });
    return () => unsubscribe();
  }, [editor, handleSave]);

  if (isLoading) {
    return (
      <main className="flex items-center justify-center w-full h-screen">
        <Image src="/icon/BrushGIF.gif" alt="Cargando..." width={32} height={32} className="w-32 h-32" unoptimized />
      </main>
    );
  }

  if (isError) {
    return <div>Error al cargar el documento: {error.message}</div>;
  }

  const components: Partial<TLComponents> = {
    InFrontOfTheCanvas: FrameHelper,
  };

  return (
    <main className="h-full overflow-hidden">
      <div className="h-full flex flex-col">
        <div className="flex-1 relative">
          <Tldraw onMount={handleMount} autoFocus components={components} />
        </div>
      </div>
    </main>
  );
}