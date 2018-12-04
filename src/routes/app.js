import express from 'express';
import trucksRoutes from './api/trucks';
import cors from '../middleware/cors';

const app = express();

app.use(express.json());

app.use(cors);

app.use('/api/trucks', trucksRoutes);

export default app;