const express = require("express");

const router = express.Router();

const favoritoController = require("../controllers/favoritoController");

router.get("/", favoritoController.obtenerFavoritos);

router.post("/", favoritoController.agregarFavorito);

router.delete("/:id", favoritoController.eliminarFavorito);

module.exports = router;