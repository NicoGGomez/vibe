// Categorías

// Obtención de elementos del DOM

const listaCategorias = document.getElementById("lista-categorias");

// Función para crear una nueva categoría 

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

            const categoriaActual = new URLSearchParams(window.location.search)
                .get("categoria");

            const activa = categoriaActual === String(categoria.id_categoria);

            listaCategorias.innerHTML += `
                <a href="productos.html?categoria=${categoria.id_categoria}"
                class="${activa ? 'categoria-activa' : ''}">
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