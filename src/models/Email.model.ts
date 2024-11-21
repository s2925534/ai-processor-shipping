// File Location: ./src/models/Email.model.ts

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface EmailAttributes {
    id: string;
    subject: string;
    body: string;
    sender: string;
    readStatus: boolean;
    processedAt?: Date; // Optional: When the email was processed
}

interface EmailCreationAttributes extends Optional<EmailAttributes, 'id'> {}

class Email extends Model<EmailAttributes, EmailCreationAttributes> implements EmailAttributes {
    public id!: string;
    public subject!: string;
    public body!: string;
    public sender!: string;
    public readStatus!: boolean;
    public processedAt?: Date;
}

Email.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        sender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        readStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        processedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Email',
        tableName: 'emails',
    }
);

export default Email;
