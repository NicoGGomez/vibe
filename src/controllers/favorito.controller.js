// Controlador de Favoritos

// Importación de clases

const favoritoService = require("../services/favorito.service");

// Función para agregar a favoritos un producto

const agregarFavorito = async (req, res) => {

    try {

        const idUsuario = req.usuario.id;
        const { id_producto } = req.body;

        await favoritoService.agregarFavorito(
            idUsuario,
            id_producto
        );

        res.status(201).json({
            mensaje: "Producto agregado a favoritos"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }
};

// Función para quitar de favoritos un producto

const quitarFavorito = async (req, res) => {

    try {

        const idUsuario = req.usuario.id;
        const idProducto = req.params.id;

        await favoritoService.quitarFavorito(
            idUsuario,
            idProducto
        );

        res.status(200).json({
            mensaje: "Producto eliminado de favoritos"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }
};

// Función para verificar que un producto esta en favoritos

const esFavorito = async (req, res) => {

    try {

        const idUsuario = req.usuario.id;
        const idProducto = req.params.id;

        const favorito = await favoritoService.esFavorito(
            idUsuario,
            idProducto
        );

        res.status(200).json({
            favorito
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }
};

// Función para obtener productos en favoritos

const obtenerFavoritos = async (req, res) => {

    try {

        const idUsuario = req.usuario.id;

        const favoritos =
            await favoritoService.obtenerFavoritos(idUsuario);

        res.status(200).json(favoritos);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }
};

// Función para que devuelva los productos mas solicitados

const obtenerMasSolicitados = async (res) => {

    try {

        const productos =
            await favoritoService.obtenerMasSolicitados();

        res.status(200).json(productos);

    } catch (error) {

        console.error(
            "Error obteniendo productos más solicitados:",
            error
        );

        res.status(500).json({
            mensaje: error.message
        });

    }
};

// Exportación de Funciones

module.exports = {
    agregarFavorito,
    quitarFavorito,
    esFavorito,
    obtenerFavoritos,
    obtenerMasSolicitados
};  