const usuarioModel = require("../models/usuario.model");


const listarUsuarios = async () => {
    return await usuarioModel.obtenerUsuarios();
};

const cargarUsuario = async (nombreUsuario, apellidoUsuario, emailUsuario, passwordUsuario) => {

    return await usuarioModel.cargarUsuario(nombreUsuario, apellidoUsuario, emailUsuario, passwordUsuario);

}


module.exports = {
    listarUsuarios,
    cargarUsuario
};