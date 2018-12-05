import express from 'express';
import trucksRoutes from './api/trucks';
import maintenancesRoutes from './api/maintenances';
import cors from '../middleware/cors';

const app = express();

app.use(express.json());

app.use(cors);

app.use('/api/trucks', trucksRoutes);

app.use('/api/maintenances', maintenancesRoutes);

export default app;