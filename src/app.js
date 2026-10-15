import express from 'express';

import appointmentsRoutes from './routes/appointments.routes.js';
import usersRoutes from './routes/users.routes.js';
import servicesRoutes from './routes/services.routes.js';

const app = express();

app.use(express.json());

app.use('/api/v1/appointments', appointmentsRoutes);
app.use('/api/v1/services', servicesRoutes);
app.use('/api/v1/users', usersRoutes);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
