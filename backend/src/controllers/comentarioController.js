const conexion = require("../config/conexion");

// Obtener comentarios
exports.obtenerComentarios = async (req, res) => {

    try {

        const [comentarios] = await conexion.query(`
            SELECT
                comentarios.id,
                usuarios.nombre AS usuario,
                recetas.nombre AS receta,
                comentarios.contenido,
                comentarios.fecha_comentario
            FROM comentarios
            INNER JOIN usuarios
                ON comentarios.usuario_id = usuarios.id
            INNER JOIN recetas
                ON comentarios.receta_id = recetas.id
        `);

        res.json(comentarios);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Agregar comentario
exports.agregarComentario = async (req, res) => {

    try {

        const { contenido, usuario_id, receta_id } = req.body;

        await conexion.query(
            "INSERT INTO comentarios(contenido, usuario_id, receta_id) VALUES (?, ?, ?)",
            [contenido, usuario_id, receta_id]
        );

        res.json({
            mensaje: "Comentario agregado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};