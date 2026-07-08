const mealdb = require("../services/mealdbService");

exports.obtenerRecetas = (req, res) => {

    res.json({

        mensaje: "API del Recetario"

    });

};

exports.buscarReceta = async (req, res) => {

    try {

        const nombre = req.params.nombre;

        const recetas = await mealdb.buscarReceta(nombre);

        res.json(recetas);

    } catch (error) {

        res.status(500).json({

            mensaje: "Error al consultar TheMealDB"

        });

    }

};

exports.buscarCategoria = async (req, res) => {

    try {

        const categoria = req.params.categoria;

        const recetas = await mealdb.buscarCategoria(categoria);

        res.json(recetas);

    } catch (error) {

        res.status(500).json({

            mensaje: "Error al consultar categoría"

        });

    }

};