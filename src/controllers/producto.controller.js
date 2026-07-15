const productoService = require("../services/producto.service");

const getProductos = async (req,res)=>{

    try {

        const productos = await productoService.listarproductos();

        res.json(productos);

    } catch(error){

            console.log(error);

            res.status(500).json({
                error: error.message
            });

    }

};

const cargarProducto = async (req, res) => {

    try {

        const {
            nombreProducto,
            precioProducto,
            descrProducto,
            imgPrinProducto,
            imgEx1Producto,
            imgEx2Producto,
            imgEx3Producto,
            stockProducto,
            categoriaProducto
            } = req.body;


        const producto = await productoService.cargarproductos(nombreProducto, precioProducto, descrProducto, imgPrinProducto, imgEx1Producto, imgEx2Producto, imgEx3Producto, stockProducto, categoriaProducto);

        res.status(201).json({
            mensaje: "Producto creado correctamente",
            producto
        });

    } catch(error) {

            console.log(error);

            res.status(500).json({
                error: error.message
            });
    }

};


module.exports = {
    getProductos,
    cargarProducto
};