const db = require("../config/database");


const obtenerCategorias = async () => {

    const resultado = await db.query(
        "SELECT * FROM categoria"
    );

    return resultado.rows;
};

const cargarCategorias = async (nombreCategoria) => {
    const resultado = await db.query(
        `INSERT INTO categoria (nombre)
         VALUES ($1)
         RETURNING *`,
        [nombreCategoria]
    );

    return resultado.rows[0];
};


module.exports = {
    obtenerCategorias,
    cargarCategorias
};