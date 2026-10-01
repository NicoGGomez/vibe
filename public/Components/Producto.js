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
            // STOCK TEMPORAL
            // ==========================

            const stockOriginal = stock;

            let stockNuevo = stockOriginal;


            // ==========================
            // REDUCIR STOCK
            // ==========================

            btnStockMenos.addEventListener(
                "click",
                () => {

                    if (stockNuevo <= 0) {
                        return;
                    }

                    stockNuevo--;

                    stockAdmin.textContent = stockNuevo;

                }
            );


            // ==========================
            // AUMENTAR STOCK
            // ==========================

            btnStockMas.addEventListener(
                "click",
                () => {

                    stockNuevo++;

                    stockAdmin.textContent = stockNuevo;

                }
            );


            // ==========================
            // GUARDAR CAMBIOS
            // ==========================

            btnGuardar.addEventListener(
                "click",
                async () => {

                    try {

                        const nuevoNombre =
                            this
                            .querySelector("#admin-nombre")
                            .value
                            .trim();


                        const nuevoPrecio =
                            Number(
                                this
                                .querySelector("#admin-precio")
                                .value
                            );


                        const nuevaDescripcion =
                            this
                            .querySelector("#admin-descripcion")
                            .value
                            .trim();


                        // ==========================
                        // VALIDACIONES
                        // ==========================

                        if (!nuevoNombre) {

                            alert(
                                "El nombre no puede estar vacío"
                            );

                            return;

                        }


                        if (nuevoPrecio < 0) {

                            alert(
                                "El precio no puede ser negativo"
                            );

                            return;

                        }


                        // ==========================
                        // TOKEN
                        // ==========================

                        const token = getToken();


                        // ==========================
                        // CAMBIO DE STOCK
                        // ==========================

                        const diferenciaStock =
                            stockNuevo - stockOriginal;


                        // Si cambió el stock,
                        // lo guardamos en la BD

                        if (diferenciaStock !== 0) {

                            const respuestaStock =
                                await fetch(
                                    `https://vibe-n9dy.onrender.com/productos/${id}/stock`,
                                    {
                                        method: "PATCH",

                                        headers: {
                                            "Content-Type":
                                                "application/json",

                                            "Authorization":
                                                `Bearer ${token}`
                                        },

                                        body: JSON.stringify({
                                            cantidad:
                                                diferenciaStock
                                        })
                                    }
                                );


                            const datosStock =
                                await respuestaStock.json();


                            if (!respuestaStock.ok) {

                                throw new Error(
                                    datosStock.error ||
                                    "No se pudo actualizar el stock"
                                );

                            }


                            // Usamos el stock real
                            // devuelto por el backend

                            stockNuevo =
                                datosStock.producto.stock;

                        }


                        // ==========================
                        // ACTUALIZAR PRODUCTO
                        // ==========================

                        const respuesta =
                            await fetch(
                                `https://vibe-n9dy.onrender.com/productos/${id}`,
                                {
                                    method: "PUT",

                                    headers: {
                                        "Content-Type":
                                            "application/json",

                                        "Authorization":
                                            `Bearer ${token}`
                                    },

                                    body: JSON.stringify({

                                        nombre:
                                            nuevoNombre,

                                        precio:
                                            nuevoPrecio,

                                        descripcion:
                                            nuevaDescripcion

                                    })
                                }
                            );


                        const datos =
                            await respuesta.json();


                        if (!respuesta.ok) {

                            throw new Error(
                                datos.error ||
                                "Error al actualizar producto"
                            );

                        }


                        // ==========================
                        // ACTUALIZAR COMPONENTE
                        // ==========================

                        this.setAttribute(
                            "nombre",
                            nuevoNombre
                        );

                        this.setAttribute(
                            "precio",
                            nuevoPrecio
                        );

                        this.setAttribute(
                            "descripcion",
                            nuevaDescripcion
                        );

                        this.setAttribute(
                            "stock",
                            stockNuevo
                        );


                        document.title =
                            `Vibe - ${nuevoNombre}`;


                        alert(
                            "Producto actualizado correctamente"
                        );


                        // Volvemos a renderizar

                        this.render();


                    } catch (error) {

                        console.error(error);

                        alert(error.message);

                    }

                }
            );

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