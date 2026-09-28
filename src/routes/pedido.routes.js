// Rutas de Pedido

const express = require("express");

const router = express.Router();

const pedidoController = require("../controllers/pedido.controller");
const verificarToken = require("../middlewares/auth.middleware");


router.post(
    "/",
    verificarToken,
    pedidoController.crearPedido
);

router.get(
    "/",
    verificarToken,
    pedidoController.obtenerPedidos
);

module.exports = router;