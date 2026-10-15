import AuthService from '../services/auth.service.js';

const service = new AuthService();

export default class AuthController {
  async registro(req, res) {
    const usuario = await service.registro(req.validated.body);
    res.status(201).json(usuario);
  }

  async login(req, res) {
    const resultado = await service.login(req.validated.body);
    res.status(200).json(resultado);
  }

  async yo(req, res) {
    const usuario = await service.yo(req.user.id);
    res.status(200).json(usuario);
  }
}
