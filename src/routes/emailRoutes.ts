// File Location: ./src/routes/emailRoutes.ts

import { Router } from 'express';
import { processEmails } from '../controllers/emailController';

const emailRoutes = Router();

// Route to process emails
emailRoutes.post('/emails/process', processEmails);

export default emailRoutes;
