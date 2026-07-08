USE Sistema_recetarios;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recetas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_api VARCHAR(100) UNIQUE,
    nombre VARCHAR(150) NOT NULL,
    categoria VARCHAR(100),
    area VARCHAR(100),
    instrucciones TEXT,
    imagen VARCHAR(255)
);

CREATE TABLE favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    receta_id INT NOT NULL,
    fecha_guardado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_favoritos_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_favoritos_receta
        FOREIGN KEY (receta_id)
        REFERENCES recetas(id)
        ON DELETE CASCADE
);

CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contenido TEXT NOT NULL,
    usuario_id INT NOT NULL,
    receta_id INT NOT NULL,
    fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_comentarios_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_comentarios_receta
        FOREIGN KEY (receta_id)
        REFERENCES recetas(id)
        ON DELETE CASCADE
);

INSERT INTO usuarios (nombre, apellido, email, contrasena)
VALUES
('Monica', 'Vargas', 'monica@gmail.com', '123456'),
('Camila', 'Duran', 'cami@gmail.com', '1234567');

INSERT INTO recetas (id_api, nombre, categoria, area, instrucciones, imagen)
VALUES
(
NULL,
'Enchiladas Verdes',
'Platillo Principal',
'México',
'Receta de prueba. Se actualizará con la información obtenida desde la API.',
NULL
),
(
NULL,
'Pozole Rojo',
'Sopa',
'México',
'Receta de prueba. Se actualizará con la información obtenida desde la API.',
NULL
);

INSERT INTO favoritos (usuario_id, receta_id)
VALUES
(1,1),
(1,2),
(2,1);

INSERT INTO comentarios (contenido, usuario_id, receta_id)
VALUES
(
'Las enchiladas quedaron muy ricas y fueron fáciles de preparar.',
1,
1
),
(
'El pozole tiene muy buen sabor, lo volvería a cocinar.',
1,
2
),
(
'Me gustó mucho esta receta, la preparé con mi familia.',
2,
1
);