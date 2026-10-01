import { getUsuario, getToken } from "../Scripts/auth.js";

class Producto extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {

        const usuario = getUsuario();
        const esAdmin = usuario?.rol === "admin";

        const id = this.getAttribute("data-id");
        const nombre = this.getAttribute("nombre");
        const precio = this.getAttribute("precio");
        const descripcion = this.getAttribute("descripcion");
        const stock = Number(this.getAttribute("stock"));

        const imagen = this.getAttribute("imagen");
        const imagenExtraUno = this.getAttribute("imagenExUno");
        const imagenExtraDos = this.getAttribute("imagenExDos");
        const imagenExtraTres = this.getAttribute("imagenExTres");

        const sinStock = stock === 0;

        // Todas las imágenes disponibles
        let imagenes = [
            imagen,
            imagenExtraUno,
            imagenExtraDos,
            imagenExtraTres
        ].filter(img => img);

        this.innerHTML = `
            <div class="cont contenedor-producto ${sinStock ? "producto-sin-stock" : ""}" data-id="${id}">

                <div class="contenedor-imagen-producto">

                    <img 
                        class="img-producto-prin" 
                        id="imagen-principal-producto"
                        src="${imagenes[0] || ""}" 
                        alt="${nombre}"
                    >

                    ${
                        sinStock
                        ? `<div class="cartel-sin-stock">Sin stock</div>`
                        : ""
                    }

                </div>

                <div class="cont producto-informacion">

                    <div class="producto-texto">

                        <div class="informacion-principal">
                            <p class="nombre">${nombre}</p>
                            <p class="precio">$${precio}</p>
                        </div>

                        <p>${descripcion}</p>

                    </div>

                    ${
                        imagenes.length > 1
                        ? `
                            <div class="cont imagenes" id="imagenes-producto">
                                ${imagenes.slice(1).map((img, index) => `
                                    <img 
                                        src="${img}" 
                                        alt="${nombre}"
                                        data-index="${index + 1}"
                                    >
                                `).join("")}
                            </div>
                        `
                        : ""
                    }

                    <div class="cont contenedor-botones">

                        <div class="separador separador-producto"></div>

                        <div class="cont botones">

                            <button 
                                ${sinStock ? "disabled" : ""}
                            >
                                Comprar
                            </button>

                            <button 
                                id="btn-agregar-carrito-prod"
                                ${sinStock ? "disabled" : ""}
                            >
                                ${
                                    sinStock
                                    ? "Sin stock"
                                    : "Agregar al carrito"
                                }
                            </button>

                        </div>

                    </div>

                </div>

            </div>


            ${
                esAdmin
                ? `
                    <div class="panel-admin-producto">

                        <h3>Administración</h3>

                        <label>Título</label>
                        <input 
                            type="text" 
                            id="admin-nombre"
                            value="${nombre}"
                        >

                        <label>Precio</label>
                        <input 
                            type="number" 
                            id="admin-precio"
                            value="${precio}"
                        >

                        <label>Stock</label>

                        <div class="control-stock">

                            <button id="admin-stock-menos">
                                -1
                            </button>

                            <span id="admin-stock">
                                ${stock}
                            </span>

                            <button id="admin-stock-mas">
                                +1
                            </button>

                        </div>

                        <label>Descripción</label>

                        <textarea id="admin-descripcion">${descripcion}</textarea>

                        <button id="admin-guardar-producto">
                            Guardar cambios
                        </button>

                    </div>
                `
                : ""
            }


        `;

        // ==========================
        // ADMINISTRACIÓN
        // ==========================

