const listaCategorias = document.getElementById("lista-categorias");

const cargarCategorias = async () => {

    try {
        const respuesta = await fetch(`https://vibe-n9dy.onrender.com/categorias`);

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
                <a href="productos.html?categoria=${categoria.id_categoria}">
                    <li>
                        ${categoria.nombre}
                    </li>
                </a>
            `;

        });

    } catch(error) {

        console.log("Error al cargar categorías:", error);

    }

};


cargarCategorias();