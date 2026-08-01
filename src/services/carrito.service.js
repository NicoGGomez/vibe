const carritoModel = require("../models/carrito.model");

const agregarProducto = async (idUsuario, idProducto, cantidad) => {

    // Buscar el carrito del usuario
    let carrito = await carritoModel.obtenerCarritoPorUsuario(idUsuario);

    // Si no existe, crearlo
    if (!carrito) {
        carrito = await carritoModel.crearCarrito(idUsuario);
    }

    // Verificar si el producto ya está en el carrito
    const producto = await carritoModel.obtenerProductoCarrito(
        carrito.id_carrito,
        idProducto
    );

    if (producto) {
        await carritoModel.aumentarCantidad(
            carrito.id_carrito,
            idProducto,
            cantidad
        );
    } else {
        await carritoModel.agregarProducto(
            carrito.id_carrito,
            idProducto,
            cantidad
        );
    }
};

const getProductosCarrito = async (idUsuario) => {
    return await carritoModel.getProductosCarrito(idUsuario);
};

module.exports = {
    agregarProducto,
    getProductosCarrito
};