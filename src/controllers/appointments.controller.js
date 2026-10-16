import AppointmentsService from '../services/appointments.service.js';

const service = new AppointmentsService();

export default class AppointmentsController {
  async getAll(req, res) {
    const reservas = await service.getAll(req.user);
    res.status(200).json(reservas);
  }

  async getById(req, res) {
    const reserva = await service.getById(req.validated.params.id, req.user);
    res.status(200).json(reserva);
  }

  async create(req, res) {
    const reserva = await service.create(req.validated.body, req.user);
    res.status(201).json(reserva);
  }

  async update(req, res) {
    const reserva = await service.update(req.validated.params.id, req.validated.body, req.user);
    res.status(200).json(reserva);
  }

  async remove(req, res) {
    await service.remove(req.validated.params.id, req.user);
    res.status(204).end();
  }
}
