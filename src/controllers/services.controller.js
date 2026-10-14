import ServicesService from '../services/services.service.js';

const service = new ServicesService();

export default class ServicesController {
  async getAll(req, res) {
    const resultado = await service.getAll(req.validated.query);
    res.status(200).json(resultado);
  }

  async getById(req, res) {
    const servicio = await service.getById(req.validated.params.id);
    res.status(200).json(servicio);
  }

  async create(req, res) {
    const servicio = await service.create(req.validated.body);
    res.status(201).json(servicio);
  }

  async update(req, res) {
    const servicio = await service.update(req.validated.params.id, req.validated.body);
    res.status(200).json(servicio);
  }

  async remove(req, res) {
    await service.remove(req.validated.params.id);
    res.status(204).end();
  }
}
