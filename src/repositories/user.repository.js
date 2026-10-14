import pool from '../db/connection.js';

export default class UserRepository {
  async getAll() {}

  async getById(id) {
    const { rows } = await pool.query(
      'SELECT id, nombre, email, rol, creado_en FROM usuarios WHERE id = $1',
      [id]
    );
    return rows[0];
  }

  async getByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return rows[0];
  }

  async create({ nombre, email, password_hash }) {
    const { rows } = await pool.query(
      `INSERT INTO usuarios (nombre, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, nombre, email, rol, creado_en`,
      [nombre, email, password_hash]
    );
    return rows[0];
  }

  async update(id, payload) {}

  async remove(id) {}
}
