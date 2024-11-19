// src/routes/sampleRoutes.ts
import express, { Request, Response } from 'express';
import {getSample, parseFile, postSample} from '../controllers/sampleController';

const router = express.Router();

router.get('/get-sample', getSample);
router.post('/post-sample', postSample);

// Test route to check if routing works
router.get('/test', (req: Request, res: Response) => {
    res.json({ message: 'Test route works!' });
});

router.post('/parse', parseFile);
export default router;
