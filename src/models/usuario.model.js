const db = require("../config/database");
const bcrypt = require("bcrypt");

const obtenerUsuarios = async () => {

    const resultado = await db.query(
        "SELECT * FROM usuario"
    );

    return resultado.rows;
};

const cargarUsuario = async (nombreUsuario, apellidoUsuario, emailUsuario, passwordUsuario) => {

    const hash = await bcrypt.hash(passwordUsuario, 10);

    const resultado = await db.query(
        `INSERT INTO usuario
        (
            nombre,
            apellido,
            email,
            contrasena
        )
        VALUES
        ($1,$2,$3,$4)
        RETURNING id_usuario, nombre, apellido, email, rol
        `,
        [nombreUsuario, apellidoUsuario, emailUsuario, hash]
    );

    return resultado.rows[0];
};

module.exports = {
    obtenerUsuarios,
    cargarUsuario
};