const express = require("express");

const router = express.Router();

const recetaController = require("../controllers/recetaController");

router.get("/", recetaController.obtenerRecetas);

router.get("/buscar/:nombre", recetaController.buscarReceta);

router.get("/categoria/:categoria", recetaController.buscarCategoria);

module.exports = router;