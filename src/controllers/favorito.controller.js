// Controlador de Favoritos

const favoritoService = require("../services/favorito.service");


// ==========================
// AGREGAR FAVORITO
// ==========================

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


// ==========================
// QUITAR FAVORITO
// ==========================

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


// ==========================
// VERIFICAR FAVORITO
// ==========================

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


// ==========================
// OBTENER FAVORITOS
// ==========================

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


// ==========================
// EXPORTACIÓN
// ==========================

module.exports = {
    agregarFavorito,
    quitarFavorito,
    esFavorito,
    obtenerFavoritos
};