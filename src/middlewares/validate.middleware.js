import AppError from '../utils/AppError.js';

export function validate(schemas) {
  return (req, res, next) => {
    req.validated = {};

    for (const parte of ['params', 'query', 'body']) {
      if (!schemas[parte]) continue;

      const resultado = schemas[parte].safeParse(req[parte]);

      if (!resultado.success) {
        const detalles = resultado.error.issues.map((issue) => ({
          campo: issue.path.join('.'),
          mensaje: issue.message,
        }));
        return next(new AppError(400, 'Datos inválidos', detalles));
      }

      req.validated[parte] = resultado.data;
    }

    next();
  };
}
