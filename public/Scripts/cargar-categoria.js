// Cargar categoría

// Importación de función de "getUsuario()" de "auth.js"

import { getUsuario } from "./auth.js";

// Obtención de usuario y verificación de rol

const usuario = getUsuario();

if (!usuario || usuario.rol !== "admin") {
    window.location.replace("index.html");
    throw new Error("Acceso denegado");
}

// Obtención de elementos del DOM

const formCategoria = document.getElementById("form-carga-categoria");
const inputNombre = document.getElementById("input-ca-nombre");

// Función de carga de nueva categoría

formCategoria.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nombreCategoria = inputNombre.value;

    try {

        const respuesta = await fetch("https://vibe-n9dy.onrender.com/categorias", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombreCategoria
            })
        });

        const data = await respuesta.json();

        console.log(data);

        inputNombre.value = "";

        cargarCategorias();

    } catch(error) {

        console.log("Error al cargar categoría:", error);

    }

});