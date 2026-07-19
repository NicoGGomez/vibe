const cards = document.querySelector(".cards");

const originales = [...cards.children];

let anchoNecesario = window.innerWidth * 2;

while (cards.scrollWidth < anchoNecesario) {
    originales.forEach(card => {
        cards.appendChild(card.cloneNode(true));
    });
}

let x = 0;
const velocidad = 0.7;

let pausado = false;

cards.addEventListener("mouseenter", () => pausado = true);
cards.addEventListener("mouseleave", () => pausado = false);


// Calculamos ancho real del loop
function calcularAnchoOriginal(){

    const gap = parseInt(getComputedStyle(cards).gap) || 0;

    return originales.reduce(
        (total, card) => total + card.getBoundingClientRect().width,
        0
    ) + gap * (originales.length - 1);
}


let anchoOriginal = calcularAnchoOriginal() + 20;


cards.style.willChange = "transform";


function animar(){

    if(!pausado){

        x += velocidad;


        // reinicio suave
        if(x >= anchoOriginal){
            x -= anchoOriginal;
        }


        cards.style.transform = `translate3d(-${x}px,0,0)`;
    }


    requestAnimationFrame(animar);
}


animar();


// Por si cambia el tamaño de pantalla
window.addEventListener("resize", () => {
    anchoOriginal = calcularAnchoOriginal();
});