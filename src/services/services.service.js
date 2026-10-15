import ServiceRepository from '../repositories/service.repository.js';
import AppError from '../utils/AppError.js';

const repository = new ServiceRepository();

export default class ServicesService {
    async getAll({ buscar, pagina, limite, orden }) {
    const offset = (pagina - 1) * limite;
    const { rows, total } = await repository.getAll({ buscar, limite, offset, orden });

    return {
      datos: rows,
      paginacion: {
        pagina,
        limite,
        total,
        totalPaginas: Math.ceil(total / limite),
      },
    };
  }

  async getById(id) {
    const servicio = await repository.getById(id);
    if (!servicio) {
      throw new AppError(404, 'Servicio no encontrado');
    }
    return servicio;
  }

  async create(payload) {
    return repository.create(payload);
  }

  async update(id, payload) {
    const actual = await this.getById(id);
    return repository.update(id, { ...actual, ...payload });
  }

  async remove(id) {
    const desactivado = await repository.remove(id);
    if (!desactivado) {
      throw new AppError(404, 'Servicio no encontrado');
    }
  }
}
