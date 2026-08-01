class CarritoProducto extends HTMLElement {

    connectedCallback(){

        const id = this.getAttribute("id");
        const nombre = this.getAttribute("nombre");
        const precio = this.getAttribute("precio");
        const cantidad = this.getAttribute("cantidad");
        const imagen = this.getAttribute("imagen");

        this.innerHTML = `

            <a href="producto.html?id=${id}">
            <div class="producto-carrito">

                <img src="${imagen}" alt="${nombre}">

                <div class="info-producto">
                    <p class="nombre">${nombre}</p>
                    <p class="precio">$${precio}</p>
                    <p class="cantidad">Cantidad: ${cantidad}</p>
                </div>
            </a>

            </div>
        `;
    }

}

customElements.define("carrito-producto", CarritoProducto);