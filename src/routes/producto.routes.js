const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const verificarToken = require("../middlewares/auth.middleware");
const verificarRol = require("../middlewares/verificarAdmin.middleware");

const productoController = require("../controllers/producto.controller");

router.get("/", productoController.getProductos);
router.get("/:id", productoController.getProducto);
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

module.exports = router;