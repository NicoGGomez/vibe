// Servicios de Carrito

// Importación de clases

const carritoModel = require("../models/carrito.model");
const productoModel = require("../models/producto.model")

// Función para agregar un producto 

const agregarProducto = async (idUsuario, idProducto, cantidad) => {

    let carrito = await carritoModel.obtenerCarritoPorUsuario(idUsuario);

    if (!carrito) {
        carrito = await carritoModel.crearCarrito(idUsuario);
    }

    const productoCarrito = await carritoModel.obtenerProductoCarrito(
        carrito.id_carrito,
        idProducto
    );

    // Obtener el producto para conocer su stock
    const producto = await productoModel.obtenerProducto(idProducto);

    if (!producto) {
        throw new Error("Producto no encontrado.");
    }

    const cantidadActual = productoCarrito ? productoCarrito.cantidad : 0;

    if (cantidadActual + cantidad > producto.stock) {
        throw new Error("No hay stock disponible del producto.");
    }

    if (productoCarrito) {
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

// Función para obtener los productos de un carrito

const getProductosCarrito = async (idUsuario) => {
    return await carritoModel.getProductosCarrito(idUsuario);
};

// Función para eliminar un producto de un carrito

const eliminarProductoCarrito = async (idUsuario, idProducto) => {
    const carrito = await carritoModel.obtenerCarritoPorUsuario(idUsuario);

    if (!carrito) {
        throw new Error("Carrito no encontrado");
    }

    const filasEliminadas = await carritoModel.eliminarProducto(
        carrito.id_carrito,
        idProducto
    );

    if (filasEliminadas === 0) {
        throw new Error("El producto no se encuentra en el carrito.");
    }
}

// Exportación de funciones

module.exports = {
    agregarProducto,
    getProductosCarrito,
    eliminarProductoCarrito
};