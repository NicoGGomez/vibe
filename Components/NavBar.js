class NavBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="cont">
                <ul>
                    <a href=""><img src="Imgs/logo-vibe.png" alt=""></a>
                    <li><a href="Index.html">Home</a></li>
                    <li><a href="Productos.html">Productos</a></li>
                    <li><a href="Nosotros.html">Nosotros</a></li>
                </ul>
            </nav>
        `;
    }
}

customElements.define("nav-bar", NavBar);