        if (esAdmin) {

            const btnGuardar = this.querySelector(
                "#admin-guardar-producto"
            );

            const btnStockMenos = this.querySelector(
                "#admin-stock-menos"
            );

            const btnStockMas = this.querySelector(
                "#admin-stock-mas"
            );

            const stockAdmin = this.querySelector(
                "#admin-stock"
            );

            // ==========================
// MODIFICAR STOCK
// ==========================

const cambiarStock = async (cantidad) => {

    try {

        const token = getToken();

        const respuesta = await fetch(
            `https://vibe-n9dy.onrender.com/productos/${id}/stock`,
            {
                method: "PATCH",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({
                    cantidad: cantidad
                })
            }
        );

        const datos = await respuesta.json();

        if (!respuesta.ok) {

            throw new Error(
                datos.error || "No se pudo modificar el stock"
            );

        }

        const productoActualizado = datos.producto;

        // Actualizar el atributo del componente

        this.setAttribute(
            "stock",
            productoActualizado.stock
        );

        // Actualizar el número mostrado

        stockAdmin.textContent =
            productoActualizado.stock;

            } catch (error) {

                console.error(error);

                alert(error.message);

            }

        };


            // Reducir stock

            btnStockMenos.addEventListener(
                "click",
                () => cambiarStock(-1)
            );


            // Aumentar stock

            btnStockMas.addEventListener(
                "click",
                () => cambiarStock(1)
            );

            // Guardar cambios

            btnGuardar.addEventListener("click", async () => {

                try {

                    const nuevoNombre = this.querySelector(
                        "#admin-nombre"
                    ).value.trim();

                    const nuevoPrecio = Number(
                        this.querySelector("#admin-precio").value
                    );

                    const nuevaDescripcion = this.querySelector(
                        "#admin-descripcion"
                    ).value.trim();

                    if (!nuevoNombre) {
                        alert("El nombre no puede estar vacío");
                        return;
                    }

                    if (nuevoPrecio < 0) {
                        alert("El precio no puede ser negativo");
                        return;
                    }

                    const token = getToken();

                    const respuesta = await fetch(
                        `https://vibe-n9dy.onrender.com/productos/${id}`,
                        {
                            method: "PUT",

                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },

                            body: JSON.stringify({
                                nombre: nuevoNombre,
                                precio: nuevoPrecio,
                                descripcion: nuevaDescripcion
                            })
                        }
                    );

                    const datos = await respuesta.json();

                    if (!respuesta.ok) {
                        throw new Error(
                            datos.error || "Error al actualizar producto"
                        );
                    }

                    alert("Producto actualizado correctamente");

                    // Actualizamos los atributos del componente

                    this.setAttribute("nombre", nuevoNombre);
                    this.setAttribute("precio", nuevoPrecio);
                    this.setAttribute("descripcion", nuevaDescripcion);

                    document.title = `Vibe - ${nuevoNombre}`;

                    this.render();

                } catch (error) {

                    console.error(error);

                    alert(error.message);

                }

            });

        }

        // ==========================
        // GALERÍA DE IMÁGENES
        // ==========================

        const imagenPrincipal = this.querySelector(
            "#imagen-principal-producto"
        );

        const contenedorImagenes = this.querySelector(
            "#imagenes-producto"
        );

        if (contenedorImagenes) {

            contenedorImagenes
                .querySelectorAll("img")
                .forEach(img => {

                    img.addEventListener("click", () => {

                        const imagenSeleccionada = img.src;
                        const imagenAnterior = imagenPrincipal.src;

                        imagenPrincipal.src = imagenSeleccionada;
                        img.src = imagenAnterior;

                    });

                });
        }

        // ==========================
        // AGREGAR AL CARRITO
        // ==========================

        const btnCarritoProducto = this.querySelector(
            "#btn-agregar-carrito-prod"
        );

        if (btnCarritoProducto && !sinStock) {

            btnCarritoProducto.addEventListener("click", (e) => {

                e.preventDefault();
                e.stopPropagation();

                this.dispatchEvent(
                    new CustomEvent("agregar-carrito", {
                        bubbles: true,
                        detail: {
                            idProducto: id
                        }
                    })
                );

            });

        }

    }
}

customElements.define("producto-comp", Producto);