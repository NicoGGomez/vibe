// Servicios de Favoritos

// Importación del modelo

const favoritoModel = require("../models/favorito.model");


// ==========================
// AGREGAR FAVORITO
// ==========================

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


// ==========================
// QUITAR FAVORITO
// ==========================

const quitarFavorito = async (idUsuario, idProducto) => {

    const eliminado = await favoritoModel.quitarFavorito(
        idUsuario,
        idProducto
    );

    if (eliminado === 0) {
        throw new Error("El producto no está en favoritos.");
    }
};


// ==========================
// VERIFICAR FAVORITO
// ==========================

const esFavorito = async (idUsuario, idProducto) => {

    return await favoritoModel.esFavorito(
        idUsuario,
        idProducto
    );
};


// ==========================
// OBTENER FAVORITOS
// ==========================

const obtenerFavoritos = async (idUsuario) => {

    return await favoritoModel.obtenerFavoritos(
        idUsuario
    );
};

// ==========================
// LO MÁS SOLICITADO
// ==========================

const obtenerMasSolicitados = async () => {

    return await favoritoModel.obtenerMasSolicitados();

};

// ==========================
// EXPORTACIÓN
// ==========================

module.exports = {
    agregarFavorito,
    quitarFavorito,
    esFavorito,
    obtenerFavoritos,
    obtenerMasSolicitados
};