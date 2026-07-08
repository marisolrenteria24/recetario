const express = require("express");

const router = express.Router();

const usuarioController = require("../controllers/usuarioController");

console.log(usuarioController);
console.log("obtenerUsuarios:", typeof usuarioController.obtenerUsuarios);
console.log("registrarUsuario:", typeof usuarioController.registrarUsuario);
console.log("login:", typeof usuarioController.login);

router.get("/", usuarioController.obtenerUsuarios);

router.post("/register", usuarioController.registrarUsuario);

router.post("/login", usuarioController.login);

module.exports = router;