// File Location: ./src/routes/fileRoutes.ts

import { Router } from 'express';
import { processFile, uploadFile } from '../controllers/fileController';

const fileRoutes = Router();

// Route to process remote files
fileRoutes.post('/files/process', processFile);

// Route to upload a file to S3 and generate a signed URL
fileRoutes.post('/files/upload', uploadFile);

export default fileRoutes;
