const conexion = require("../config/conexion");

// Obtener favoritos
exports.obtenerFavoritos = async (req, res) => {

    try {

        const [favoritos] = await conexion.query(`
            SELECT
                favoritos.id,
                usuarios.nombre AS usuario,
                recetas.nombre AS receta
            FROM favoritos
            INNER JOIN usuarios ON favoritos.usuario_id = usuarios.id
            INNER JOIN recetas ON favoritos.receta_id = recetas.id
        `);

        res.json(favoritos);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Guardar favorito
exports.agregarFavorito = async (req, res) => {

    try {

        const { usuario_id, receta_id } = req.body;

        await conexion.query(
            "INSERT INTO favoritos(usuario_id, receta_id) VALUES (?, ?)",
            [usuario_id, receta_id]
        );

        res.json({
            mensaje: "Favorito agregado"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Eliminar favorito
exports.eliminarFavorito = async (req, res) => {

    try {

        await conexion.query(
            "DELETE FROM favoritos WHERE id=?",
            [req.params.id]
        );

        res.json({
            mensaje: "Favorito eliminado"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};