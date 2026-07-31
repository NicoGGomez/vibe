import { getUsuario } from "./auth.js";

const parametros = new URLSearchParams(window.location.search);
const categoriaSeleccionada = parametros.get("categoria");

const contenedor = document.getElementById("lista-productos");
const contenedorCards = document.getElementById("lista-cards-productos");

const usuario = getUsuario();
const esAdmin = usuario?.rol === "admin";

const cargarProductos = async () => {

    try {

        let url = "https://vibe-n9dy.onrender.com/productos";

        if (categoriaSeleccionada) {
            url = `https://vibe-n9dy.onrender.com/productos/categoria/${categoriaSeleccionada}`;
        }

        const respuesta = await fetch(url);
        const productos = await respuesta.json();

        if (contenedorCards) contenedorCards.innerHTML = "";
        if (contenedor) contenedor.innerHTML = "";

        productos.forEach(producto => {

            const botonEliminar = esAdmin
                ? `<button class="btn-eliminar" data-id="${producto.id_producto}">✖</button>`
                : "";

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