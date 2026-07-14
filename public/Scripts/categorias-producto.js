const selectCategorias = document.getElementById("categoria");

const cargarCategorias = async () => {

    try {

        const respuesta = await fetch("/categorias");

        const categorias = await respuesta.json();

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