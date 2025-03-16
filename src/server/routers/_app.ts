import { router } from '../config';
import { editorRouter } from './editor';

export const appRouter = router({
    editor: editorRouter,
});

export type AppRouter = typeof appRouter;
