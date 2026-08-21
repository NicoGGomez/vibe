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


module.exports = router;