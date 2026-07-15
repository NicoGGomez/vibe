const express = require("express");
const router = express.Router();

const productoController = require("../controllers/producto.controller");

router.get("/", productoController.getProductos);

const upload = require("../middlewares/upload");

router.post(
    "/",
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