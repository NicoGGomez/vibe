const formCategoria = document.getElementById("form-carga-categoria");
const inputNombre = document.getElementById("input-ca-nombre");


formCategoria.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nombreCategoria = inputNombre.value;

    try {

        const respuesta = await fetch("https://vibe-n9dy.onrender.com", {
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

        inputNombre.value = "";

        cargarCategorias();

    } catch(error) {

        console.log("Error al cargar categoría:", error);

    }

});