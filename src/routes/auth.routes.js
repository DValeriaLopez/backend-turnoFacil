import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';

import AuthController from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { registroSchema, loginSchema } from '../schemas/auth.schema.js';
import AppError from '../utils/AppError.js';

const router = Router();
const controller = new AuthController();

const limitador = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  handler: (req, res, next) => next(new AppError(429, 'Demasiados intentos, espera 15 minutos')),
});

router.post('/registro', limitador, validate({ body: registroSchema }), controller.registro.bind(controller));
router.post('/login', limitador, validate({ body: loginSchema }), controller.login.bind(controller));
router.get('/yo', authenticate, controller.yo.bind(controller));

export default router;
