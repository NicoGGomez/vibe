const express = require("express");

const router = express.Router();

const pagoController = require("../controllers/pago.controller");

const verificarToken = require("../middlewares/auth.middleware");

router.post(
    "/qr",
    verificarToken,
    pagoController.crearQR
);

module.exports = router;