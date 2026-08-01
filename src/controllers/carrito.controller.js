const agregarProductoCarrito = async (req, res) => {

    try {

        const idUsuario = req.usuario.id_usuario;
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
        res.status(500).json(error.message);
    }

};

const getProductosCarrito = async (req, res) => {

    try {

        const idUsuario = req.usuario.id_usuario;

        const productos = await carritoService.getProductosCarrito(idUsuario);

        res.status(200).json(productos);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

module.exports = {
    agregarProductoCarrito,
    getProductosCarrito
};
