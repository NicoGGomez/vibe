// Controlador de Pedido

// Importación de clases

const pedidoService = require("../services/pedido.service");

// Función para crear un pedido a partir del carrito

const crearPedido = async (req, res) => {

    try {

        const idUsuario = req.usuario.id;

        const {
            tipo_entrega,
            direccion,
            ciudad,
            codigo_postal,
            nombre_apellido,
            telefono,
            metodo_pago,
            precio_envio
        } = req.body;


        // Validaciones básicas

        if (!tipo_entrega) {
            return res.status(400).json({
                mensaje: "La forma de entrega es obligatoria."
            });
        }

        if (!nombre_apellido) {
            return res.status(400).json({
                mensaje: "El nombre y apellido son obligatorios."
            });
        }

        if (!telefono) {
            return res.status(400).json({
                mensaje: "El teléfono es obligatorio."
            });
        }


        // Si es envío, necesitamos los datos de dirección

        if (tipo_entrega === "envio") {

            if (!direccion || !ciudad || !codigo_postal) {

                return res.status(400).json({
                    mensaje: "Los datos de envío son obligatorios."
                });

            }

        }


        // Crear pedido

        const resultado = await pedidoService.crearPedido({

            idUsuario,

            tipoEntrega: tipo_entrega,

            direccion,

            ciudad,

            codigoPostal: codigo_postal,

            nombreApellido: nombre_apellido,

            telefono,

            metodoPago: metodo_pago || "mercado_pago",

            precioEnvio: precio_envio || 0

        });


        res.status(201).json({

            mensaje: "Pedido creado correctamente.",

            pedido: {
                id_pedido: resultado.pedido.id_pedido,
                estado: resultado.pedido.estado,
                total: resultado.pedido.total,
                referencia_pago: resultado.pedido.referencia_pago
            }

        });


    } catch (error) {

        console.error("Error al crear pedido:", error);

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Función para obtención de pedidos

const obtenerPedidos = async (req, res) => {

    try {

        const idUsuario = req.usuario.id;

        const pedidos =
            await pedidoService.obtenerPedidosUsuario(idUsuario);

        res.status(200).json(pedidos);

    } catch (error) {

        console.error("Error al obtener pedidos:", error);

        res.status(500).json({
            mensaje: "No se pudieron obtener los pedidos."
        });

    }

};

// Función para que el admin reciba todos los pedidos

const obtenerPedidosAdmin = async (req, res) => {

    try {

        if (req.usuario.rol !== "admin") {
            return res.status(403).json({
                mensaje: "No tenés permisos para realizar esta acción."
            });
        }

        const pedidos =
            await pedidoService.obtenerPedidosAdmin();

        res.status(200).json(pedidos);

    } catch (error) {

        console.error(
            "Error al obtener pedidos del admin:",
            error
        );

        res.status(500).json({
            mensaje: "No se pudieron obtener los pedidos."
        });
    }
};

// Función para marcar un pedido como enviado

const marcarPedidoEnviado = async (req, res) => {

    try {

        if (req.usuario.rol !== "admin") {
            return res.status(403).json({
                mensaje: "No tenés permisos para realizar esta acción."
            });
        }

        const { id } = req.params;

        const pedido =
            await pedidoService.marcarPedidoEnviado(id);

        res.status(200).json({
            mensaje: "Pedido marcado como enviado.",
            pedido
        });

    } catch (error) {

        console.error(
            "Error al marcar pedido como enviado:",
            error
        );

        res.status(400).json({
            mensaje: error.message
        });
    }
};

// Exportación de funciones

module.exports = {
    crearPedido,
    obtenerPedidos,
    obtenerPedidosAdmin,
    marcarPedidoEnviado
};