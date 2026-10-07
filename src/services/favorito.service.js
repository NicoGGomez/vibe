// Servicios de Favoritos

// Importación del modelo

const favoritoModel = require("../models/favorito.model");

// Función para agregar a favoritos un producto

const agregarFavorito = async (idUsuario, idProducto) => {

    const existe = await favoritoModel.esFavorito(
        idUsuario,
        idProducto
    );

    if (existe) {
        throw new Error("El producto ya está en favoritos.");
    }

    return await favoritoModel.agregarFavorito(
        idUsuario,
        idProducto
    );
};

// Función para quitar de favoritos un producto

const quitarFavorito = async (idUsuario, idProducto) => {

    const eliminado = await favoritoModel.quitarFavorito(
        idUsuario,
        idProducto
    );

    if (eliminado === 0) {
        throw new Error("El producto no está en favoritos.");
    }
};

// Función para verificar que un producto esta en favoritos

const esFavorito = async (idUsuario, idProducto) => {

    return await favoritoModel.esFavorito(
        idUsuario,
        idProducto
    );
};

// Función para obtener productos en favoritos

const obtenerFavoritos = async (idUsuario) => {

    return await favoritoModel.obtenerFavoritos(
        idUsuario
    );
};

// Función para que devuelva los productos mas solicitados

const obtenerMasSolicitados = async () => {

    return await favoritoModel.obtenerMasSolicitados();

};

// Exportación de Funciones

module.exports = {
    agregarFavorito,
    quitarFavorito,
    esFavorito,
    obtenerFavoritos,
    obtenerMasSolicitados
};