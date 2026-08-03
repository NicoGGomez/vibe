const db = require("../config/database");

// Buscar el carrito de un usuario
const obtenerCarritoPorUsuario = async (idUsuario) => {

    const resultado = await db.query(
        `SELECT * FROM carrito WHERE id_usuario = $1`,
        [idUsuario]
    );

    return resultado.rows[0];
};

// Crear un carrito para un usuario
const crearCarrito = async (idUsuario) => {

    const resultado = await db.query(
        `INSERT INTO carrito (id_usuario)
         VALUES ($1)
         RETURNING *`,
        [idUsuario]
    );

    return resultado.rows[0];
};

// Buscar si un producto ya está en el carrito
const obtenerProductoCarrito = async (idCarrito, idProducto) => {

    const resultado = await db.query(
        `SELECT *
         FROM carrito_producto
         WHERE id_carrito = $1
         AND id_producto = $2`,
        [idCarrito, idProducto]
    );

    return resultado.rows[0];
};

// Aumentar la cantidad de un producto existente
const aumentarCantidad = async (idCarrito, idProducto, cantidad) => {

    await db.query(
        `UPDATE carrito_producto
         SET cantidad = cantidad + $3
         WHERE id_carrito = $1
         AND id_producto = $2`,
        [idCarrito, idProducto, cantidad]
    );
};

// Agregar un producto nuevo al carrito
const agregarProducto = async (idCarrito, idProducto, cantidad) => {

    await db.query(
        `INSERT INTO carrito_producto
        (cantidad, id_carrito, id_producto)
        VALUES ($1, $2, $3)`,
        [cantidad, idCarrito, idProducto]
    );
};

const getProductosCarrito = async (idUsuario) => {

    const resultado = await db.query(
        `SELECT
            cp.id_carrito_producto,
            cp.cantidad,
            p.id_producto,
            p.nombre,
            p.precio,
            p.imagen_principal
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

const eliminarProducto = async (idCarrito, idProducto) => {

    const resultado = await db.query(
        `DELETE FROM carrito_producto
         WHERE id_carrito = $1
         AND id_producto = $2`,
        [idCarrito, idProducto]
    );

    return resultado.rowCount;
}

module.exports = {
    obtenerCarritoPorUsuario,
    crearCarrito,
    obtenerProductoCarrito,
    aumentarCantidad,
    agregarProducto,
    getProductosCarrito,
    eliminarProducto
};