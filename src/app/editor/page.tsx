"use client";

import {
  Tldraw,
  Editor as TldrawEditor,
  TLEventMapHandler,
  TLShape,
  useEditor,
  DefaultColorStyle,
  useValue,
  TLComponents,
  TLShapeId,
} from "@tldraw/tldraw";
import "tldraw/tldraw.css";
import { api } from "@/lib/trpc";
import { useCallback, useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";

// Lista de colores válidos en Tldraw
const VALID_COLORS = [
  "black", "grey", "light-violet", "violet", "blue", "light-blue",
  "yellow", "orange", "green", "light-green", "light-red", "red", "white"
];

// Componente para mostrar instrucciones de uso
function FrameHelper() {
  const editor = useEditor();
  const selectedShapeIds = useValue('selectedShapeIds', () => editor.getSelectedShapeIds(), [editor]);
  const [showTip, setShowTip] = useState(false);
  
  // Verificar si hay un frame seleccionado
  const hasFrameSelected = selectedShapeIds.some(id => {
    const shape = editor.getShape(id);
    return shape?.type === 'frame';
  });
  const frameName = useMemo(() => {
    if (!hasFrameSelected || selectedShapeIds.length !== 1) return '';
    
    const frameId = selectedShapeIds[0];
    const frame = editor.getShape(frameId);
    return (frame?.props as any)?.name || 'Sin nombre';
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
              ? "Ahora usa la paleta de estilos nativa de Tldraw para cambiar el color y propiedades de los elementos seleccionados." 
              : "Este frame no tiene contenido para seleccionar."}
          </div>
        )}
        
        <Button
          onClick={selectFrameContent}
          variant="default"
          className="w-full bg-black text-white hover:bg-gray-800"
        >
          Seleccionar contenido
        </Button>
      </div>
    </div>
  );
}

export default function Editor() {
  const { data, isLoading, isError, error } = api.editor.getDocument.useQuery();
  const saveMutation = api.editor.saveDocument.useMutation();
  const [editor, setEditor] = useState<TldrawEditor | null>(null);

  const handleSave = async (newShapes: TLShape[]) => {
    try {
      await saveMutation.mutateAsync({ shapes: newShapes });
    } catch (err) {
      console.error("Error al guardar las formas:", err);
    }
  };

  const handleMount = useCallback(
    (editorInstance: TldrawEditor) => {
      setEditor(editorInstance);
      if (data?.shapes && data.shapes.length > 0) {
        console.log("Datos iniciales:", data.shapes);
        
        data.shapes.forEach((shape) => {
          if (shape.props?.color !== undefined && 
              (typeof shape.props.color !== 'string' || !VALID_COLORS.includes(shape.props.color))) {
            console.warn(`Color inválido encontrado en shape ${shape.id}: ${shape.props.color}. Corrigiendo a "black".`);
            shape.props.color = "black";
          }
          
          try {
            editorInstance.createShape(shape);
          } catch (err) {
            console.error(`Error al crear la forma ${shape.id}:`, err);
          }
        });
      }
    },
    [data]
  );

  useEffect(() => {
    if (!editor) return;

    const handleChangeEvent: TLEventMapHandler<"change"> = () => {
      const allShapes = editor.getCurrentPageShapes();
      if (allShapes.length > 0) {
        handleSave(allShapes);
      }
    };

    const unsubscribe = editor.store.listen(handleChangeEvent, {
      source: "user",
      scope: "document",
    });
    return () => {
      unsubscribe();
    };
  }, [editor]);

  if (isLoading) {
    return (
      <main className="flex items-center justify-center w-full h-screen">
        <img
          src="/icon/BrushGIF.gif"
          alt="Cargando..."
          className="w-32 h-32"
        />
      </main>
    );
  }

  if (isError) {
    return <div>Error al cargar el documento: {error.message}</div>;
  }
  const components: Partial<TLComponents> = {
    InFrontOfTheCanvas: () => <FrameHelper />,
  };

  return (
    <main className="h-full overflow-hidden">
      <div className="h-full flex flex-col">
        <div className="flex-1 relative">
          <Tldraw
            onMount={handleMount}
            autoFocus
            components={components}
          />
        </div>
      </div>
    </main>
  );
}
