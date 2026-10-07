// Favorito

// api de la página

const API_URL = "https://vibe-n9dy.onrender.com/favoritos";

// Importación de función de "getToken(), getUsuario()" de "auth.js"

import { getToken, getUsuario } from "./auth.js";
import { mostrarError } from "./mostrarInfo.js"

// Instanciación de variables y constantes

// Cache de favoritos
let favoritosCache = null;

// guarda el fetch que está en progreso (Importante)
let favoritosPromise = null;

// Función de carga de los productos favoritos

async function cargarFavoritos() {

    const usuario = getUsuario();
    const token = getToken();

    if (!usuario || !token) {
        favoritosCache = new Set();
        return favoritosCache;
    }

    // Si ya tenemos los favoritos cargados
    if (favoritosCache !== null) {
        return favoritosCache;
    }

    // Si ya hay una petición en curso,
    // reutilizamos ESA misma petición
    if (favoritosPromise !== null) {
        return favoritosPromise;
    }

    // Creamos UNA sola petición
    favoritosPromise = fetch(API_URL, {
        method: "GET",

        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(async respuesta => {

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(
                datos.mensaje ||
                datos.error ||
                "No se pudieron obtener los favoritos."
            );
        }

        favoritosCache = new Set(
            datos.map(favorito =>
                Number(favorito.id_producto)
            )
        );

        return favoritosCache;
    })
    .catch(error => {

        console.error("Error al obtener favoritos:", error);

        // Si falla, dejamos el cache como vacío
        favoritosCache = new Set();

        return favoritosCache;

    })
    .finally(() => {

        // La petición terminó
        favoritosPromise = null;
    });

    return favoritosPromise;
}

// Función para agregar productos a favoritos

export async function agregarFavorito(idProducto) {

    const usuario = getUsuario();
    const token = getToken();

    if (!usuario || !token) {
        mostrarError("Tenés que iniciar sesión para agregar favoritos.");
        return false;
    }

    try {

        const respuesta = await fetch(API_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify({
                id_producto: idProducto
            })
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(
                datos.mensaje ||
                datos.error ||
                "No se pudo agregar el producto a favoritos."
            );
        }

        // Actualizamos el cache local
        if (favoritosCache !== null) {
            favoritosCache.add(Number(idProducto));
        }

        return true;

    } catch (error) {

        console.error("Error al agregar favorito:", error);

        mostrarError("Error al agregar favorito");

        return false;
    }
}

// Función para eliminar un producto de favoritos

export async function quitarFavorito(idProducto) {

    const usuario = getUsuario();
    const token = getToken();

    if (!usuario || !token) {
        return false;
    }

    try {

        const respuesta = await fetch(
            `${API_URL}/${idProducto}`,
            {
                method: "DELETE",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(
                datos.mensaje ||
                datos.error ||
                "No se pudo quitar el producto de favoritos."
            );
        }

        // Actualizamos el cache local
        if (favoritosCache !== null) {
            favoritosCache.delete(Number(idProducto));
        }

        return true;

    } catch (error) {

        console.error("Error al quitar favorito:", error);

        mostrarError("Error al quitar favorito");

        return false;
    }
}

// Función para verificar q un producto sea favorito

export async function esFavorito(idProducto) {

    const usuario = getUsuario();
    const token = getToken();

    if (!usuario || !token) {
        return false;
    }

    const favoritos = await cargarFavoritos();

    return favoritos.has(Number(idProducto));
}

// Función para limpiar cache

export function limpiarCacheFavoritos() {

    favoritosCache = null;
    favoritosPromise = null;
}