-- ============================================================
-- USUARIOS SEED — qué colocar en el formulario de login (/login)
--
--   CONTRASEÑA (igual para los 5): Turno1234
--
--   ana@gmail.com    -> admin
--   pedro@gmail.com  -> admin
--   luis@gmail.com   -> admin
--   maria@gmail.com  -> admin
--   carlos@gmail.com -> admin
--
-- TODOS son admin por pedido del usuario (para probar sin restricciones).
-- Para volver al modelo cliente/admin, poné 'cliente' en los 4 primeros:
--   UPDATE usuarios SET rol='cliente' WHERE email <> 'carlos@gmail.com';
--
-- El campo del formulario va la contraseña en claro: Turno1234.
-- NUNCA pegues el hash de abajo en el formulario: password_hash
-- es lo que guarda la DB, no lo que se escribe.
--
-- Los hashes se generan con src/utils/password.js (scrypt, formato
-- salt:hash). Nunca pongas strings como 'hash_demo_001' ni hashes
-- de bcrypt: verifyPassword siempre daría false y el login da 401.
-- Para regenerarlos:
--   node -e "import('./src/utils/password.js').then(async ({hashPassword}) => console.log(await hashPassword('Turno1234')))"
-- ============================================================
INSERT INTO usuarios (nombre, email, password_hash, rol)
VALUES
('Ana García', 'ana@gmail.com', 'baf9aacf09bb1cb1cbc602473c91a938:36367872df42c55194cab25a99a21da802dd36c890842c1de24368d5fcb334157b348832a58efb04539cd040707b77ef37b7bf014a51d6e060f5066cf9789099', 'admin'),
('Pedro López', 'pedro@gmail.com', 'a40f00afbd56f09fad849cdb64514606:11af239de83b9d723c91cc9a850ad84994cbfe43496e30a19aa78666ba9725c2ff2d0ab5d75c8418d8158b6751b28d38335284708cbf84f8a871a613e3921668', 'admin'),
('Luis Torres', 'luis@gmail.com', 'bdb23b158ff60d0f1265623eece53ba4:4147ab617bca569187c74f79dfc6fc2bbb7c321d31414de779e46498f9207870d8e1fdeccee7a49d14ad23f00d4eca663c32b9a90309dcec56a77cea13d5a766', 'admin'),
('María Rodríguez', 'maria@gmail.com', 'e5a7942e1be952cc92c8746e936c5869:0f6c77e25388fbbca5765d9706993acce341ea92250e4bb25955c3510934ed99ecf518ed023dc6f9e366c3bf6c0b9098c22f4dc6bbfb915961089777500bca63', 'admin'),
('Carlos Mendoza', 'carlos@gmail.com', '201b04fc8b290b83abc3fcf92611a3e7:f5590bf6169c5f6eece086e3f54d22edd83a066e6925f39354cb641ce236cab4033cc2ba48710983b7f5a8a812da8091e561ff71200bd21e2c50e3744804d72f', 'admin');


INSERT INTO servicios (nombre, descripcion, duracion_min, precio)
VALUES
('Limpieza dental', 'Limpieza y eliminación de placa dental.', 45, 80.00),
('Blanqueamiento dental', 'Tratamiento estético para mejorar el color de los dientes.', 60, 250.00),
('Ortodoncia', 'Evaluación y seguimiento de tratamiento de ortodoncia.', 60, 150.00),
('Consulta odontológica', 'Evaluación general del estado de salud bucal.', 30, 60.00),
('Extracción dental', 'Extracción de piezas dentales según evaluación profesional.', 45, 120.00);



INSERT INTO reservas
(usuario_id, servicio_id, fecha_hora, estado, notas, nombre_contacto, email_contacto, telefono)
VALUES
(1, 1, '2026-10-08 09:00:00', 'confirmada', 'Primera limpieza dental', 'Ana García', 'ana@gmail.com', '+54 11 5555-0101'),
(2, 2, '2026-10-08 10:30:00', 'pendiente', 'Consulta sobre blanqueamiento', 'Pedro López', 'pedro@gmail.com', '+54 11 5555-0102'),
(3, 3, '2026-10-08 12:00:00', 'confirmada', 'Control de ortodoncia', 'Luis Torres', 'luis@gmail.com', '+54 11 5555-0103'),
(4, 4, '2026-10-09 09:30:00', 'pendiente', 'Dolor en una pieza dental', 'María Rodríguez', 'maria@gmail.com', '+54 11 5555-0104'),
(1, 5, '2026-10-09 11:00:00', 'cancelada', 'El paciente solicitó cancelar', 'Ana García', 'ana@gmail.com', '+54 11 5555-0101'),
(2, 1, '2026-10-09 15:00:00', 'confirmada', 'Limpieza de rutina', 'Pedro López', 'pedro@gmail.com', '+54 11 5555-0102'),
(3, 4, '2026-10-10 09:00:00', 'atendida', 'Consulta general', 'Luis Torres', 'luis@gmail.com', '+54 11 5555-0103'),
(4, 2, '2026-10-10 10:30:00', 'confirmada', 'Tratamiento estético', 'María Rodríguez', 'maria@gmail.com', '+54 11 5555-0104'),
(1, 3, '2026-10-10 12:00:00', 'pendiente', 'Evaluación inicial', 'Ana García', 'ana@gmail.com', '+54 11 5555-0101'),
(2, 4, '2026-10-11 09:30:00', 'confirmada', 'Revisión general', 'Pedro López', 'pedro@gmail.com', '+54 11 5555-0102'),
(3, 1, '2026-10-11 11:00:00', 'pendiente', 'Limpieza dental', 'Luis Torres', 'luis@gmail.com', '+54 11 5555-0103'),
(4, 5, '2026-10-11 15:00:00', 'confirmada', 'Extracción programada', 'María Rodríguez', 'maria@gmail.com', '+54 11 5555-0104'),
(1, 4, '2026-10-12 09:00:00', 'atendida', 'Control odontológico', 'Ana García', 'ana@gmail.com', '+54 11 5555-0101'),
(2, 3, '2026-10-12 10:30:00', 'pendiente', 'Seguimiento de ortodoncia', 'Pedro López', 'pedro@gmail.com', '+54 11 5555-0102'),
(3, 2, '2026-10-12 12:00:00', 'confirmada', 'Segunda sesión de blanqueamiento', 'Luis Torres', 'luis@gmail.com', '+54 11 5555-0103');