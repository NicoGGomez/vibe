const productoModel = require("../models/producto.model");


const listarProductos = async () => {
    return await productoModel.obtenerProductos();
}

const listarProducto = async (id) => {
    return await productoModel.obtenerProducto(id);
}

const cargarProductos = async (nombre, precio, descr, imgP, img1, img2, img3, sttock, categoria) => {
    return await productoModel.cargarProductos(nombre, precio, descr, imgP, img1, img2, img3, sttock, categoria);
}

module.exports = {
    listarProducto,
    listarProductos,
    cargarProductos
};