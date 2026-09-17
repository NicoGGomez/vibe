// Controlador del servicio de Mercado Pago

const mercadoPagoSetupService = require("../services/mercadoPagoSetup.service");

// Función para crear una sucursal

const crearSucursal = async (req, res) => {

    try {

        const sucursal =
            await mercadoPagoSetupService.crearSucursal();

        res.status(201).json(sucursal);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: error.message
        });
    }
};

// Función para crear una caja

const crearCaja = async (req, res) => {

    try {

        const { storeId } = req.body;

        if (!storeId) {
            return res.status(400).json({
                mensaje: "Falta storeId."
            });
        }

        const caja =
            await mercadoPagoSetupService.crearCaja(storeId);

        res.status(201).json(caja);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: error.message
        });
    }
};

// Función para obtener una sucursal

const obtenerSucursales = async (req, res) => {

    try {

        const sucursales =
            await mercadoPagoSetupService.obtenerSucursales();

        res.json(sucursales);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: error.message
        });
    }
};

// Función para obtener una caja ya creada

const obtenerCaja = async (req, res) => {

    try {

        const caja =
            await mercadoPagoSetupService.obtenerCaja();

        res.json(caja);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: error.message
        });
    }
};

// Exportación de Funciones

module.exports = {
    crearSucursal,
    crearCaja,
    obtenerSucursales,
    obtenerCaja
};