// File Location: ./src/controllers/fileController.ts

import { Request, Response } from 'express';
import { processRemoteFile, uploadFileToS3 } from '../services/fileService';

export const processFile = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fileConfig, processingConfig } = req.body;

        // Process the file (OCR or other text extraction)
        const result = await processRemoteFile(fileConfig, processingConfig);

        res.json({
            status: 'success',
            data: result,
        });
    } catch (error: any) {
        console.error('Error processing file:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const uploadFile = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fileName, fileContent, s3Config, signedUrlConfig } = req.body;

        // Upload the file to S3 and generate a signed URL
        const result = await uploadFileToS3(fileName, fileContent, s3Config, signedUrlConfig);

        res.json({
            status: 'success',
            data: result,
        });
    } catch (error: any) {
        console.error('Error uploading file:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};
