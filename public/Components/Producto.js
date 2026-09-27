class Producto extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {

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
        `;

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