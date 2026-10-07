// Ruta de Producto

// Importaciones

const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

// Importación de clases

const verificarToken = require("../middlewares/auth.middleware");
const verificarRol = require("../middlewares/verificarAdmin.middleware");
const productoController = require("../controllers/producto.controller");

// Rutas

router.patch(
    "/:id/stock",
    verificarToken,
    verificarRol("admin"),
    productoController.modificarStock
);

router.get(
    "/", 
    productoController.getProductos
);

router.get(
    "/categoria/:id", 
    productoController.getProductoPorCategoria
);

router.get(
    "/:id", 
    productoController.getProducto
);

router.post(
    "/",
    verificarToken,
    verificarRol("admin"),
    upload.fields([
        {
            name: "imagenPrincipal",
            maxCount: 1
        },
        {
            name: "imagenExtraUno",
            maxCount: 1
        },
        {
            name: "imagenExtraDos",
            maxCount: 1
        },
        {
            name: "imagenExtraTres",
            maxCount: 1
        }
    ]),
    productoController.cargarProducto
);

router.put(
    "/:id",
    verificarToken,
    verificarRol("admin"),
    productoController.actualizarProducto
);

router.delete(
    "/:id",
    verificarToken,
    verificarRol("admin"),
    productoController.eliminarProducto
);

// Exportación de rutas

module.exports = router;