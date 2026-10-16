import { Router } from 'express';

import AppointmentsController from '../controllers/appointments.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate, authenticateOptional } from '../middlewares/auth.middleware.js';
import { idSchema, crearSchema, actualizarSchema } from '../schemas/appointment.schema.js';

const router = Router();
const controller = new AppointmentsController();

router.get('/', authenticate, controller.getAll.bind(controller));
router.get('/:id', authenticate, validate({ params: idSchema }), controller.getById.bind(controller));
// POST es público (reserva sin cuenta); el resto exige sesión.
router.post('/', authenticateOptional, validate({ body: crearSchema }), controller.create.bind(controller));
router.put('/:id', authenticate, validate({ params: idSchema, body: actualizarSchema }), controller.update.bind(controller));
router.delete('/:id', authenticate, validate({ params: idSchema }), controller.remove.bind(controller));

export default router;
