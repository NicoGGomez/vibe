const productoService = require("../services/producto.service");
const supabase = require("../config/supabase");

const subirImagen = async (archivo) => {

    if (!archivo) return null;

    const nombreArchivo = `${Date.now()}-${archivo.originalname}`;

    const { error } = await supabase.storage
        .from("Productos")
        .upload(nombreArchivo, archivo.buffer, {
            contentType: archivo.mimetype
        });

    if (error) throw error;

    const { data } = supabase.storage
        .from("Productos")
        .getPublicUrl(nombreArchivo);

    return data.publicUrl;
};

const getProductos = async (req,res)=>{

    try {

        const productos = await productoService.listarProductos();

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
            stockProducto,
            categoriaProducto
        } = req.body;

        const imagenPrincipal = req.files.imagenPrincipal?.[0];
        const imagenExtraUno = req.files.imagenExtraUno?.[0];
        const imagenExtraDos = req.files.imagenExtraDos?.[0];
        const imagenExtraTres = req.files.imagenExtraTres?.[0];

        const urlPrincipal = await subirImagen(imagenPrincipal);
        const urlExtraUno = await subirImagen(imagenExtraUno);
        const urlExtraDos = await subirImagen(imagenExtraDos);
        const urlExtraTres = await subirImagen(imagenExtraTres);

        const producto = await productoService.cargarProductos(
            nombreProducto,
            precioProducto,
            descrProducto,
            urlPrincipal,
            urlExtraUno,
            urlExtraDos,
            urlExtraTres,
            stockProducto,
            categoriaProducto
        );

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