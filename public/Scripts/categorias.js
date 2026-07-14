const listaCategorias = document.getElementById("lista-categorias");

const cargarCategorias = async () => {

    try {

        const respuesta = await fetch("https://vibe-n9dy.onrender.com");

        const categorias = await respuesta.json();

        listaCategorias.innerHTML = "";

        categorias.forEach(categoria => {

            listaCategorias.innerHTML += `
                <li>
                    ${categoria.nombre}
                </li>
            `;

        });

    } catch(error) {

        console.log("Error al cargar categorías:", error);

    }

};


cargarCategorias();