const contenedor = document.getElementById("lista-productos");

const cargarProductos = async () => {

    try {

        const respuesta = await fetch("https://vibe-n9dy.onrender.com/productos");

        const productos = await respuesta.json();

        contenedor.innerHTML = "";

        productos.forEach(producto => {

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

        });

    } catch(error) {

        console.log(error);

    }

};

cargarProductos();