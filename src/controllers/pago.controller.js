// // Controlador de Pago

// const mercadoPagoService = require("../services/mercadoPago.service");

// // Función para crear un código QR y una preferencia de pago

// const crearQR = async (req, res) => {

//     try {

//         const { monto } = req.body;

//         if (!monto || monto <= 0) {
//             return res.status(400).json({
//                 mensaje: "El monto debe ser mayor a 0."
//             });
//         }

//         const referencia = `VIBE-${req.usuario.id}-${Date.now()}`;

//         // Crear QR
//         const orden = await mercadoPagoService.crearOrdenQR(
//             Number(monto),
//             referencia
//         );

//         // Crear preferencia de Checkout Pro
//         const preferencia = await mercadoPagoService.crearPreferencia(
//             Number(monto),
//             referencia
//         );

//         res.status(201).json({
//             id: orden.id,
//             estado: orden.status,
//             monto: orden.total_amount,

//             // QR
//             qr_data: orden.type_response?.qr_data,

//             // Checkout Mercado Pago
//             init_point: preferencia.init_point
//         });

//     } catch (error) {

//         console.error(error);

//         res.status(500).json({
//             mensaje: error.message
//         });
//     }
// };

// // Exportación de funciones

// module.exports = {
//     crearQR
// };

// Controlador de Pago

const mercadoPagoService = require("../services/mercadoPago.service");
const pedidoModel = require("../models/pedido.model");


// Función para crear un código QR y una preferencia de pago

const crearQR = async (req, res) => {

    try {

        const { id_pedido } = req.body;

        const idUsuario = req.usuario.id;


        // Validar pedido

        if (!id_pedido) {

            return res.status(400).json({
                mensaje: "El id del pedido es obligatorio."
            });

        }


        // Obtener pedido del usuario

        const pedido = await pedidoModel.obtenerPedidoPorIdUsuario(
            id_pedido,
            idUsuario
        );


        if (!pedido) {

            return res.status(404).json({
                mensaje: "Pedido no encontrado."
            });

        }


        // Verificar estado

        if (pedido.estado !== "pendiente") {

            return res.status(400).json({
                mensaje: "Este pedido ya no está pendiente de pago."
            });

        }


        // Obtener datos del pedido

        const monto = Number(pedido.total);
        const referencia = pedido.referencia_pago;


        if (!monto || monto <= 0) {

            return res.status(400).json({
                mensaje: "El monto del pedido no es válido."
            });

        }


        // Crear QR

        const orden = await mercadoPagoService.crearOrdenQR(
            monto,
            referencia
        );


        // Crear preferencia de Checkout Pro

        const preferencia = await mercadoPagoService.crearPreferencia(
            monto,
            referencia
        );


        res.status(201).json({

            id_pedido: pedido.id_pedido,

            referencia_pago: referencia,

            // Mercado Pago QR
            id: orden.id,
            estado: orden.status,
            monto: orden.total_amount,
            qr_data: orden.type_response?.qr_data,

            // Checkout Pro
            init_point: preferencia.init_point

        });


    } catch (error) {

        console.error("Error al crear pago:", error);

        res.status(500).json({
            mensaje: error.message
        });

    }

};

const obtenerEstadoQR = async (req, res) => {

    try {

        const { idOrden } = req.params;

        if (!idOrden) {
            return res.status(400).json({
                mensaje: "El ID de la orden es obligatorio."
            });
        }

        const orden = await mercadoPagoService.obtenerOrdenQR(idOrden);

        res.status(200).json({
            id: orden.id,
            estado: orden.status,
            detalle: orden.status_detail,
            referencia_pago: orden.external_reference,
            monto: orden.total_amount
        });

    } catch (error) {

        console.error("Error al consultar orden QR:", error);

        res.status(500).json({
            mensaje: error.message
        });
    }
};

// Exportación de funciones

module.exports = {
    crearQR,
    obtenerEstadoQR
};