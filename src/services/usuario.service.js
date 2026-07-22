const usuarioModel = require("../models/usuario.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const listarUsuarios = async () => {
    return await usuarioModel.obtenerUsuarios();
};

const cargarUsuario = async (nombreUsuario, apellidoUsuario, emailUsuario, passwordUsuario) => {

    return await usuarioModel.cargarUsuario(nombreUsuario, apellidoUsuario, emailUsuario, passwordUsuario);

}

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

module.exports = {
    listarUsuarios,
    cargarUsuario,
    loguearUsuario
};