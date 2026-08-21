const express = require("express");

const router = express.Router();

const controller = require(
    "../controllers/mercadoPagoSetup.controller"
);


router.post(
    "/sucursal",
    controller.crearSucursal
);


router.post(
    "/caja",
    controller.crearCaja
);

router.get(
    "/sucursales",
    controller.obtenerSucursales
);

module.exports = router;