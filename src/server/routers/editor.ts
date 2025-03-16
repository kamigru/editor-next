import { z } from 'zod';
import { router, publicProcedure } from '../config';

let shapesStore: any[] = [];

export const editorRouter = router({
    getDocument: publicProcedure.query(() => {
        return {
            shapes: shapesStore,
        };
}),

saveDocument: publicProcedure.input(z.object({
    shapes: z.array(z.any()),
})
).mutation(({input}) => {
    shapesStore = input.shapes;
    return {
        success: true,
    };
}),
});
