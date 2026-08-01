const btnAbrirCarrito = document.getElementById("btn-abrir-carrito");
const btnCerrarCarrito = document.getElementById("btn-cerrar-carrito");
const carritoAbierto = document.getElementById("carrito-abierto");

btnAbrirCarrito.addEventListener("click", () => {
    carritoAbierto.style.display = "flex";
    btnAbrirCarrito.style.display = "none";

    cargarCarrito();
});

btnCerrarCarrito.addEventListener("click", () => {
    carritoAbierto.style.display = "none";
    btnAbrirCarrito.style.display = "flex";
});

document.addEventListener("agregar-carrito", (e) => {
    agregarAlCarrito(e.detail.idProducto);
});

async function agregarAlCarrito(idProducto) {

    const token = localStorage.getItem("token");

    const respuesta = await fetch("https://vibe-n9dy.onrender.com/carrito", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            id_producto: idProducto,
            cantidad: 1
        })
    });

    if (!respuesta.ok) {
        const error = await respuesta.json();
        console.log(error); // <-- importante
        throw new Error(error.mensaje);
    }

    cargarCarrito();
}

async function cargarCarrito(){

    const token = localStorage.getItem("token");

    const respuesta = await fetch("https://vibe-n9dy.onrender.com/carrito",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    if(!respuesta.ok){
        throw new Error("No se pudo obtener el carrito");
    }

    const productos = await respuesta.json();

    const lista = document.getElementById("lista-carrito");

    lista.innerHTML = "";

    productos.forEach(producto=>{

        lista.innerHTML += `
            <carrito-producto
                nombre="${producto.nombre}"
                precio="${producto.precio}"
                cantidad="${producto.cantidad}"
                imagen="${producto.imagen_principal}">
            </carrito-producto>
        `;

    });

}