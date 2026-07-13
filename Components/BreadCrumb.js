class BreadCrumb extends HTMLElement {
    connectedCallback() {

        const links = this.getAttribute("links")
            .split(",")
            .map(link => link.trim());

        let html = "";

        links.forEach((link, index) => {
            if (index === links.length - 1) {
                html += `<p><b>${link}</b></p>`;
            } else {
                html += `<p>${link}</p>`;
                html += `<span>></span>`;
            }
        });

        this.innerHTML = `
            <div class="bread-crumb">
                <div class="texto">
                    ${html}
                </div>
            </div>
        `;
    }
}

customElements.define("bread-crumb", BreadCrumb);