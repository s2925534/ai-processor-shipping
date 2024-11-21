// File Location: ./src/interfaces/sources/fileSource.interface.ts

export interface FileSourceConfig {
    sourceType: 'url' | 's3' | 'onedrive' | 'googledrive' | 'html'; // Source type
    fileUrl?: string;                         // File URL (for public links)
    s3Config?: {                              // S3-specific configurations
        bucketName: string;
        filePath: string;
    };
    credentials?: {                           // Optional: Credentials for secure links
        accessToken: string;                  // OAuth or API token
        additionalHeaders?: Record<string, string>; // Additional headers for authorization
    };
}

export interface FileProcessingConfig {
    performOCR?: boolean;                     // Perform OCR on non-text files
    useOpenAI?: boolean;                      // Enable OpenAI processing
    openAIConfig?: {
        task: 'summarization' | 'categorization' | 'question_answering'; // OpenAI task
    };
}

export interface FileProcessingResult {
    fileName: string;
    fileType: string;
    processedData: {
        textContent?: string;                 // Extracted text
        metadata?: any;                       // Optional metadata (e.g., OCR confidence)
    };
}
