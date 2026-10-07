// Productos

// Importación de función de "getUsuario()" de "auth.js"
// Importación de función de "mostrarCarga()" de "carga.js"        

import { getUsuario } from "./auth.js";
import { mostrarCarga } from "./carga.js";
import { mostrarError } from "./mostrarInfo.js";

// Instansiación de variables y constantes

const parametros = new URLSearchParams(window.location.search);
const usuario = getUsuario();
const esAdmin = usuario?.rol === "admin";

// Obtención de elementos del dom 

const categoriaSeleccionada = parametros.get("categoria");
const contenedor = document.getElementById("lista-productos");
const contenedorCards = document.getElementById("lista-cards-productos");

// Función para obtener los productos y agregarlos a un contenedor del DOM 

const cargarProductos = async () => {
    mostrarCarga(contenedorCards, contenedor);

    try {

        const respuesta = await fetch("https://vibe-n9dy.onrender.com/productos");
        const productos = await respuesta.json();

        let productosFiltrados = productos;

        if (categoriaSeleccionada) {
            productosFiltrados = productos.filter(producto =>
                producto.id_categoria == categoriaSeleccionada
            );
        }

        productosFiltrados.sort((a, b) => {
            return (a.stock === 0) - (b.stock === 0);
        });

        if (contenedorCards) contenedorCards.innerHTML = "";
        if (contenedor) contenedor.innerHTML = "";

        productosFiltrados.forEach(producto => {

            const botonEliminar = esAdmin ? `<button class="btn-eliminar" data-id="${producto.id_producto}">✖</button>` : "";

            if (contenedorCards) {

            contenedorCards.innerHTML += `
                <div class="card-wrapper">
                    ${botonEliminar}
                    <card-comp
                        data-id="${producto.id_producto}"
                        imagen="${producto.imagen_principal}"
                        nombre="${producto.nombre}"
                        precio="${producto.precio}"
                        stock="${producto.stock}">
                    </card-comp>
                </div>
            `;
            }

            if (contenedor) {
                contenedor.innerHTML += `
                    <producto-comp
                        data-id="${producto.id_producto}"
                        nombre="${producto.nombre}"
                        precio="${producto.precio}"
                        descripcion="${producto.descripcion}"
                        imagen="${producto.imagen_principal}"
                        imagenExUno="${producto.imagen_extra_uno ?? ""}"
                        imagenExDos="${producto.imagen_extra_dos ?? ""}"
                        imagenExTres="${producto.imagen_extra_tres ?? ""}"
                        stock="${producto.stock}">
                    </producto-comp>
                `;
            }

        });

    } catch (error) {
        console.log(error);
        mostrarError("No se pudieron cargar los productos.");
    }

};

cargarProductos();

// Función para eliminar un producto 

document.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("btn-eliminar")) return;

    const id = e.target.dataset.id;

    if (!confirm("¿Eliminar este producto?")) return;

    const token = localStorage.getItem("token");

    try {
        const respuesta = await fetch(`https://vibe-n9dy.onrender.com/productos/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await respuesta.json().catch(() => null);

        console.log("DELETE status:", respuesta.status);
        console.log("DELETE respuesta:", data);

        if (!respuesta.ok) {
            throw new Error(data?.error || data?.mensaje || "No se pudo eliminar");
        }

        await cargarProductos();

    } catch (error) {
        console.error(error);
        mostrarError("Error al eliminar el producto.");
    }
});
