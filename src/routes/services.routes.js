import { Router } from 'express';

import ServicesController from '../controllers/services.controller.js';

const router = Router();
const controller = new ServicesController();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.remove.bind(controller));

export default router;
