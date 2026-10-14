import express from 'express';
import authRoutes from './routes/auth.routes.js';
import appointmentsRoutes from './routes/appointments.routes.js';
import usersRoutes from './routes/users.routes.js';
import servicesRoutes from './routes/services.routes.js';
import { notFound, errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());

app.use('/api/v1/appointments', appointmentsRoutes);
app.use('/servicios', servicesRoutes);
app.use('/api/v1/users', usersRoutes);

app.use('/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);


if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT ?? 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

export default app;


