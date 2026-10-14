import pool from '../db/connection.js';

export default class ServiceRepository {
  async getAll({ buscar, limite, offset, orden }) {
    const filtro = `%${buscar ?? ''}%`;
    const { rows } = await pool.query(
      `SELECT * FROM servicios
       WHERE activo = true AND nombre ILIKE $1
       ORDER BY
         CASE WHEN $4 = 'precio' THEN precio END,
         CASE WHEN $4 = 'duracion_min' THEN duracion_min END,
         nombre
       LIMIT $2 OFFSET $3`,
      [filtro, limite, offset, orden]
    );
    const { rows: conteo } = await pool.query(
      'SELECT COUNT(*)::int AS total FROM servicios WHERE activo = true AND nombre ILIKE $1',
      [filtro]
    );
    return { rows, total: conteo[0].total };
  }

  async getById(id) {
    const { rows } = await pool.query('SELECT * FROM servicios WHERE id = $1', [id]);
    return rows[0];
  }

  async create(payload) {
    const { rows } = await pool.query(
      `INSERT INTO servicios (nombre, descripcion, duracion_min, precio)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [payload.nombre, payload.descripcion, payload.duracion_min, payload.precio]
    );
    return rows[0];
  }

  async update(id, payload) {
    const { rows } = await pool.query(
      `UPDATE servicios
       SET nombre = $1, descripcion = $2, duracion_min = $3, precio = $4, activo = $5
       WHERE id = $6 RETURNING *`,
      [payload.nombre, payload.descripcion, payload.duracion_min, payload.precio, payload.activo, id]
    );
    return rows[0];
  }

  async remove(id) {
    const { rowCount } = await pool.query(
      'UPDATE servicios SET activo = false WHERE id = $1',
      [id]
    );
    return rowCount > 0;
  }
}
