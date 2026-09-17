// Servicio de Usuario

// Importaciones

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Importación de clases

const usuarioModel = require("../models/usuario.model");

// Función para obtener todos los usuarios

const listarUsuarios = async () => {
    return await usuarioModel.obtenerUsuarios();
};

// Función para crear un nuevo usuario

const cargarUsuario = async (nombreUsuario, apellidoUsuario, emailUsuario, passwordUsuario) => {

    return await usuarioModel.cargarUsuario(nombreUsuario, apellidoUsuario, emailUsuario, passwordUsuario);

}

// Función para loguear un usuario

const loguearUsuario = async (emailUsuario, passwordUsuario) => {

    // Buscar usuario por email
    const usuario = await usuarioModel.obtenerUsuarioPorEmail(emailUsuario);

    // ¿Existe?
    if (!usuario) {
        throw new Error("Email o contraseña incorrectos.");
    }

    const coincide = await bcrypt.compare(passwordUsuario,usuario.contrasena);

    if (!coincide) {
        throw new Error("Email o contraseña incorrectos.");
    }

    const token = jwt.sign(
        {
            id: usuario.id_usuario,
            rol: usuario.rol
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    const { contrasena, ...usuarioSinPassword } = usuario;

    return {token, usuario: usuarioSinPassword} ;

};

// Exportación de funciones

module.exports = {
    listarUsuarios,
    cargarUsuario,
    loguearUsuario
};