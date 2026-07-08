const express = require("express");

const router = express.Router();

const comentarioController = require("../controllers/comentarioController");

router.get("/", comentarioController.obtenerComentarios);

router.post("/", comentarioController.agregarComentario);

module.exports = router;