// File Location: ./src/services/fileService.ts

import { S3 } from 'aws-sdk';
import Tesseract from 'tesseract.js';
// import { Configuration, OpenAIApi } from 'openai';

const s3 = new S3();

export const processRemoteFile = async (fileConfig: any, processingConfig: any): Promise<any> => {
    const { sourceType, fileUrl } = fileConfig;

    // Example logic for processing a remote file
    if (sourceType === 'url') {
        // Fetch and process file via URL
        const text = await performOCR(fileUrl);
        return { text };
    }

    throw new Error('Unsupported file source type.');
};

const performOCR = async (filePath: string): Promise<string> => {
    const { data } = await Tesseract.recognize(filePath, 'eng');
    return data.text;
};

export const uploadFileToS3 = async (fileName: string, fileContent: string, s3Config: any, signedUrlConfig: any) => {
    const bucketName = s3Config.bucketName || process.env.AWS_BUCKET_NAME;
    const folderPath = s3Config.folderPath || '';

    const params = {
        Bucket: bucketName,
        Key: `${folderPath}${fileName}`,
        Body: Buffer.from(fileContent, 'base64'),
    };

    await s3.upload(params).promise();

    const signedUrl = s3.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: `${folderPath}${fileName}`,
        Expires: signedUrlConfig?.expiresIn || 1800, // Default 30 minutes
    });

    return {
        s3Url: `https://${bucketName}.s3.amazonaws.com/${folderPath}${fileName}`,
        signedUrl,
    };
};
