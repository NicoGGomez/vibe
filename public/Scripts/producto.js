const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const cargarProducto = async () => {

    try {

        const respuesta = await fetch(`https://vibe-n9dy.onrender.com/productos/${id}`);

        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}`);
        }

        const producto = await respuesta.json();

        const componente = document.getElementById("producto");

        componente.setAttribute("data-id", producto.id_producto);
        componente.setAttribute("imagen", producto.imagen_principal || "");
        componente.setAttribute("imagenExUno", producto.imagen_extra_uno || "");
        componente.setAttribute("imagenExDos", producto.imagen_extra_dos || "");
        componente.setAttribute("imagenExTres", producto.imagen_extra_tres || "");
        componente.setAttribute("nombre", producto.nombre);
        componente.setAttribute("precio", producto.precio);
        componente.setAttribute("descripcion", producto.descripcion);

        componente.render();

    } catch (error) {
        console.error(error);
    }

}

cargarProducto();