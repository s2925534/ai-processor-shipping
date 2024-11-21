// File Location: ./src/interfaces/email.interface.ts

import { EmailSourceConfig, EmailFilters, EmailProcessingResult } from './sources/emailSource.interface';

export interface EmailRequestPayload {
    emailConfig: EmailSourceConfig;
    filters?: EmailFilters;
    processingMode?: 'emailContent' | 'attachments' | 'both'; // Processing type
    markAsRead?: boolean;                                     // Mark email as read (default: true)
}

export interface EmailResponse {
    status: 'success' | 'error';
    emailsProcessed: number;
    data: EmailProcessingResult[];
}
