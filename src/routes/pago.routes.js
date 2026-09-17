// Ruta de Pago

// Importaciones

const express = require("express");
const router = express.Router();

// Importación de clases

const pagoController = require("../controllers/pago.controller");
const verificarToken = require("../middlewares/auth.middleware");

// Rutas

router.post("/qr", verificarToken, pagoController.crearQR);

// Exportación de rutas

module.exports = router;