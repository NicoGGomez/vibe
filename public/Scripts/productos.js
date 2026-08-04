import { getUsuario } from "./auth.js";

const parametros = new URLSearchParams(window.location.search);
const categoriaSeleccionada = parametros.get("categoria");
const contenedor = document.getElementById("lista-productos");
const contenedorCards = document.getElementById("lista-cards-productos");

const usuario = getUsuario();
const esAdmin = usuario?.rol === "admin";

const cargarProductos = async () => {
    mostrarCarga();

    try {

        const respuesta = await fetch("https://vibe-n9dy.onrender.com/productos");
        const productos = await respuesta.json();

        let productosFiltrados = productos;

        if (categoriaSeleccionada) {
            productosFiltrados = productos.filter(producto =>
                producto.id_categoria == categoriaSeleccionada
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
                        precio="${producto.precio}">
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
                        imagenExTres="${producto.imagen_extra_tres ?? ""}">
                    </producto-comp>
                `;
            }

        });

    } catch (error) {
        console.log(error);
    }

};

cargarProductos();

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

        if (!respuesta.ok) {
            throw new Error("No se pudo eliminar");
        }

        await cargarProductos();

    } catch (error) {
        console.error(error);
        alert("Error al eliminar el producto.");
    }
});

function generarSkeleton() {
    return `
        <div class="card-skeleton">
            <div class="skeleton-img"></div>
            <div class="skeleton-text titulo"></div>
            <div class="skeleton-text precio"></div>
            <div class="skeleton-btn"></div>
        </div>
    `;
}

function mostrarCarga() {
    const skeletons = Array(8).fill(generarSkeleton()).join("");

    if (contenedorCards) {
        contenedorCards.innerHTML = skeletons;
    }

    if (contenedor) {
        contenedor.innerHTML = skeletons;
    }
}