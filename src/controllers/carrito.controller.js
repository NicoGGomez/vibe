// Controlador de Carrito

// Importación de clases

const carritoService = require("../services/carrito.service");

// Función para agregar un producto al carrito

const agregarProductoCarrito = async (req, res) => {

    try {

        const idUsuario = req.usuario.id;
        const { id_producto, cantidad } = req.body;

        await carritoService.agregarProducto(
            idUsuario,
            id_producto,
            cantidad
        );

        res.status(201).json({
            mensaje: "Producto agregado"
        });

    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }

};

// Función para obtener los productos del carrito

const getProductosCarrito = async (req, res) => {

    try {

        const idUsuario = req.usuario.id;

        const productos = await carritoService.getProductosCarrito(idUsuario);

        res.status(200).json(productos);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Función para eliminar los productos del carrito

const eliminarProductoCarrito = async (req, res) => {

    try {

        const idUsuario = req.usuario.id;
        const idProducto = req.params.id;

        await carritoService.eliminarProductoCarrito(idUsuario, idProducto)

        res.json({
            mensaje: "Producto eliminado"
        });

    } catch (error) {

        console.log(error);

            res.status(500).json({
                error: error.message
            });

    }

}

// Exportación de Funciones

module.exports = {
    agregarProductoCarrito,
    getProductosCarrito,
    eliminarProductoCarrito
};
