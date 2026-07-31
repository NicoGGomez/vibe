import { getUsuario } from "./auth.js";

const parametros = new URLSearchParams(window.location.search);
const idProducto = parametros.get("id");

const contenedorCards = document.getElementById("lista-cards-productos-similares");

const usuario = getUsuario();
const esAdmin = usuario?.rol === "admin";

const cargarProductosRelacionados = async () => {

    try {

        // Obtengo el producto actual
        const respuestaProducto = await fetch(
            `https://vibe-n9dy.onrender.com/productos/${idProducto}`
        );

        const productoActual = await respuestaProducto.json();

        // Obtengo los productos de la misma categoría
        const respuesta = await fetch(
            `https://vibe-n9dy.onrender.com/productos/categoria/${productoActual.id_categoria}`
        );

        let productos = await respuesta.json();

        // Quito el producto que estoy viendo
        productos = productos.filter(
            producto => producto.id_producto != idProducto
        );

        contenedorCards.innerHTML = "";

        productos.forEach(producto => {

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
                        precio="${producto.precio}">
                    </card-comp>
                </div>
            `;

        });

    } catch (error) {
        console.log(error);
    }

};

cargarProductosRelacionados();