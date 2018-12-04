import express from 'express';
import trucksRoutes from './api/trucks';

const app = express();

app.use(express.json());

app.use('/api/trucks', trucksRoutes);

export default app;