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

const formCategoria =
    document.getElementById("form-carga-categoria");

const inputNombre =
    document.getElementById("input-ca-nombre");

const listaCategorias =
    document.getElementById("lista-categorias");

// Función para cargar nueva categoría

formCategoria.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nombreCategoria =
        inputNombre.value.trim();

    if (!nombreCategoria) return;

    try {

        const respuesta = await fetch(
            "https://vibe-n9dy.onrender.com/categorias",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    nombreCategoria
                })
            }
        );

        const data = await respuesta.json();

        console.log(data);

        inputNombre.value = "";

        cargarCategorias();

    } catch (error) {

        console.log(
            "Error al cargar categoría:",
            error
        );

    }

});

// Función para mostrar las categorías 

const cargarCategorias = async () => {

    try {

        const respuesta = await fetch(
            "https://vibe-n9dy.onrender.com/categorias"
        );

        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}`);
        }

        const categorias = await respuesta.json();

        if (!Array.isArray(categorias)) {
            console.log(categorias);
            return;
        }

        listaCategorias.innerHTML = "";

        categorias.forEach(categoria => {

            listaCategorias.innerHTML += `
                <li>

                    <span>
                        ${categoria.nombre}
                    </span>

                    <button
                        type="button"
                        class="btn-eliminar-categoria"
                        data-id="${categoria.id_categoria}"
                        title="Eliminar categoría">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </li>
            `;

        });

    } catch (error) {

        console.log(
            "Error al cargar categorías:",
            error
        );

    }

};

// Función para eliminar una categoría

const eliminarCategoria = async (idCategoria) => {

    const confirmar = confirm(
        "¿Seguro que querés eliminar esta categoría?"
    );

    if (!confirmar) return;

    try {

        const respuesta = await fetch(
            `https://vibe-n9dy.onrender.com/categorias/${idCategoria}`,
            {
                method: "DELETE"
            }
        );

        const data = await respuesta.json();

        console.log(data);

        if (!respuesta.ok) {

            alert(
                data.mensaje ||
                "No se pudo eliminar la categoría."
            );

            return;
        }

        cargarCategorias();

    } catch (error) {

        console.log(
            "Error al eliminar categoría:",
            error
        );

        alert(
            "Ocurrió un error al eliminar la categoría."
        );

    }

};


// =========================================
// EVENTO DEL BOTÓN ELIMINAR
// =========================================

listaCategorias.addEventListener("click", (e) => {

    const boton =
        e.target.closest(".btn-eliminar-categoria");

    if (!boton) return;

    const idCategoria =
        boton.dataset.id;

    eliminarCategoria(idCategoria);

});


// =========================================
// CARGAR AL INICIAR
// =========================================

cargarCategorias();