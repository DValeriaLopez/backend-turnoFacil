import { Router } from 'express';

import UsersController from '../controllers/users.controller.js';

const router = Router();
const controller = new UsersController();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.remove.bind(controller));

export default router;
