// File Location: ./src/controllers/emailController.ts

import { Request, Response } from 'express';
import { fetchEmails, processEmailContent, processEmailAttachments } from '../services/emailService';

export const processEmails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { emailConfig, filters, processingMode, markAsRead } = req.body;

        // Fetch emails based on the provided configurations and filters
        const emails = await fetchEmails(emailConfig, filters);

        // Process emails based on the mode
        const results = await Promise.all(
            emails.map(async (email) => {
                const emailContent = processingMode !== 'attachments' ? await processEmailContent(email) : null;
                const emailAttachments =
                    processingMode !== 'emailContent' ? await processEmailAttachments(email, markAsRead) : null;

                return {
                    emailId: email.id,
                    subject: email.subject,
                    emailContent,
                    attachments: emailAttachments,
                };
            })
        );

        res.json({
            status: 'success',
            emailsProcessed: results.length,
            data: results,
        });
    } catch (error: any) {
        console.error('Error processing emails:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};
