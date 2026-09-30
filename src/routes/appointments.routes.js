import { Router } from 'express';

import AppointmentsController from '../controllers/appointments.controller.js';

const router = Router();
const controller = new AppointmentsController();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.remove.bind(controller));

export default router;
