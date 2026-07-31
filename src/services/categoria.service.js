const categoriaModel = require("../models/categoria.model");


const listarCategorias = async () => {
    return await categoriaModel.obtenerCategorias();
}

const listarCategoria = async (id) => {
    return await categoriaModel.obtenerCategoria(id);
}

const cargarCategorias = async (nombreCategoria) => {
    return await categoriaModel.cargarCategorias(nombreCategoria);
}

module.exports = {
    listarCategorias,
    cargarCategorias,
    listarCategoria
};