// Ruta de Mercado pago

// Importaciones

const express = require("express");
const router = express.Router();

// Importación de clases

const controller = require("../controllers/mercadoPagoSetup.controller");

// Rutas

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

router.get(
    "/caja", 
    controller.obtenerCaja
);

router.post(
    "/webhook", 
    async (req, res) => {

    console.log("🔔 WEBHOOK MERCADO PAGO");
    console.log(req.body);

    res.sendStatus(200);
});

// Exportación de rutas

module.exports = router;