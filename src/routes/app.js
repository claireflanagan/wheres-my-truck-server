import express from 'express';
import trucksRoutes from './api/trucks';
import maintenancesRoutes from './api/maintenances';
import tripsRoutes from './api/trips';
import issuesRoutes from './api/issues';
import cors from '../middleware/cors';
import ensureAuth from '../middleware/ensureAuth';
import { handler } from '../middleware/handler';

const app = express();

app.use(express.json());

app.use(cors);

app.use(ensureAuth());
app.use('/api/trucks', trucksRoutes);
app.use('/api/maintenances', maintenancesRoutes);
app.use('/api/trips', tripsRoutes);
app.use('/api/issues', issuesRoutes);
app.use(handler);

export default app;
