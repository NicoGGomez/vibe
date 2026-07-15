const formProducto = document.getElementById("form-carga-producto");
const inputNombre = document.getElementById("input-pr-nombre");
const inputPrecio = document.getElementById("input-pr-precio");
const inputDescripcion = document.getElementById("input-pr-descr");
const inputImagenPrin = document.getElementById("input-pr-img");
const inputImagenex1 = document.getElementById("input-pr-img-ex1");
const inputImagenex2 = document.getElementById("input-pr-img-ex2");
const inputImagenex3 = document.getElementById("input-pr-img-ex3");
const inputStock = document.getElementById("input-pr-stock");
const selectCategoria = document.getElementById("categoria");

formProducto.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nombreProducto = inputNombre.value;
    const precioProducto = inputPrecio.value;
    const descrProducto = inputDescripcion.value;
    const imgPrinProducto = inputImagenPrin.files[0]?.name;
    const imgEx1Producto = inputImagenex1.files[0]?.name;
    const imgEx2Producto = inputImagenex2.files[0]?.name;
    const imgEx3Producto = inputImagenex3.files[0]?.name;
    const stockProducto = inputStock.value;
    const categoriaProducto = selectCategoria.value;


    try {

        const respuesta = await fetch("https://vibe-n9dy.onrender.com/productos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombreProducto,
                precioProducto,
                descrProducto,
                imgPrinProducto,
                imgEx1Producto,
                imgEx2Producto,
                imgEx3Producto,
                stockProducto,
                categoriaProducto
            })
        });

        const data = await respuesta.json();

        console.log(data);

        inputNombre.value = "";
        inputPrecio.value = ""; 
        inputDescripcion.value = ""; 
        inputImagenPrin.value = ""; 
        inputImagenex1.value = ""; 
        inputImagenex2.value = "";  
        inputImagenex3.value = ""; 
        inputStock.value = ""; 
        selectCategoria.value = ""; 

        cargarProducto();

    } catch(error) {

        console.log("Error al cargar el producto:", error);

    }

});