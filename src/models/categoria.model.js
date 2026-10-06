// Model de Categoría

// Importación de la DB

const db = require("../config/database");

// Función para obtener todas las categorías

const obtenerCategorias = async () => {

    const resultado = await db.query(
        "SELECT * FROM categoria"
    );

    return resultado.rows;
};

// Función para obtener una categoría por ID

const obtenerCategoria = async (id) => {

    const resultado = await db.query(
        "SELECT * FROM categoria WHERE id_categoria = $1",
        [id]
    );

    return resultado.rows[0];
};

// Función para cargar categorías

const cargarCategorias = async (nombreCategoria) => {
    const resultado = await db.query(
        `INSERT INTO categoria (nombre)
         VALUES ($1)
         RETURNING *`,
        [nombreCategoria]
    );

    return resultado.rows[0];
};

// Función para eliminar categoría

const borrarCategoria = async (id) => {

    // Primero verificamos si la categoría tiene productos
    const productos = await db.query(
        `SELECT 1
         FROM producto
         WHERE id_categoria = $1
         LIMIT 1`,
        [id]
    );

    // Si encontramos al menos un producto, no permitimos borrar
    if (productos.rows.length > 0) {

        const error = new Error(
            "No se puede eliminar la categoría porque tiene productos asociados"
        );

        error.status = 409;

        throw error;
    }


    // Si no tiene productos, la eliminamos
    const resultado = await db.query(
        `DELETE FROM categoria
         WHERE id_categoria = $1
         RETURNING *`,
        [id]
    );

    return resultado.rows[0];
};

// Exportación de funciones

module.exports = {
    obtenerCategorias,
    cargarCategorias,
    obtenerCategoria,
    borrarCategoria
};