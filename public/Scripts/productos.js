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

const esInicio = Boolean(contenedorCards);
const LIMITE_PRODUCTOS_INICIO = 8;

const buscador = document.getElementById("busqueda-productos");
const mensajeSinResultados = document.getElementById("sin-resultados");

let todosLosProductos = [];

// Función para obtener los productos y agregarlos a un contenedor del DOM 

const cargarProductos = async () => {
    mostrarCarga(contenedorCards, contenedor);

    try {

        const respuesta = await fetch("https://vibe-n9dy.onrender.com/productos");
        
        const productos = await respuesta.json();

        todosLosProductos = productos;

        let productosFiltrados = [...todosLosProductos];    

        if (categoriaSeleccionada) {
            productosFiltrados = productos.filter(producto =>
                producto.id_categoria == categoriaSeleccionada
            );
        }

        productosFiltrados.sort((a, b) => {
            return (a.stock === 0) - (b.stock === 0);
        });

        if (esInicio) {
            productosFiltrados = productosFiltrados.slice(
                0,
                LIMITE_PRODUCTOS_INICIO
            );
        }

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
    const boton = e.target.closest(".btn-eliminar");

    if (!boton) return;

    const id = boton.dataset.id;

    if (!confirm("¿Eliminar o retirar este producto del catálogo?")) {
        return;
    }

    const token = localStorage.getItem("token");

    try {
        const respuesta = await fetch(
            `https://vibe-n9dy.onrender.com/productos/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(data.error || "No se pudo eliminar el producto.");
        }

        const tarjeta = boton.closest(".card-wrapper");

        if (tarjeta) {
            tarjeta.remove();
        }

        mostrarError(data.mensaje)
        

    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        mostrarError(error.message || "Error al eliminar el producto.")
        
    }
});


const normalizarTexto = (texto) => {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
};

const filtrarProductos = () => {
    const busqueda = normalizarTexto(buscador.value);

    let productosFiltrados = todosLosProductos.filter(producto => {
        const coincideNombre = normalizarTexto(producto.nombre)
            .includes(busqueda);

        const coincideCategoria = !categoriaSeleccionada ||
            producto.id_categoria == categoriaSeleccionada;

        return coincideNombre && coincideCategoria;
    });

    // Los productos sin stock quedan al final.
    productosFiltrados.sort((a, b) => {
        return (a.stock === 0) - (b.stock === 0);
    });

    contenedorCards.innerHTML = "";

    productosFiltrados.forEach(producto => {
        const botonEliminar = esAdmin
            ? `<button class="btn-eliminar" data-id="${producto.id_producto}">✖</button>`
            : "";

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
    });

    mensajeSinResultados.style.display =
        productosFiltrados.length === 0 ? "block" : "none";
};

buscador.addEventListener("input", filtrarProductos);

