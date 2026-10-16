import AppError from '../utils/AppError.js';

export function notFound(req, res, next) {
  next(new AppError(404, `Ruta no encontrada: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: { mensaje: err.message, detalles: err.detalles },
    });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: { mensaje: 'JSON mal formado', detalles: [] } });
  }
  if (err.code === '23503') {
    return res.status(409).json({
      error: { mensaje: 'Operación no permitida: existen registros relacionados', detalles: [] },
    });
  }
  console.error(err);
  res.status(500).json({ error: { mensaje: 'Error interno del servidor', detalles: [] } });
}
