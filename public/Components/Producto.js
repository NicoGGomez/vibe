class Producto extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {

        const id = this.getAttribute("data-id");
        const nombre = this.getAttribute("nombre");
        const precio = this.getAttribute("precio");
        const descripcion = this.getAttribute("descripcion");
        const imagen = this.getAttribute("imagen");
        const imagenExtraUno = this.getAttribute("imagenExUno");
        const imagenExtraDos = this.getAttribute("imagenExDos");
        const imagenExtraTres = this.getAttribute("imagenExTres");

        const hayImagenes =
                imagenExtraUno ||
                imagenExtraDos ||
                imagenExtraTres;

        this.innerHTML = `
            <div class="cont contenedor-producto" data-id="${id}">
                <img class="img-producto-prin" src="${imagen}" alt="">

                <div class="cont producto-informacion">

                    <div class="producto-texto">
                        <div class="informacion-principal">
                            <p class="nombre">${nombre}</p>
                            <p class="precio">$${precio}</p>
                        </div>

                        <p>${descripcion}</p>
                    </div>

                    ${hayImagenes ? `
                        <div class="cont imagenes">
                            ${imagenExtraUno ? `<img src="${imagenExtraUno}" alt="">` : ""}
                            ${imagenExtraDos ? `<img src="${imagenExtraDos}" alt="">` : ""}
                            ${imagenExtraTres ? `<img src="${imagenExtraTres}" alt="">` : ""}
                        </div>
                    ` : ""}

                    <div class="cont contenedor-botones">
                        <div class="separador separador-producto"></div>

                        <div class="cont botones">
                            <button>Comprar</button>
                            <button id="btn-agregar-carrito-prod">Agregar al carrito</button>
                        </div>
                    </div>

                </div>
            </div>
        `;

        const btnCarritoProducto = this.querySelector("#btn-agregar-carrito-prod");

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

customElements.define("producto-comp", Producto);