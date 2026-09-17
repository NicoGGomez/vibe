// Rutas de Carrito

// Importaciones 

const express = require("express");
const router = express.Router();

// Importación de clases 

const carritoController = require("../controllers/carrito.controller");
const verificarToken = require("../middlewares/auth.middleware");

// Rutas

router.post("/", verificarToken, carritoController.agregarProductoCarrito);
router.get("/", verificarToken, carritoController.getProductosCarrito);
router.delete("/:id", verificarToken, carritoController.eliminarProductoCarrito);

// Exportación de rutas

module.exports = router;