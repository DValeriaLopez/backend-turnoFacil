-- ============================================================
-- 004 — Las reservas pasan a llevar los datos de contacto del paciente.
--
-- Modelo nuevo: el paciente NO tiene cuenta ni inicia sesión.
-- Quien reserva deja su propio nombre, email y teléfono.
-- usuario_id queda opcional: solo se completa cuando la reserva
-- nace de una sesión autenticada (la FK se conserva).
--
-- El archivo es ejecutable de forma independiente contra la base
-- existente (001-003 ya aplicadas).
-- ============================================================

-- 1) Columnas nuevas. Se crean anulables para poder backfillear
--    con los datos de las reservas existentes.
ALTER TABLE reservas ADD COLUMN nombre_contacto VARCHAR(100);
ALTER TABLE reservas ADD COLUMN email_contacto VARCHAR(150);
ALTER TABLE reservas ADD COLUMN telefono VARCHAR(30);

-- 2) Backfill: las reservas ya creadas toman el nombre y el email
--    del usuario dueño de la reserva.
UPDATE reservas r
SET nombre_contacto = u.nombre,
    email_contacto = u.email
FROM usuarios u
WHERE u.id = r.usuario_id
  AND r.nombre_contacto IS NULL;

-- 3) A partir de acá toda reserva tiene contacto. nombre_contacto y
--    email_contacto son obligatorios; telefono sigue siendo opcional.
ALTER TABLE reservas ALTER COLUMN nombre_contacto SET NOT NULL;
ALTER TABLE reservas ALTER COLUMN email_contacto SET NOT NULL;

-- 4) usuario_id pasa a ser opcional: se llena solo si la reserva
--    viene de una sesión. Se mantiene la FK a usuarios(id)
--    (ON DELETE CASCADE de la migración 003).
ALTER TABLE reservas ALTER COLUMN usuario_id DROP NOT NULL;
