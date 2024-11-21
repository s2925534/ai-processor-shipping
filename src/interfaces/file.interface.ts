// File Location: ./src/interfaces/file.interface.ts

import { FileSourceConfig, FileProcessingConfig, FileProcessingResult } from './sources/fileSource.interface';

export interface FileRequestPayload {
    fileConfig: FileSourceConfig;
    processingConfig: FileProcessingConfig;
}

export interface FileResponse {
    status: 'success' | 'error';
    data: FileProcessingResult;
}
