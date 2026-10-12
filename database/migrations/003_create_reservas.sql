CREATE TABLE reservas (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    servicio_id INT NOT NULL,
    fecha_hora TIMESTAMP NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'pendiente',
    notas TEXT,
    creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT reservas_usuario_fk
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE,

    CONSTRAINT reservas_servicio_fk
        FOREIGN KEY (servicio_id)
        REFERENCES servicios(id)
        ON DELETE RESTRICT,

    CONSTRAINT reservas_estado_check
        CHECK (
            estado IN (
                'pendiente',
                'confirmada',
                'cancelada',
                'atendida'
            )
        )
);