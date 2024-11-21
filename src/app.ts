// File Location: ./src/app.ts

import express from 'express';
import sequelize from './config/database';
import apiRoutes from './routes/sampleRoutes';  // Existing routes
import emailRoutes from './routes/emailRoutes'; // New email routes
import fileRoutes from './routes/fileRoutes';   // New file routes

const app = express();
app.use(express.json());  // Middleware to parse JSON

// Register the routes
app.use('/api', apiRoutes);
app.use('/api', emailRoutes);
app.use('/api', fileRoutes);

const PORT = process.env.PORT || 3000;

sequelize.authenticate().then(() => {
    console.log('Database connected...');
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
}).catch((err: any) => {
    console.error('Unable to connect to the database:', err);
});
