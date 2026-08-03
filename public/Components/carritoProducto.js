class CarritoProducto extends HTMLElement {

    connectedCallback(){

        const id = this.getAttribute("id");
        const nombre = this.getAttribute("nombre");
        const precio = this.getAttribute("precio");
        const cantidad = this.getAttribute("cantidad");
        const imagen = this.getAttribute("imagen");

        this.innerHTML = `

            <div class="producto-carrito">
            <a href="producto.html?id=${id}">   
        
                <img src="${imagen}" alt="${nombre}">

                <div class="info-producto">
                    <p class="nombre">${nombre}</p>
                    <p class="precio">$${precio}</p>
                    <p class="cantidad">Cantidad: ${cantidad}</p>
                </div>
            </a>

            <div class="cont-btn-borrar-carrito">
                <i class="fa-solid fa-trash btn-carrito btn-borrar-carrito"></i>
            </div>

            </div>
        `;

        const btnBorrarCarrito = this.querySelector(".btn-borrar-carrito");

        btnBorrarCarrito.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            this.dispatchEvent(
                new CustomEvent("borrar-carrito", {
                    bubbles: true,
                    detail: {
                        idProducto: id
                    }
                })
            );
        });
    }

}

customElements.define("carrito-producto", CarritoProducto);