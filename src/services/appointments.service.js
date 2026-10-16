import AppointmentRepository from '../repositories/appointment.repository.js';
import ServiceRepository from '../repositories/service.repository.js';
import AppError from '../utils/AppError.js';

const repository = new AppointmentRepository();
const servicioRepository = new ServiceRepository();

export default class AppointmentsService {
  async getAll(usuario) {
    if (usuario.rol === 'admin') {
      return repository.getAll();
    }
    return repository.getByUsuarioId(usuario.id);
  }

  async getById(id, usuario) {
    const reserva = await repository.getById(id);
    if (!reserva) {
      throw new AppError(404, 'Reserva no encontrada');
    }
    if (usuario.rol !== 'admin' && reserva.usuario_id !== usuario.id) {
      throw new AppError(404, 'Reserva no encontrada');
    }
    return reserva;
  }

  async create(payload, usuario) {
    const servicio = await servicioRepository.getById(payload.servicio_id);
    if (!servicio) {
      throw new AppError(404, 'Servicio no encontrado');
    }
    if (!servicio.activo) {
      throw new AppError(409, 'El servicio no está disponible');
    }
    // Reserva sin sesión: el contacto viene en el payload y usuario_id queda nulo.
    return repository.create({ ...payload, usuario_id: usuario?.id ?? null });
  }

  async update(id, payload, usuario) {
    const reserva = await this.getById(id, usuario);
    if (usuario.rol !== 'admin' && !['pendiente', 'confirmada'].includes(reserva.estado)) {
      throw new AppError(409, 'Solo se pueden modificar reservas pendientes o confirmadas');
    }
    return repository.update(id, { ...reserva, ...payload });
  }

  async remove(id, usuario) {
    const reserva = await this.getById(id, usuario);
    if (usuario.rol !== 'admin' && !['pendiente', 'confirmada'].includes(reserva.estado)) {
      throw new AppError(409, 'Solo se pueden cancelar reservas pendientes o confirmadas');
    }
    await repository.remove(id);
  }
}
