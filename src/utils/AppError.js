export default class AppError extends Error {
  constructor(statusCode, mensaje, detalles = []) {
    super(mensaje);
    this.statusCode = statusCode;
    this.detalles = detalles;
  }
}
