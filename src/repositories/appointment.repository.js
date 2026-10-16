import pool from '../db/connection.js';

export default class AppointmentRepository {
  async getAll() {
    const { rows } = await pool.query(
      `SELECT id, usuario_id, servicio_id, fecha_hora, estado, notas, nombre_contacto, email_contacto, telefono, creado_en
       FROM reservas
       ORDER BY fecha_hora`
    );
    return rows;
  }

  async getById(id) {
    const { rows } = await pool.query(
      `SELECT id, usuario_id, servicio_id, fecha_hora, estado, notas, nombre_contacto, email_contacto, telefono, creado_en
       FROM reservas WHERE id = $1`,
      [id]
    );
    return rows[0];
  }

  async getByUsuarioId(usuarioId) {
    const { rows } = await pool.query(
      `SELECT id, usuario_id, servicio_id, fecha_hora, estado, notas, nombre_contacto, email_contacto, telefono, creado_en
       FROM reservas WHERE usuario_id = $1
       ORDER BY fecha_hora`,
      [usuarioId]
    );
    return rows;
  }

  async create({ usuario_id, servicio_id, fecha_hora, nombre_contacto, email_contacto, telefono, notas }) {
    const { rows } = await pool.query(
      `INSERT INTO reservas (usuario_id, servicio_id, fecha_hora, nombre_contacto, email_contacto, telefono, notas)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [usuario_id ?? null, servicio_id, fecha_hora, nombre_contacto, email_contacto, telefono ?? null, notas ?? null]
    );
    return rows[0];
  }

  async update(id, payload) {
    const { rows } = await pool.query(
      `UPDATE reservas
       SET estado = $1, fecha_hora = $2, notas = $3
       WHERE id = $4 RETURNING *`,
      [payload.estado, payload.fecha_hora, payload.notas, id]
    );
    return rows[0];
  }

  async remove(id) {
    const { rowCount } = await pool.query('DELETE FROM reservas WHERE id = $1', [id]);
    return rowCount > 0;
  }
}
