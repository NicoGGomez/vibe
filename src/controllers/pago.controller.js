// Controlador de Pago

const mercadoPagoService = require("../services/mercadoPago.service");

// Función para crear un código QR de pago

const crearQR = async (req, res) => {

    try {

        const { monto } = req.body;

        if (!monto || monto <= 0) {
            return res.status(400).json({
                mensaje: "El monto debe ser mayor a 0."
            });
        }

        const referencia = `VIBE-${req.usuario.id}-${Date.now()}`;

        const orden = await mercadoPagoService.crearOrdenQR(
            Number(monto),
            referencia
        );

        res.status(201).json({
            id: orden.id,
            estado: orden.status,
            monto: orden.total_amount,
            qr_data: orden.type_response?.qr_data
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: error.message
        });
    }
};

// Exportación de Función

module.exports = {
    crearQR
};