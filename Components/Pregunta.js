class Pregunta extends HTMLElement {
    connectedCallback() {

        const pregunta = this.getAttribute("pregunta");
        const respuesta = this.getAttribute("respuesta");

        this.innerHTML = `
            <div class="cont pregunta">
                <b>${pregunta}</b>
                <p>${respuesta}</p>
            </div>
        `;
    }
}

customElements.define("pregunta-comp", Pregunta);