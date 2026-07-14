const db = require("../config/database");


const obtenerUsuarios = async () => {

    const resultado = await db.query(
        "SELECT * FROM usuario"
    );

    return resultado.rows;
};


module.exports = {
    obtenerUsuarios
};