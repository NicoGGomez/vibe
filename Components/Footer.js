class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <div class="cont footer-arriba">
                    <div class="cont links">
                        <div class="texto">
                            <a href="">Atencion al cliente</a>
                            <a href="">Preguntas frecuentes</a>
                            <a href="">¿Como hacer mi compra?</a>
                            <a href="">otros</a>
                        </div>
                    </div>
                    <div class="cont seccion-medio">
                        <img src="Imgs/logo-vibe.png" alt="">
                        <div class="cont sociales">
                                <a target="_blank" href="https://www.instagram.com/vibe.tandil/">
                                    <i class="fa-brands fa-instagram"></i>
                                    <p>Vibe.tandil</p>
                                </a>
                                <a target="_blank" href="https://www.facebook.com/vibe.tandil">
                                    <i class="fa-brands fa-facebook"></i>
                                    <p>Vibe.tandil</p>
                                </a>
                        </div>
                    </div>
                    <div class="cont contacto">
                        <div class="texto">
                            <p>Contacto</p>
                            <p>2494494850</p>
                            <p>vibe.tandil@gmail.com</p>
                            <p>Espora 1074</p>
                        </div>
                    </div>
                </div>
                <div class="cont footer-abajo">
                    <div class="separador"></div>
                    <div class="cont texto">
                        <p>© Todos los derechos reservados 2026.</p>
                        <p>Vibe</p>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define("footer-comp", Footer);