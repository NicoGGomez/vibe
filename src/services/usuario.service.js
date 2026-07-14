const usuarioModel = require("../models/usuario.model");


const listarUsuarios = async () => {
    return await usuarioModel.obtenerUsuarios();
};


module.exports = {
    listarUsuarios
};