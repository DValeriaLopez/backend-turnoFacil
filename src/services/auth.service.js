import jwt from 'jsonwebtoken';

import UserRepository from '../repositories/user.repository.js';
import AppError from '../utils/AppError.js';
import { hashPassword, verifyPassword } from '../utils/password.js';

const repository = new UserRepository();

export default class AuthService {
  async registro({ nombre, email, password }) {
    const existente = await repository.getByEmail(email);
    if (existente) {
      throw new AppError(409, 'El email ya está registrado');
    }
    const password_hash = await hashPassword(password);
    return repository.create({ nombre, email, password_hash });
  }

  async login({ email, password }) {
    const usuario = await repository.getByEmail(email);
    const valida = usuario && (await verifyPassword(password, usuario.password_hash));
    if (!valida) {
      throw new AppError(401, 'Credenciales incorrectas');
    }
    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });
    return { token };
  }

  async yo(id) {
    const usuario = await repository.getById(id);
    if (!usuario) {
      throw new AppError(404, 'Usuario no encontrado');
    }
    return usuario;
  }
}
