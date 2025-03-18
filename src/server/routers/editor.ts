import { z } from 'zod';
import { publicProcedure, router } from '../config';
import { ShapeData } from '@/types/tldraw';

let storedShapes: ShapeData[] = [];

export const editorRouter = router({
    getDocument: publicProcedure.query(() => {
        return { shapes: storedShapes };
    }),
    saveDocument: publicProcedure
        .input(z.object({ shapes: z.array(z.record(z.unknown())) }))
        .mutation(({ input }: { input: { shapes: unknown[] } }) => {
            storedShapes = input.shapes as ShapeData[];
            return { success: true };
        }),
});

export type EditorRouter = typeof editorRouter;
