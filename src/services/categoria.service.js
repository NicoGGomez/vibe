const categoriaModel = require("../models/categoria.model");


const listarCategorias = async () => {
    return await categoriaModel.obtenerCategorias();
}

const cargarCategorias = async (nombreCategoria) => {
    return await categoriaModel.cargarCategorias(nombreCategoria);
}

module.exports = {
    listarCategorias,
    cargarCategorias
};