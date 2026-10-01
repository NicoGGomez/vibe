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

                            <div class="campo-producto campo-nombre">

                                <p class="nombre">${nombre} ${
                                    esAdmin
                                    ? `
                                        <button
                                            class="btn-editar-campo"
                                            data-campo="nombre"
                                            title="Modificar nombre"
                                        >
                                            <i class="fa-solid fa-pen"></i>
                                        </button>
                                    `
                                    : ""
                                }</p>

                            </div>


                            <div class="campo-producto campo-precio">

                                <p class="precio">$${precio} ${
                                    esAdmin
                                    ? `
                                        <button
                                            class="btn-editar-campo"
                                            data-campo="precio"
                                            title="Modificar precio"
                                        >
                                            <i class="fa-solid fa-pen"></i>
                                        </button>
                                    `
                                    : ""
                                }</p>

                            </div>

                        </div>


                        <div class="campo-producto campo-descripcion">

                            <p>${descripcion} ${
                                esAdmin
                                ? `
                                    <button
                                        class="btn-editar-campo"
                                        data-campo="descripcion"
                                        title="Modificar descripción"
                                    >
                                        <i class="fa-solid fa-pen"></i>
                                    </button>
                                `
                                : ""
                            }</p>

                            

                        </div>


                        ${
                            esAdmin
                            ? `
                                <div class="campo-stock">

                                    <span>Stock:</span>

                                    <button
                                        id="admin-stock-menos"
                                        class="btn-stock"
                                    >
                                        −
                                    </button>

                                    <span id="admin-stock">
                                        ${stock}
                                    </span>

                                    <button
                                        id="admin-stock-mas"
                                        class="btn-stock"
                                    >
                                        +
                                    </button>

                                </div>
                            `
                            : ""
                        }

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

        `;

        // ==========================
        // ADMINISTRACIÓN
        // ==========================

        if (esAdmin) {

            // ==========================
            // EDITAR NOMBRE
            // ==========================

            const btnEditarNombre = this.querySelector(
                '[data-campo="nombre"]'
            );

            btnEditarNombre?.addEventListener("click", () => {

                const campoNombre = this.querySelector(
                    ".campo-nombre"
                );

                const nombreActual = this.getAttribute("nombre");

                campoNombre.innerHTML = `

                    <input
                        type="text"
                        class="input-editar-producto"
                        id="input-editar-nombre"
                        value="${nombreActual}"
                    >

                    <button
                        class="btn-guardar-campo"
                        id="guardar-nombre"
                        title="Guardar"
                    >
                        <i class="fa-solid fa-check"></i>
                    </button>

                    <button
                        class="btn-cancelar-campo"
                        id="cancelar-nombre"
                        title="Cancelar"
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                `;

                const input = this.querySelector(
                    "#input-editar-nombre"
                );

                input.focus();

                // CANCELAR
                this.querySelector(
                    "#cancelar-nombre"
                ).addEventListener("click", () => {
                    this.render();
                });

                // GUARDAR
                this.querySelector(
                    "#guardar-nombre"
                ).addEventListener("click", async () => {

                    const nuevoNombre = input.value.trim();

                    if (!nuevoNombre) {
                        alert("El nombre no puede estar vacío");
                        return;
                    }

                    try {

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
                                    precio: Number(
                                        this.getAttribute("precio")
                                    ),
                                    descripcion:
                                        this.getAttribute("descripcion")
                                })
                            }
                        );

                        const datos = await respuesta.json();

                        if (!respuesta.ok) {
                            throw new Error(
                                datos.error ||
                                "No se pudo actualizar el nombre"
                            );
                        }

                        this.setAttribute(
                            "nombre",
                            nuevoNombre
                        );

                        document.title =
                            `Vibe - ${nuevoNombre}`;

                        this.render();

                    } catch (error) {

                        console.error(error);
                        alert(error.message);

                    }

                });

            });


            // ==========================
            // EDITAR PRECIO
            // ==========================

            const btnEditarPrecio = this.querySelector(
                '[data-campo="precio"]'
            );

            btnEditarPrecio?.addEventListener("click", () => {

                const campoPrecio = this.querySelector(
                    ".campo-precio"
                );

                const precioActual = this.getAttribute("precio");

                campoPrecio.innerHTML = `

                    <input
                        type="number"
                        class="input-editar-producto"
                        id="input-editar-precio"
                        value="${precioActual}"
                        min="0"
                        step="0.01"
                    >

                    <button
                        class="btn-guardar-campo"
                        id="guardar-precio"
                        title="Guardar"
                    >
                        <i class="fa-solid fa-check"></i>
                    </button>

                    <button
                        class="btn-cancelar-campo"
                        id="cancelar-precio"
                        title="Cancelar"
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                `;

                const input = this.querySelector(
                    "#input-editar-precio"
                );

                input.focus();

                // CANCELAR
                this.querySelector(
                    "#cancelar-precio"
                ).addEventListener("click", () => {
                    this.render();
                });

                // GUARDAR
                this.querySelector(
                    "#guardar-precio"
                ).addEventListener("click", async () => {

                    const nuevoPrecio = Number(input.value);

                    if (!Number.isFinite(nuevoPrecio) || nuevoPrecio < 0) {
                        alert("El precio no es válido");
                        return;
                    }

                    try {

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
                                    nombre: this.getAttribute("nombre"),
                                    precio: nuevoPrecio,
                                    descripcion:
                                        this.getAttribute("descripcion")
                                })
                            }
                        );

                        const datos = await respuesta.json();

                        if (!respuesta.ok) {
                            throw new Error(
                                datos.error ||
                                "No se pudo actualizar el precio"
                            );
                        }

                        this.setAttribute(
                            "precio",
                            nuevoPrecio
                        );

                        this.render();

                    } catch (error) {

                        console.error(error);
                        alert(error.message);

                    }

                });

            });

            // ==========================
            // EDITAR DESCRIPCIÓN
            // ==========================

            const btnEditarDescripcion = this.querySelector(
                '[data-campo="descripcion"]'
            );

            btnEditarDescripcion?.addEventListener("click", () => {

                const campoDescripcion = this.querySelector(
                    ".campo-descripcion"
                );

                const descripcionActual =
                    this.getAttribute("descripcion");

                campoDescripcion.innerHTML = `

                    <textarea
                        class="input-editar-producto"
                        id="input-editar-descripcion"
                        rows="4"
                    >${descripcionActual}</textarea>

                    <button
                        class="btn-guardar-campo"
                        id="guardar-descripcion"
                        title="Guardar"
                    >
                        <i class="fa-solid fa-check"></i>
                    </button>

                    <button
                        class="btn-cancelar-campo"
                        id="cancelar-descripcion"
                        title="Cancelar"
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                `;

                const input = this.querySelector(
                    "#input-editar-descripcion"
                );

                input.focus();

                // CANCELAR
                this.querySelector(
                    "#cancelar-descripcion"
                ).addEventListener("click", () => {
                    this.render();
                });

                // GUARDAR
                this.querySelector(
                    "#guardar-descripcion"
                ).addEventListener("click", async () => {

                    const nuevaDescripcion =
                        input.value.trim();

                    if (!nuevaDescripcion) {
                        alert("La descripción no puede estar vacía");
                        return;
                    }

                    try {

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
                                    nombre:
                                        this.getAttribute("nombre"),

                                    precio: Number(
                                        this.getAttribute("precio")
                                    ),

                                    descripcion:
                                        nuevaDescripcion
                                })
                            }
                        );

                        const datos = await respuesta.json();

                        if (!respuesta.ok) {
                            throw new Error(
                                datos.error ||
                                "No se pudo actualizar la descripción"
                            );
                        }

                        this.setAttribute(
                            "descripcion",
                            nuevaDescripcion
                        );

                        this.render();

                    } catch (error) {

                        console.error(error);
                        alert(error.message);

                    }

                });

            });

            // ==========================
            // MODIFICAR STOCK
            // ==========================

            const btnStockMenos = this.querySelector(
                "#admin-stock-menos"
            );

            const btnStockMas = this.querySelector(
                "#admin-stock-mas"
            );

            const contadorStock = this.querySelector(
                "#admin-stock"
            );


            // RESTAR STOCK
            btnStockMenos?.addEventListener("click", async () => {

                await modificarStock(-1);

            });


            // SUMAR STOCK
            btnStockMas?.addEventListener("click", async () => {

                await modificarStock(1);

            });


            // FUNCIÓN PARA MODIFICAR STOCK
            const modificarStock = async (cantidad) => {

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
                            datos.error ||
                            "No se pudo modificar el stock"
                        );
                    }

                    // Actualizamos el atributo del componente
                    this.setAttribute(
                        "stock",
                        datos.stock
                    );

                    // Actualizamos solamente el número
                    contadorStock.textContent = datos.stock;

                    // Si llega a 0, volvemos a renderizar
                    // para mostrar "Sin stock"
                    if (Number(datos.stock) === 0) {
                        this.render();
                    }

                } catch (error) {

                    console.error(error);
                    alert(error.message);

                }

            };

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