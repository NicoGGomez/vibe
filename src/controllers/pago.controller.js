
const mercadoPagoService = require("../services/mercadoPago.service");
const pedidoModel = require("../models/pedido.model");
const crypto = require("crypto");

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

const webhook = async (req, res) => {

    try {

        console.log("=================================");
        console.log("WEBHOOK MERCADO PAGO RECIBIDO");
        console.log("=================================");

        const signature = req.headers["x-signature"];
        const requestId = req.headers["x-request-id"];

        const dataId = req.query["data.id"];

        console.log("Data ID:", dataId);
        console.log("Request ID:", requestId);
        console.log("Signature:", signature);
        console.log("Body:", req.body);

        if (!signature || !requestId || !dataId) {

            console.log("Webhook sin datos suficientes.");

            return res.status(400).json({
                mensaje: "Datos del webhook incompletos."
            });

        }

        // Extraer ts y v1
        const partes = signature.split(",");

        let ts = null;
        let v1 = null;

        for (const parte of partes) {

            const [clave, valor] = parte.split("=");

            if (clave === "ts") {
                ts = valor;
            }

            if (clave === "v1") {
                v1 = valor;
            }

        }

        if (!ts || !v1) {

            return res.status(400).json({
                mensaje: "Firma inválida."
            });

        }

        /*
         * Mercado Pago indica utilizar:
         *
         * id:[data.id_url];
         * request-id:[x-request-id];
         * ts:[ts];
         *
         * El data.id debe ir en minúsculas.
         */

        const manifest =
            `id:${dataId.toLowerCase()};` +
            `request-id:${requestId};` +
            `ts:${ts};`;

        const firmaCalculada = crypto
            .createHmac(
                "sha256",
                process.env.MP_WEBHOOK_SECRET
            )
            .update(manifest)
            .digest("hex");

        const firmaValida =
            crypto.timingSafeEqual(
                Buffer.from(firmaCalculada),
                Buffer.from(v1)
            );

        if (!firmaValida) {

            console.log("❌ Firma de Mercado Pago inválida.");

            return res.status(401).json({
                mensaje: "Firma inválida."
            });

        }

        console.log("✅ Firma de Mercado Pago válida.");

        const orden =
            await mercadoPagoService.obtenerOrdenQR(dataId);

        console.log("Estado real de la Order:");
        console.log(orden.status);

        console.log("Referencia:");
        console.log(orden.external_reference);

        /*
         * Por ahora solamente verificamos
         * que el webhook funciona.
         */

        return res.status(200).json({
            recibido: true,
            orden: orden.id,
            estado: orden.status
        });

    } catch (error) {

        console.error(
            "Error procesando webhook:",
            error
        );

        return res.status(500).json({
            mensaje: "Error procesando webhook."
        });

    }
};

// Exportación de funciones

module.exports = {
    crearQR,
    obtenerEstadoQR,
    webhook
};