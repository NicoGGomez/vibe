const mercadoPagoSetupService = require(
    "../services/mercadoPagoSetup.service"
);


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


module.exports = {
    crearSucursal,
    crearCaja,
    obtenerSucursales
};