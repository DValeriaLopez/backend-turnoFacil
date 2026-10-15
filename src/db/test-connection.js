import pool from './connection.js';

try {
    const result = await pool.query('SELECT NOW()');

    console.log('✅ Conectado a PostgreSQL');
    console.log(result.rows[0]);

} catch (error) {
    console.error('❌ Error de conexión:', error.message);

} finally {
    await pool.end();
}