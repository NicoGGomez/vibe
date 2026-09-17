// Servicios de categoría

// Importación de clases

const categoriaModel = require("../models/categoria.model");

// Función para obtener las categorías

const listarCategorias = async () => {
    return await categoriaModel.obtenerCategorias();
}

// Función para obntener una categoría

const listarCategoria = async (id) => {
    return await categoriaModel.obtenerCategoria(id);
}

// Función para cargar categorías

const cargarCategorias = async (nombreCategoria) => {
    return await categoriaModel.cargarCategorias(nombreCategoria);
}

// Exportación de funciones

module.exports = {
    listarCategorias,
    cargarCategorias,
    listarCategoria
};