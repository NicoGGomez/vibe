// Controlador de producto 

const productoService = require("../services/producto.service");
const supabase = require("../config/supabase");

// Función para subir imagen de un producto

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

// Función para obtener los productos

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

// Función para obtener un producto por ID

const getProducto = async (req,res)=>{

    try {

        const id = req.params.id;

        const producto = await productoService.listarProducto(id);

        res.json(producto);

    } catch(error){

            console.log(error);

            res.status(500).json({
                error: error.message
            });

    }

};

// Función para obtener todos los productos de una categoría

const getProductoPorCategoria = async (req,res)=>{

    try {

        const id = req.params.id;

        const producto = await productoService.listarProductoPorCategoria(id);

        res.json(producto);

    } catch(error){

            console.log(error);

            res.status(500).json({
                error: error.message
            });

    }

};

// Función para crear un nuevo producto 

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

// Función para eliminar un producto

const eliminarProducto = async (req,res)=>{

    try {

        const id = req.params.id;

        const producto = await productoService.eliminarProducto(id);

        res.json(producto);

    } catch(error){

            console.log(error);

            res.status(500).json({
                error: error.message
            });

    }

};

// Función para actualizar un producto

const actualizarProducto = async (req, res) => {

    try {

        const id = req.params.id;

        const {
            nombre,
            precio,
            descripcion
        } = req.body;

        if (!nombre || precio === undefined || descripcion === undefined) {

            return res.status(400).json({
                error: "Faltan datos del producto"
            });

        }

        if (Number(precio) < 0) {

            return res.status(400).json({
                error: "El precio no puede ser negativo"
            });

        }

        const producto =
            await productoService.actualizarProducto(
                id,
                nombre,
                precio,
                descripcion
            );

        if (!producto) {

            return res.status(404).json({
                error: "Producto no encontrado"
            });

        }

        res.json({
            mensaje: "Producto actualizado correctamente",
            producto
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};

// Función para modificar el stock

const modificarStock = async (req, res) => {

    try {

        const id = req.params.id;

        const { cantidad } = req.body;

        if (cantidad === undefined) {

            return res.status(400).json({
                error: "Debe especificar una cantidad"
            });

        }

        if (!Number.isInteger(Number(cantidad))) {

            return res.status(400).json({
                error: "La cantidad debe ser un número entero"
            });

        }

        const producto =
            await productoService.modificarStock(
                id,
                Number(cantidad)
            );

        if (!producto) {

            return res.status(400).json({
                error: "No se puede modificar el stock o el producto no existe"
            });

        }

        res.json({
            mensaje: "Stock actualizado correctamente",
            producto
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

};

// Exportación de Funciones

module.exports = {
    getProducto,
    getProductos,
    getProductoPorCategoria,
    cargarProducto,
    eliminarProducto,
    actualizarProducto,
    modificarStock
};