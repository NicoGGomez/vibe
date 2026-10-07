// Rutas de usuario

// Importaciones

const express = require("express");
const router = express.Router();

// Importación de clases

const usuarioController = require("../controllers/usuario.controller");

// Rutas

router.get(
    "/", 
    usuarioController.getUsuarios
);

router.post(
    "/registro", 
    usuarioController.registrarUsuario
);

router.post(
    "/login", 
    usuarioController.loguearUsuario
);

// Exportación de rutas

module.exports = router;