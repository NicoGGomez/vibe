// Servicio de Producto

// Importación de clases

const productoModel = require("../models/producto.model");

// Función para obtener todos los productos 

const listarProductos = async () => {
    return await productoModel.obtenerProductos();
}

// Función para obtener un producto por ID

const listarProducto = async (id) => {
    return await productoModel.obtenerProducto(id);
}

// Función para obtener productos por categoría

const listarProductoPorCategoria = async (id) => {
    return await productoModel.obtenerProductoPorCategoria(id);
}

// Función para cargar un producto

const cargarProductos = async (nombre, precio, descr, imgP, img1, img2, img3, sttock, categoria) => {
    return await productoModel.cargarProductos(nombre, precio, descr, imgP, img1, img2, img3, sttock, categoria);
}

// Función para eliminar un producto

const eliminarProducto = async (id) => {
    return await productoModel.eliminarProducto(id);
}

// Exportación de funciones

module.exports = {
    listarProducto,
    listarProductos,
    cargarProductos,
    eliminarProducto,
    listarProductoPorCategoria
};