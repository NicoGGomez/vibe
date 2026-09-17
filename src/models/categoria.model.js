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

// Exportación de funciones

module.exports = {
    obtenerCategorias,
    cargarCategorias,
    obtenerCategoria
};