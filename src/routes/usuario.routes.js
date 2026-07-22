const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuario.controller");

router.get("/", usuarioController.getUsuarios);
router.post("/registro", usuarioController.registrarUsuario);
router.post("/login", usuarioController.loguearUsuario);

module.exports = router;