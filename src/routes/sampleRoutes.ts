// src/routes/sampleRoutes.ts
import express, { Request, Response } from 'express';
import {getSample, parseFile, postSample} from '../controllers/sampleController';
import {parseFileContainers} from "../controllers/shippingController";

const router = express.Router();

router.get('/get-sample', getSample);
router.post('/post-sample', postSample);

// Test route to check if routing works
router.get('/test', (req: Request, res: Response) => {
    res.json({ message: 'Test route works!' });
});

router.post('/parse', parseFile);
router.post('/parse-containers', parseFileContainers);
export default router;
