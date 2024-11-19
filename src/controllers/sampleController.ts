import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { convertPdfToHtml, aiExtractionOfInformation } from '../utils/utils';
const fetch = require('node-fetch');
import { pipeline } from 'stream';
import { promisify } from 'util';
import dotenv from 'dotenv';

dotenv.config();
const streamPipeline = promisify(pipeline);

// Use the environment variable FILES_DIR to get the correct path
const filesDir = process.env.FILES_DIR ? path.resolve(__dirname, '..', '..', process.env.FILES_DIR) : path.resolve(__dirname, 'src', '_files');

export async function getSample(req: Request, res: Response): Promise<Response> {
    try {
        return res.status(201).json({ message: "Success in GET" });
    } catch (error) {
        console.error("GET Sample Error:", error);
        return res.status(500).json({ message: "Error in GET", error });
    }
}

export async function postSample(req: Request, res: Response): Promise<Response> {
    try {
        return res.status(201).json({ message: "Success in POST" });
    } catch (error) {
        console.error("POST Sample Error:", error);
        return res.status(500).json({ message: "Error in POST", error });
    }
}

export async function parseFile(req: Request, res: Response) {
    const { fileName, url, queries } = req.body;

    if (!fileName && !url) {
        return res.status(400).json({ error: 'Either a file name or a URL must be provided.' });
    }

    if (queries && !Array.isArray(queries)) {
        return res.status(400).json({ error: 'Queries must be an array.' });
    }

    const fileDir = path.resolve(filesDir);
    let text = '';
    let localFilePath = '';

    try {
        if (!fs.existsSync(fileDir)) {
            fs.mkdirSync(fileDir, { recursive: true });
        }

        if (fileName && isUrl(fileName)) {
            const remoteFileName = path.basename(new URL(fileName).pathname);
            localFilePath = path.join(fileDir, remoteFileName);
            await downloadFile(fileName, localFilePath);
        } else if (fileName) {
            localFilePath = path.join(fileDir, fileName);
            if (!fs.existsSync(localFilePath)) {
                return res.status(404).json({ error: `File ${fileName} not found.` });
            }
        }

        if (localFilePath.endsWith('.pdf')) {
            const outputHtmlPath = path.join(fileDir, path.basename(localFilePath, '.pdf') + '.html');
            text = await convertPdfToHtml(localFilePath, outputHtmlPath);
        } else if (localFilePath.endsWith('.tex')) {
            text = fs.readFileSync(localFilePath, 'utf8');
        }

        if (url) {
            text += await fetchContentFromUrl(url);
        }

        // Load the interface and interQuestions content based on the environment variable path
        const interfaceContent = fs.readFileSync(path.resolve('src', 'interfaces', 'prompt.interface.ts'), 'utf8');
        const interQuestionsContent = fs.readFileSync(path.resolve(fileDir, 'interQuestions.txt'), 'utf8');

        let queryConcatenated = queries.join('\n');
        let instructions = '';
        if(text !== null && text !== ''){
            instructions += `Given this ${text}`;
        }
        if(queryConcatenated !== null && queryConcatenated !== ''){
            instructions += `\n${queryConcatenated}`;
        }
        if(interfaceContent !== null && interfaceContent !== ''){
            instructions += `according to the \`DocumentData\` interface specification below. ${interfaceContent}`;
        }

        if(interQuestionsContent !== null && interQuestionsContent !== ''){
            instructions += `\n Consider these questions ${interQuestionsContent}`;
        }

        const result = await aiExtractionOfInformation(instructions, text);
        const resultFilePath = path.join(fileDir, `${path.basename(localFilePath || 'urlContent')}.json`);

        let cleanJson;
        try {
            cleanJson = typeof result === 'string'
                ? JSON.parse(result.replace(/```json|```/g, '').trim())
                : result;
        } catch (parseError) {
            console.error("JSON Parsing Error:", parseError);
            throw new Error("Failed to parse the extracted JSON.");
        }

        fs.writeFileSync(resultFilePath, JSON.stringify(cleanJson, null, 2));
        res.json(cleanJson);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: (error as Error).message });
    }
}

async function fetchContentFromUrl(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch content from URL: ${url}`);
    }
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text')) {
        throw new Error(`Unsupported content type: ${contentType}`);
    }
    return await response.text();
}

async function downloadFile(fileUrl: string, destPath: string): Promise<void> {
    const response = await fetch(fileUrl);
    if (!response.ok) {
        throw new Error(`Failed to download file from URL: ${fileUrl}`);
    }

    if (!response.body) {
        throw new Error(`No readable stream in response body from ${fileUrl}`);
    }

    await streamPipeline(response.body as NodeJS.ReadableStream, fs.createWriteStream(destPath));
}

function isUrl(str: string): boolean {
    try {
        new URL(str);
        return true;
    } catch {
        return false;
    }
}
