class Card extends HTMLElement {
    connectedCallback() {

        const id = this.getAttribute("data-id");
        const nombre = this.getAttribute("nombre");
        const precio = this.getAttribute("precio");
        const imagen = this.getAttribute("imagen");

        this.innerHTML = `
                    <a href="producto.html?id=${id}">
                    <div class="cont card" data-id="${id}">
                        <img src="${imagen}" alt="">
                        <div class="cont info-card-comp">
                            <div class="cont info-card">
                                <p class="texto">${nombre}</p>
                                <p class="precio">${precio}</p>
                            </div>
                            <i class="fa-solid fa-cart-shopping"></i>
                        </div>
                    </div>
                    </a>
        `;
    }
}

customElements.define("card-comp", Card);