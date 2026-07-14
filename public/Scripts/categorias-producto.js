const selectCategorias = document.getElementById("categoria");

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

        selectCategorias.innerHTML = "";

        categorias.forEach(categoria => {

            selectCategorias.innerHTML += `
                <option value="${categoria.id_categoria}">
                    ${categoria.nombre}
                </option>
            `;

        });

    } catch(error) {

        console.log("Error al cargar categorías:", error);

    }

};


cargarCategorias();