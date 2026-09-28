
const mercadoPagoService = require("../services/mercadoPago.service");
const pedidoService = require("../services/pedido.service");
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


        // ==========================================
        // 1. VALIDAR DATOS DEL WEBHOOK
        // ==========================================

        if (!signature || !requestId || !dataId) {

            console.log("Webhook sin datos suficientes.");

            return res.status(400).json({
                mensaje: "Datos del webhook incompletos."
            });

        }


        // ==========================================
        // 2. EXTRAER FIRMA
        // ==========================================

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


        // ==========================================
        // 3. CREAR MANIFEST
        // ==========================================

        const manifest =
            `id:${dataId};` +
            `request-id:${requestId};` +
            `ts:${ts};`;


        console.log("Manifest:", manifest);
        console.log(
            "Secret configurado:",
            !!process.env.MP_WEBHOOK_SECRET
        );


        // ==========================================
        // 4. VALIDAR FIRMA
        // ==========================================

        console.log("=================================");
        console.log("DEBUG FIRMA WEBHOOK");
        console.log("=================================");

        console.log("dataId:", dataId);
        console.log("requestId:", requestId);
        console.log("ts:", ts);
        console.log("v1 recibido:", v1);
        console.log("manifest:", manifest);

        const firmaCalculadaDebug = crypto
            .createHmac(
                "sha256",
                process.env.MP_WEBHOOK_SECRET
            )
            .update(manifest)
            .digest("hex");

        console.log(
            "firma calculada:",
            firmaCalculadaDebug
        );

        console.log(
            "firma recibida:",
            v1
        );

        console.log(
            "¿coinciden?:",
            firmaCalculadaDebug === v1
        );

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

            console.log(
                "❌ Firma de Mercado Pago inválida."
            );

            return res.status(401).json({
                mensaje: "Firma inválida."
            });

        }


        console.log(
            "✅ Firma de Mercado Pago válida."
        );


        // ==========================================
        // 5. CONSULTAR ORDER REAL
        // ==========================================

        const orden =
            await mercadoPagoService.obtenerOrdenQR(
                dataId
            );


        console.log(
            "Estado real de la Order:",
            orden.status
        );

        console.log(
            "Detalle:",
            orden.status_detail
        );

        console.log(
            "Referencia:",
            orden.external_reference
        );

        console.log(
            "Monto Mercado Pago:",
            orden.total_amount
        );


        // ==========================================
        // 6. VERIFICAR ESTADO DEL PAGO
        // ==========================================

        if (orden.status !== "processed") {

            console.log(
                "La Order todavía no está procesada."
            );

            return res.status(200).json({
                recibido: true,
                orden: orden.id,
                estado: orden.status,
                procesado: false
            });

        }


        // ==========================================
        // 7. OBTENER REFERENCIA DEL PEDIDO
        // ==========================================

        const referenciaPago =
            orden.external_reference;


        if (!referenciaPago) {

            console.log(
                "La Order no tiene external_reference."
            );

            return res.status(400).json({
                mensaje:
                    "La Order no tiene referencia de pago."
            });

        }


        // ==========================================
        // 8. BUSCAR PEDIDO LOCAL
        // ==========================================

        const pedido =
            await pedidoModel.obtenerPedidoPorReferenciaPago(
                referenciaPago
            );


        if (!pedido) {

            console.log(
                "No existe un pedido con esa referencia."
            );

            return res.status(404).json({
                mensaje: "Pedido no encontrado."
            });

        }


        console.log(
            "Pedido encontrado:",
            pedido.id_pedido
        );


        // ==========================================
        // 9. VERIFICAR MONTO
        // ==========================================

        const montoMercadoPago =
            Number(orden.total_amount);

        const montoPedido =
            Number(pedido.total);


        console.log(
            "Monto pedido:",
            montoPedido
        );

        console.log(
            "Monto Mercado Pago:",
            montoMercadoPago
        );


        if (montoMercadoPago !== montoPedido) {

            console.log(
                "❌ El monto no coincide."
            );

            return res.status(400).json({
                mensaje:
                    "El monto del pago no coincide con el pedido."
            });

        }


        // ==========================================
        // 10. PROCESAR PEDIDO
        // ==========================================

        const resultado =
            await pedidoService.procesarPagoAprobado(
                referenciaPago
            );


        console.log("=================================");
        console.log("PEDIDO PROCESADO");
        console.log("=================================");

        console.log(
            "Pedido:",
            resultado.pedido.id_pedido
        );

        console.log(
            "Estado:",
            resultado.pedido.estado
        );

        console.log(
            "Ya estaba procesado:",
            resultado.yaProcesado
        );


        // ==========================================
        // 11. RESPUESTA
        // ==========================================

        return res.status(200).json({

            recibido: true,

            orden: orden.id,

            estado: orden.status,

            pedido: resultado.pedido.id_pedido,

            estado_pedido:
                resultado.pedido.estado,

            ya_procesado:
                resultado.yaProcesado

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