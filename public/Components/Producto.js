class Producto extends HTMLElement {
    connectedCallback() {

        const id = this.getAttribute("data-id");
        const nombre = this.getAttribute("nombre");
        const precio = this.getAttribute("precio");
        const descripcion = this.getAttribute("descripcion");
        const imagen = this.getAttribute("imagen");
        const imagenExtraUno = this.getAttribute("imagenExUno");
        const imagenExtraDos = this.getAttribute("imagenExDos");
        const imagenExtraTres = this.getAttribute("imagenExTres");

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
                <div class="cont imagenes">
                        ${imagenExtraUno ? `<img src="${imagenExtraUno}" alt="">` : ""}
                        ${imagenExtraDos ? `<img src="${imagenExtraDos}" alt="">` : ""}
                        ${imagenExtraTres ? `<img src="${imagenExtraTres}" alt="">` : ""}
                </div>
                <div class="cont contenedor-botones">
                    <div class="separador separador-producto"></div>
                    <div class="cont botones">
                        <button>Comprar</button>
                        <button>Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define("producto-comp", Producto);