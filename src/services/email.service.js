
const emailjs = require("@emailjs/nodejs");
const db = require("../config/database");

const enviarAvisoCompra = async (pedido, productos) => {
    // Obtener el correo del cliente
    const resultado = await db.query(
        `SELECT email
         FROM usuario
         WHERE id_usuario = $1`,
        [pedido.id_usuario]
    );

    if (!resultado.rows.length) {
        throw new Error("No se encontró el email del cliente.");
    }

    const emailCliente = resultado.rows[0].email;

    const productosTexto = productos.map(producto =>
        `${producto.nombre} x ${producto.cantidad} — ${
            new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS"
            }).format(Number(producto.precio_unidad))
        } c/u`
    ).join("\n");

    const parametros = {
        pedido_id: pedido.id_pedido,
        nombre: pedido.nombre_apellido,
        email: emailCliente,
        tipo_entrega: pedido.tipo_entrega,
        metodo_pago: pedido.metodo_pago,
        productos: productosTexto,
        total: new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS"
        }).format(Number(pedido.total))
    };

    return emailjs.send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ORDEN,
        parametros,
        {
            publicKey: process.env.EMAILJS_PUBLIC_KEY,
            privateKey: process.env.EMAILJS_PRIVATE_KEY
        }
    );
};

module.exports = { enviarAvisoCompra };
