const express = require("express");
const router = express.Router();

const carritoController = require("../controllers/carrito.controller");
const verificarToken = require("../middlewares/verificarToken");

router.post("/", verificarToken, carritoController.agregarProductoCarrito);
router.get("/", verificarToken, carritoController.getProductosCarrito);

module.exports = router;