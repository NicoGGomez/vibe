const categoriaService = require("../services/categoria.service");


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


module.exports = {
    getCategorias,
    cargarCategoria
};