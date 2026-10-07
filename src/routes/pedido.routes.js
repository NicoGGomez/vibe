// Rutas de Pedido

// Importaciones

const express = require("express");
const router = express.Router();

// Importación de clases

const pedidoController = require("../controllers/pedido.controller");
const verificarToken = require("../middlewares/auth.middleware");

// Rutas

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

router.get(
    "/admin",
    verificarToken,
    pedidoController.obtenerPedidosAdmin
);

router.patch(
    "/:id/enviado",
    verificarToken,
    pedidoController.marcarPedidoEnviado
);

// Exportación de rutas

module.exports = router;