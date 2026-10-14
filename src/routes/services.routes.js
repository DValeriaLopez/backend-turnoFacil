import { Router } from 'express';

import ServicesController from '../controllers/services.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate, requireRole } from '../middlewares/auth.middleware.js';
import { idSchema, listarSchema, crearSchema, actualizarSchema } from '../schemas/services.schema.js';

const router = Router();
const controller = new ServicesController();
const soloAdmin = [authenticate, requireRole('admin')];

router.get('/', validate({ query: listarSchema }), controller.getAll.bind(controller));
router.get('/:id', validate({ params: idSchema }), controller.getById.bind(controller));
router.post('/', soloAdmin, validate({ body: crearSchema }), controller.create.bind(controller));
router.patch('/:id', soloAdmin, validate({ params: idSchema, body: actualizarSchema }), controller.update.bind(controller));
router.delete('/:id', soloAdmin, validate({ params: idSchema }), controller.remove.bind(controller));

export default router;
