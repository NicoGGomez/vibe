import { getUsuario } from "./auth.js";

const usuario = getUsuario();

if (!usuario || usuario.rol !== "admin") {
    window.location.replace("index.html");
    throw new Error("Acceso denegado");
}

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

    const formData = new FormData();

    // Datos del producto
    formData.append("nombreProducto", inputNombre.value);
    formData.append("precioProducto", inputPrecio.value);
    formData.append("descrProducto", inputDescripcion.value);
    formData.append("stockProducto", inputStock.value);
    formData.append("categoriaProducto", selectCategoria.value);

    // Imágenes
    formData.append("imagenPrincipal", inputImagenPrin.files[0]);

    if (inputImagenex1.files.length > 0) {
        formData.append("imagenExtraUno", inputImagenex1.files[0]);
    }

    if (inputImagenex2.files.length > 0) {
        formData.append("imagenExtraDos", inputImagenex2.files[0]);
    }

    if (inputImagenex3.files.length > 0) {
        formData.append("imagenExtraTres", inputImagenex3.files[0]);
    }

    try {

        const token = localStorage.getItem("token");

        if(!token){
            alert("Tenés que iniciar sesión");
            return;
        }

        const respuesta = await fetch("https://vibe-n9dy.onrender.com/productos", {
            method: "POST",
            headers:{
                Authorization:`Bearer ${token}`
            },
            body: formData
        });

        const data = await respuesta.json();

        if(!respuesta.ok){
            throw new Error(data.error);
        }

        console.log(data);

        formProducto.reset();

        cargarProductos();

    } catch (error) {

        console.log("Error al cargar el producto:", error);

    }

});