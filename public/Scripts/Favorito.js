import { getToken, getUsuario } from "./auth.js";


// ==========================
// AGREGAR FAVORITO
// ==========================

export async function agregarFavorito(idProducto) {

    const usuario = getUsuario();
    const token = getToken();

    if (!usuario || !token) {
        alert("Tenés que iniciar sesión para agregar favoritos.");
        return false;
    }

    console.log("Agregar favorito:", idProducto);

    // Acá después hacemos el POST al backend

    return true;
}


// ==========================
// QUITAR FAVORITO
// ==========================

export async function quitarFavorito(idProducto) {

    const usuario = getUsuario();
    const token = getToken();

    if (!usuario || !token) {
        return false;
    }

    console.log("Quitar favorito:", idProducto);

    // Acá después hacemos el DELETE al backend

    return true;
}


// ==========================
// VERIFICAR SI ES FAVORITO
// ==========================

export async function esFavorito(idProducto) {

    const usuario = getUsuario();
    const token = getToken();

    if (!usuario || !token) {
        return false;
    }

    console.log("Verificar favorito:", idProducto);

    // Acá después hacemos el GET al backend

    return false;
}