// Modelo de Favoritos

// Importación de la DB

const db = require("../config/database");

// Función para agregar a favoritos un producto

const agregarFavorito = async (idUsuario, idProducto) => {

    const resultado = await db.query(
        `INSERT INTO favorito
        (id_usuario, id_producto)
        VALUES ($1, $2)
        RETURNING *`,
        [idUsuario, idProducto]
    );

    return resultado.rows[0];
};

// Función para quitar de favoritos un producto

const quitarFavorito = async (idUsuario, idProducto) => {

    const resultado = await db.query(
        `DELETE FROM favorito
        WHERE id_usuario = $1
        AND id_producto = $2`,
        [idUsuario, idProducto]
    );

    return resultado.rowCount;
};

// Función para verificar que un producto esta en favoritos

const esFavorito = async (idUsuario, idProducto) => {

    const resultado = await db.query(
        `SELECT *
        FROM favorito
        WHERE id_usuario = $1
        AND id_producto = $2`,
        [idUsuario, idProducto]
    );

    return resultado.rows.length > 0;
};

// Función para obtener productos en favoritos

const obtenerFavoritos = async (idUsuario) => {

    const resultado = await db.query(
        `SELECT
            f.id_favorito,
            p.id_producto,
            p.nombre,
            p.precio,
            p.imagen_principal,
            p.stock,
            p.descripcion
        FROM favorito f
        JOIN producto p
            ON f.id_producto = p.id_producto
        WHERE f.id_usuario = $1`,
        [idUsuario]
    );

    return resultado.rows;
};

// Función para que devuelva los productos mas solicitados

const obtenerMasSolicitados = async () => {

    const resultado = await db.query(
        `SELECT
            p.id_producto,
            p.nombre,
            p.precio,
            p.imagen_principal,
            p.stock,
            p.descripcion,
            COUNT(f.id_favorito) AS cantidad_favoritos
        FROM favorito f
        JOIN producto p
            ON f.id_producto = p.id_producto
        GROUP BY
            p.id_producto,
            p.nombre,
            p.precio,
            p.imagen_principal,
            p.stock,
            p.descripcion
        ORDER BY cantidad_favoritos DESC
        LIMIT 10`
    );

    return resultado.rows;
};

// Exportación de Funciones

module.exports = {
    agregarFavorito,
    quitarFavorito,
    esFavorito,
    obtenerFavoritos,
    obtenerMasSolicitados
};