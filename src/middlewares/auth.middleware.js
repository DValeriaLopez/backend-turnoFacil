import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';

export function authenticate(req, res, next) {
  const [tipo, token] = (req.headers.authorization ?? '').split(' ');

  if (tipo !== 'Bearer' || !token) {
    return next(new AppError(401, 'Token requerido'));
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    next(new AppError(401, 'Token inválido o expirado'));
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.rol)) {
      return next(new AppError(403, 'No tienes permiso para esta acción'));
    }
    next();
  };
}
