
// const cards = document.querySelector(".cards");

// // Guardamos las tarjetas originales
// const originales = [...cards.children];

// // Llenamos varias veces
// while (cards.scrollWidth < window.innerWidth * 3) {
//     originales.forEach(card => {
//         cards.appendChild(card.cloneNode(true));
//     });
// }

// let x = 0;
// const velocidad = 0.7;

// let pausado = false;

// cards.addEventListener("mouseenter", () => pausado = true);
// cards.addEventListener("mouseleave", () => pausado = false);

// // Calculamos cuánto mide un bloque original
// const anchoOriginal =
//     [...originales].reduce((total, card) => total + card.offsetWidth, 0)
//     + (originales.length - 1) * 20;

// function animar(){

//     if(!pausado){

//         x += velocidad;

//         if(x >= anchoOriginal){
//             x = 0;
//         }

//         cards.style.transform = `translateX(-${x}px)`;
//     }

//     requestAnimationFrame(animar);
// }

// animar();

const cards = document.querySelector(".cards");

const originales = [...cards.children];

// Clonamos una vez hasta tener suficiente contenido
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