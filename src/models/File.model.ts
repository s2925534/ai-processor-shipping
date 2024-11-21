// File Location: ./src/models/File.model.ts

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
interface FileAttributes {
    id: string;
    fileName: string;
    fileType: string;
    s3Url: string;
    textContent?: string; // Extracted text content (optional)
    metadata?: string;    // Metadata in JSON format (optional)
    processedAt?: Date;   // Optional: When the file was processed
}

interface FileCreationAttributes extends Optional<FileAttributes, 'id'> {}

class File extends Model<FileAttributes, FileCreationAttributes> implements FileAttributes {
    public id!: string;
    public fileName!: string;
    public fileType!: string;
    public s3Url!: string;
    public textContent?: string;
    public metadata?: string;
    public processedAt?: Date;
}

File.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        fileName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fileType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        s3Url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        textContent: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        metadata: {
            type: DataTypes.TEXT,
            allowNull: true, // Stored as a JSON string
        },
        processedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'File',
        tableName: 'files',
    }
);

export default File;
