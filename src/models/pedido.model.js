// Model de Pedido

// Importación de la DB

const db = require("../config/database");

// Función para obtener los productos del carrito de un usuario

const obtenerProductosCarrito = async (idUsuario) => {

    const resultado = await db.query(
        `SELECT
            cp.cantidad,
            p.id_producto,
            p.precio,
            p.stock
        FROM carrito c
        JOIN carrito_producto cp
            ON c.id_carrito = cp.id_carrito
        JOIN producto p
            ON cp.id_producto = p.id_producto
        WHERE c.id_usuario = $1`,
        [idUsuario]
    );

    return resultado.rows;
};

// Función para obtener un pedido perteneciente a un usuario

const obtenerPedidoPorIdUsuario = async (idPedido, idUsuario) => {

    const resultado = await db.query(
        `SELECT *
         FROM pedido
         WHERE id_pedido = $1
         AND id_usuario = $2`,
        [idPedido, idUsuario]
    );

    return resultado.rows[0];
};

// Crear un pedido

const crearPedido = async ({
    idUsuario,
    fecha,
    estado,
    total,
    tipoEntrega,
    direccion,
    ciudad,
    codigoPostal,
    nombreApellido,
    telefono,
    metodoPago,
    referenciaPago
}) => {

    const resultado = await db.query(
        `INSERT INTO pedido (
            fecha,
            estado,
            total,
            id_usuario,
            tipo_entrega,
            direccion,
            ciudad,
            codigo_postal,
            nombre_apellido,
            telefono,
            metodo_pago,
            referencia_pago
        )
        VALUES (
            $1, $2, $3, $4, $5, $6,
            $7, $8, $9, $10, $11, $12
        )
        RETURNING *`,
        [
            fecha,
            estado,
            total,
            idUsuario,
            tipoEntrega,
            direccion,
            ciudad,
            codigoPostal,
            nombreApellido,
            telefono,
            metodoPago,
            referenciaPago
        ]
    );

    return resultado.rows[0];
};

// Función para crear un producto dentro del pedido

const crearPedidoProducto = async ({
    cantidad,
    precioUnidad,
    idProducto,
    idPedido
}) => {

    const resultado = await db.query(
        `INSERT INTO pedido_producto (
            cantidad,
            precio_unidad,
            id_producto,
            id_pedido
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [
            cantidad,
            precioUnidad,
            idProducto,
            idPedido
        ]
    );

    return resultado.rows[0];
};

// Función para eliminar todos los productos del carrito

const vaciarCarrito = async (idUsuario) => {

    await db.query(
        `DELETE FROM carrito_producto
         WHERE id_carrito = (
             SELECT id_carrito
             FROM carrito
             WHERE id_usuario = $1
         )`,
        [idUsuario]
    );
};

// Función para obtener un pedido por la referencia de pago

const obtenerPedidoPorReferenciaPago = async (referenciaPago) => {

    const resultado = await db.query(
        `SELECT *
         FROM pedido
         WHERE referencia_pago = $1`,
        [referenciaPago]
    );

    return resultado.rows[0];
};

// Exportación de Funciones

module.exports = {
    obtenerProductosCarrito,
    crearPedido,
    crearPedidoProducto,
    vaciarCarrito,
    obtenerPedidoPorIdUsuario,
    obtenerPedidoPorReferenciaPago
};