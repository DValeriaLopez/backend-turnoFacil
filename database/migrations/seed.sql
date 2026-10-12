INSERT INTO usuarios (nombre, email, password_hash, rol)
VALUES
('Ana García', 'ana@gmail.com', 'hash_demo_001', 'cliente'),
('Pedro López', 'pedro@gmail.com', 'hash_demo_002', 'cliente'),
('Luis Torres', 'luis@gmail.com', 'hash_demo_003', 'cliente'),
('María Rodríguez', 'maria@gmail.com', 'hash_demo_004', 'cliente'),
('Carlos Mendoza', 'carlos@gmail.com', 'hash_demo_005', 'admin');


INSERT INTO servicios (nombre, descripcion, duracion_min, precio)
VALUES
('Limpieza dental', 'Limpieza y eliminación de placa dental.', 45, 80.00),
('Blanqueamiento dental', 'Tratamiento estético para mejorar el color de los dientes.', 60, 250.00),
('Ortodoncia', 'Evaluación y seguimiento de tratamiento de ortodoncia.', 60, 150.00),
('Consulta odontológica', 'Evaluación general del estado de salud bucal.', 30, 60.00),
('Extracción dental', 'Extracción de piezas dentales según evaluación profesional.', 45, 120.00);



INSERT INTO reservas
(usuario_id, servicio_id, fecha_hora, estado, notas)
VALUES
(1, 1, '2026-10-08 09:00:00', 'confirmada', 'Primera limpieza dental'),
(2, 2, '2026-10-08 10:30:00', 'pendiente', 'Consulta sobre blanqueamiento'),
(3, 3, '2026-10-08 12:00:00', 'confirmada', 'Control de ortodoncia'),
(4, 4, '2026-10-09 09:30:00', 'pendiente', 'Dolor en una pieza dental'),
(1, 5, '2026-10-09 11:00:00', 'cancelada', 'El paciente solicitó cancelar'),
(2, 1, '2026-10-09 15:00:00', 'confirmada', 'Limpieza de rutina'),
(3, 4, '2026-10-10 09:00:00', 'atendida', 'Consulta general'),
(4, 2, '2026-10-10 10:30:00', 'confirmada', 'Tratamiento estético'),
(1, 3, '2026-10-10 12:00:00', 'pendiente', 'Evaluación inicial'),
(2, 4, '2026-10-11 09:30:00', 'confirmada', 'Revisión general'),
(3, 1, '2026-10-11 11:00:00', 'pendiente', 'Limpieza dental'),
(4, 5, '2026-10-11 15:00:00', 'confirmada', 'Extracción programada'),
(1, 4, '2026-10-12 09:00:00', 'atendida', 'Control odontológico'),
(2, 3, '2026-10-12 10:30:00', 'pendiente', 'Seguimiento de ortodoncia'),
(3, 2, '2026-10-12 12:00:00', 'confirmada', 'Segunda sesión de blanqueamiento');