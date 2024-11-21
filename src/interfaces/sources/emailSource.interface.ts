// File Location: ./src/interfaces/sources/emailSource.interface.ts

export interface EmailSourceConfig {
    emailProvider: string; // e.g., 'gmail', 'outlook', 'imap'
    host?: string;         // Optional: IMAP server host
    port?: number;         // Optional: IMAP server port
    secure?: boolean;      // Optional: Use SSL/TLS
    username: string;      // Email address
    password: string;      // App-specific password or OAuth token
    folder?: string;       // Email folder to scan (default: INBOX)
}

export interface EmailFilters {
    readStatus?: 'unread' | 'read' | 'all'; // Filter by read status (default: unread)
    dateRange?: string;                     // Predefined range (e.g., 'last_7_days')
    customDateRange?: {                     // Custom date range
        from: string;                       // Start date (ISO string)
        to: string;                         // End date (ISO string)
    };
    from?: string;                          // Filter by sender email
    subject?: string;                       // Filter by subject keywords
}

export interface EmailProcessingResult {
    emailId: string;
    subject: string;
    emailContent?: string;                  // Extracted email content (if processed)
    attachments?: ProcessedAttachment[];   // Processed attachments (if applicable)
}

export interface ProcessedAttachment {
    fileName: string;
    fileType: string;
    s3Url?: string;                         // URL of the uploaded file in S3
    processedData?: {
        textContent?: string;               // Extracted text (e.g., OCR result)
        metadata?: any;                     // Optional metadata (e.g., OCR confidence)
    };
}
