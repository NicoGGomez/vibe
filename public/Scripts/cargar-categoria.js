const formCategoria = document.getElementById("form-carga-categoria");
const inputNombre = document.getElementById("input-ca-nombre");


formCategoria.addEventListener("submit", async (e) => {

    e.preventDefault(); // evita recargar la página

    const nombreCategoria = inputNombre.value;

    try {

        const respuesta = await fetch("/categorias", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombreCategoria
            })
        });

        const data = await respuesta.json();

        console.log(data);

        // limpiar input
        inputNombre.value = "";

        // volver a cargar la lista/select
        cargarCategorias();

    } catch(error) {

        console.log("Error al cargar categoría:", error);

    }

});