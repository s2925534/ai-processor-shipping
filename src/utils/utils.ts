// src/utils/utils.ts
import fs from "fs";
import dotenv from 'dotenv';

const AIClient = require('velosify-ai');
const PDFParser = require('pdf-parse');
const pdf2html = require('pdf2html');
const cheerio = require('cheerio'); // We'll use cheerio to parse HTML
dotenv.config();

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const client = new AIClient(process.env.OPENAI_API_KEY);

export async function convertPdfToHtml(pdfPath: string, outputHtmlPath: string) {
    try {
        console.log(pdfPath, outputHtmlPath)
        // Convert PDF to HTML
        const htmlContent = await pdf2html.html(pdfPath);

        // Write the HTML content to a file
        fs.writeFileSync(`${outputHtmlPath}`, `${htmlContent}`);

        console.log('PDF has been converted to HTML and saved to:', outputHtmlPath);
        return htmlContent;
    } catch (error) {
        console.error('Error converting PDF to HTML:', error);
    }
}

export async function aiExtractionOfInformation(instructions: string, text:string, model = "gpt-3.5-turbo") {
    try {
        return await client.sendMessage(`${instructions}\n\n${text}`);
    } catch (error) {
        console.error("Error extracting information:", error);
    }
}

export async function extractContainerNumbers(text: string) {
    const regex = /\b[a-zA-Z]{3}[uUzZjJ][0-9]{6}[0-9]\b/g;
    const matches = text.match(regex) || []; // Find all matches or return an empty array
     // Deduplicate and normalize to uppercase
    return [...new Set(matches.map(match => match.toUpperCase()))];
}
