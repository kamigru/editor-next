'use client';

import { Tldraw, Editor as TldrawEditor, TLEventMapHandler, TLShape } from '@tldraw/tldraw';
import 'tldraw/tldraw.css';
import { api } from '@/lib/trpc';
import { useCallback, useEffect, useState } from 'react';

export default function Editor() {
    const { data, isLoading } = api.editor.getDocument.useQuery();
    const saveMutation = api.editor.saveDocument.useMutation();

    const [shapes, setShapes] = useState<any[]>([]);
    const [editor, setEditor] = useState<TldrawEditor | null>(null);

    const handleSave = async (newShapes: any[]) => {
        console.log('Guardando formas:', newShapes);
        try {
            await saveMutation.mutateAsync({ shapes: newShapes });
            console.log('Formas guardadas correctamente');
        } catch (error) {
            console.error('Error al guardar las formas:', error);
        }
    };

    const handleMount = useCallback((editorInstance: TldrawEditor) => {
        setEditor(editorInstance);
        
        if (data?.shapes && data.shapes.length > 0) {
            console.log('Cargando formas guardadas:', data.shapes);
            data.shapes.forEach((shape) => {
                editorInstance.createShape(shape);
            });
        }
    }, [data]);

    useEffect(() => {
        if (!editor) return;

        const handleChangeEvent: TLEventMapHandler<'change'> = (change) => {
            const allShapes: TLShape[] = [];
            
            editor.store.allRecords().forEach((record) => {
                if (record.typeName === 'shape') {
                    allShapes.push(record as TLShape);
                }
            });

            if (allShapes.length > 0) {
                console.log('Cambios detectados, guardando...');
                handleSave(allShapes);
            }
        };

        const unsubscribe = editor.store.listen(handleChangeEvent, { 
            source: 'user', 
            scope: 'document' 
        });
        return () => {
            unsubscribe();
        };
    }, [editor]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <img src="/icon/BrushGIF.gif" alt="Cargando..." className="w-32 h-32" />
            </div>
        );
    }
    
    return (
        <main className="p-4 h-screen flex flex-col">
            <h1 className="text-2xl font-bold mb-4">Editor con Tldraw</h1>
            <div className='flex-1'>
                <Tldraw onMount={handleMount} />
            </div>
        </main>
    );
}
