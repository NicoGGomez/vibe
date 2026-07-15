const listaProductos = document.getElementById("lista-productos");

const cargarProductos = async () => {

    try {
        const respuesta = await fetch(`https://vibe-n9dy.onrender.com/productos`);

        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}`);
        }

        const productos = await respuesta.json();

        if (!Array.isArray(productos)) {
            console.log(productos);
            return;
        }

        listaProductos.innerHTML = "";

        productos.forEach(producto => {

            listaProductos.innerHTML += `
                <li>
                    ${producto.nombre}
                </li>
            `;

        });

    } catch(error) {

        console.log("Error al cargar productos:", error);

    }

};


cargarProductos();