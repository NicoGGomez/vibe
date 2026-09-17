// Model de Usuario

// Importación de la BD y hash

const db = require("../config/database");
const bcrypt = require("bcrypt");

// Función para obtener usuarios

const obtenerUsuarios = async () => {

    const resultado = await db.query(
        "SELECT * FROM usuario"
    );

    return resultado.rows;
};

// Función para crear un usuario

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

// Función para obtener un usuario por mail

const obtenerUsuarioPorEmail = async (emailUsuario) => {

    const resultado = await db.query(
        `
        SELECT *
        FROM usuario
        WHERE email = $1;
        `,
        [emailUsuario]
    );

    return resultado.rows[0];
};

// Exportación de funciones

module.exports = {
    obtenerUsuarios,
    cargarUsuario,
    obtenerUsuarioPorEmail
};