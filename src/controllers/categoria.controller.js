// Controlador de Categoria

const categoriaService = require("../services/categoria.service");

// Función para obtener categorias

const getCategorias = async (req,res)=>{

    try {

        const categorias = await categoriaService.listarCategorias();

        res.json(categorias);

    } catch(error){

            console.log(error);

            res.status(500).json({
                error: error.message
            });

    }

};

// Función para crear una categoria

const cargarCategoria = async (req, res) => {

    try {

        const { nombreCategoria } = req.body;

        const categoria = await categoriaService.cargarCategorias(nombreCategoria);

        res.status(201).json({
            mensaje: "Categoría creada correctamente",
            categoria
        });

    } catch(error) {

            console.log(error);

            res.status(500).json({
                error: error.message
            });
    }

};

// Función para obtener una categoria

const getCategoria = async (req,res)=>{

    try {

        const id = req.params.id;

        const categoria = await categoriaService.listarCategoria(id);

        res.json(categoria);

    } catch(error){

            console.log(error);

            res.status(500).json({
                error: error.message
            });

    }

};

// Función para eliminar categoría

const borrarCategoria = async (req, res) => {

    try {

        const id = req.params.id;

        const categoria =
            await categoriaService.borrarCategoria(id);

        res.json({
            mensaje: "Categoría eliminada correctamente",
            categoria
        });

    } catch (error) {

        console.log(error);

        if (error.status === 409) {

            return res.status(409).json({
                mensaje: error.message
            });

        }

        res.status(500).json({
            error: error.message
        });

    }

};

// Exportación de Funciones

module.exports = {
    getCategorias,
    cargarCategoria,
    getCategoria,
    borrarCategoria
};