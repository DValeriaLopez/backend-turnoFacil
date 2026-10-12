import pool from './connection.js';

try {
    const result = await pool.query(
        'SELECT * FROM usuarios'
    );

    console.log('Usuarios encontrados:');
    console.table(result.rows);

} catch (error) {
    console.error('Error:', error.message);

} finally {
    await pool.end();
}