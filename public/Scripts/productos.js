const parametros = new URLSearchParams(window.location.search);
const categoriaSeleccionada = parametros.get("categoria");
const contenedor = document.getElementById("lista-productos");
const contenedorCards = document.getElementById("lista-cards-productos");

const cargarProductos = async () => {

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

            if (contenedorCards) {
                contenedorCards.innerHTML += `
                    <card-comp
                        data-id="${producto.id_producto}"
                        imagen="${producto.imagen_principal}"
                        nombre="${producto.nombre}"
                        precio="${producto.precio}">
                    </card-comp>
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