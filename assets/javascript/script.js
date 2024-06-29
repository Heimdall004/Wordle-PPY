// Constantes
const URL_API = "https://random-word.ryanrk.com/api/en/word/random/?length=5";
const URL_DATOS = "./assets/json/DatosCuriosos.json";

const diccionario = [
    "APPLE",
    "HURLS",
    "WINGS",
    "YOUTH",
    "BEARS",
    "CHAIR",
    "DRAIN",
    "EAGER",
    "FAULT",
    "GHOST",
    "HOUSE",
    "IGLOO",
    "JAZZY",
    "KNEEL",
    "LEMON",
    "MANGO",
    "NIGHT",
    "ONION",
    "PIZZA",
    "QUICK",
    "RAVEN",
    "SALAD",
    "TABLE",
    "UNITE",
    "VIRUS",
    "WHALE",
    "XYLOP",
    "YUMMY",
    "ZEBRA",
];


const MENSAJES_USER = {
    MENSAJE_ERROR: "ERROR: El texto no es valido.",
    MENSAJE_CONEXION: "Conexión exitosa",
    MENSAJE_ERROR_API: "Conexion fallida con el servidor",
    MENSAJE_ACIERTO: "<h1>GANASTE!😀</h1>",
    MENSAJE_ACIERTO_UI: `<div class='mensajesJugador'><h3 class='success'>GANASTE!😀</h3></div>`,
    MENSAJE_PERDISTE: "<h1>PERDISTE!😖</h1>",
    MENSAJE_PERDISTE_UI: `<div class='mensajesJugador'><h3 class='error'>PERDISTE!😖</h3></div>`,
};

const COLORS_GRID = {
    GREEN: "#2ea44f",
    YELLOW: "#d29922",
    GREY: "#6e7681",
};
const DATOS_MODAL = {
    TEXT_PARRAFO_INICIO:
        'Bienvenido a Wordle PPY! Este es un juego divertido donde tienes que adivinar una palabra secreta. Cada intento te mostrará qué letras has acertado y cuáles están en la palabra, pero en diferentes posiciones. ¡Demuestra tu habilidad con las palabras y diviértete jugando! <br> <samp class="warning" >(Este juego es experimental)</samp>',
    BOTON_CERRAR_MODAL_TEXT: "Inicio juego",
    IMG_INICIO: "./assets/img/modal.jpeg",

    IMG_CREADOR: "./assets/img/modal3.jpeg",
    TEXT_PARRAFO_CREADOR:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi illo quod ut fuga, dignissimos unde quas, incidunt ea eos molestiae sint aut necessitatibus. Perspiciatis, illo dolores delectus nemo commodi saepe.",
    BOTON_CERRAR_MODAL_CREADOR: "Seguir con el Juego",
};

// Variables del Juego
let palabra = "";
let intentos = 6;

// Elementos del DOM

let VENTANA_MODAL = document.getElementById("ventana-modal");
let IMG_MODAL = document.getElementById("modal-img");
let MODAL_TEXT_P = document.getElementById("modal-text-p");
let CERRAR_MODAL = document.getElementById("cerrar-modal");


let GRID = document.getElementById("grid");
let INPUT = document.getElementById("guess-input");
let CONTENEDOR = document.getElementById("guesses");
let BUTTON = document.getElementById("guess-button");
let BUTTON_REINICIO = document.getElementById("guess-button-Reinicio");
let CONTENEDOR_INFO = document.getElementById("contentInfo");
let CONSTENTDATOS = document.getElementById('contentDatosRandon'); 
let SPAN_SABIAS = document.getElementById('sabias-que');

// Evento 
BUTTON.addEventListener("click", procesarIntento);
INPUT.addEventListener("keydown",(event) => event.key === "Enter" && procesarIntento());
BUTTON_REINICIO.addEventListener("click", nuevoJuego);
document.getElementById("btn-creador").addEventListener("click", mostrarCreadorModal);
CERRAR_MODAL.addEventListener("click", () => (VENTANA_MODAL.style.display = "none"));
window.addEventListener("load",iniciarJuego);

// Funciones

function iniciarJuego(){
    mostrarInicioModal();
    obtenerPalabraAleatoria();
    obtenerDatoAleatorio();
}

function obtenerPalabraAleatoria() {
    fetch(URL_API)
        .then((respuesta) => respuesta.json())
        .then((respuesta) => {
            palabra = respuesta[0].toUpperCase();
            console.log(palabra);
        })
        .catch((error) => {
            console.error(MENSAJES_USER.MENSAJE_ERROR_API);
            palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
            console.log(palabra);
        });
}

function procesarIntento() {
    let textoIngresado = INPUT.value.toUpperCase().trim();
    if (textoIngresado.length === 5) {
        mostrarIntento(textoIngresado);
        return;
    }
    alert(MENSAJES_USER.MENSAJE_ERROR);
}

function mostrarIntento(text) {
    let ROW = document.createElement("div");
    ROW.className = "row";

    for (let i = 0; i < palabra.length; i++) {
        let SPAN = document.createElement("span");
        SPAN.className = "letter";

        if (text[i] === palabra[i]) {
            SPAN.innerHTML = text[i];
            SPAN.style.backgroundColor = COLORS_GRID.GREEN;
        } else if (palabra.includes(text[i])) {
            SPAN.innerHTML = text[i];
            SPAN.style.backgroundColor = COLORS_GRID.YELLOW;
        } else {
            SPAN.innerHTML = text[i];
            SPAN.style.backgroundColor = COLORS_GRID.GREY;
        }
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);
    intentos--;
    verificarResultado( text );
}

function verificarResultado( text ){
    if (text === palabra) {
        CONTENEDOR_INFO.innerHTML += MENSAJES_USER.MENSAJE_ACIERTO_UI;
        terminarJuego(MENSAJES_USER.MENSAJE_ACIERTO);
    } 
    else if (intentos === 0) {
        CONTENEDOR_INFO.innerHTML += MENSAJES_USER.MENSAJE_PERDISTE_UI;
        terminarJuego(MENSAJES_USER.MENSAJE_PERDISTE);
    }
}
function terminarJuego(mensaje) {
    BUTTON_REINICIO.style.display = "block";
    INPUT.disabled = true;
    BUTTON.disabled = true;
    CONTENEDOR.innerHTML = mensaje;
}
function nuevoJuego() {
    intentos = 6;
    limpiarUI();
    obtenerPalabraAleatoria();
    obtenerDatoAleatorio();
    BUTTON_REINICIO.style.display = "none";
}
function limpiarUI() {
    GRID.innerHTML = "";
    CONTENEDOR.innerHTML = "";
    INPUT.value = "";
    INPUT.disabled = false;
    BUTTON.disabled = false;
}

function obtenerDatoAleatorio(){
    fetch(URL_DATOS)
    .then(datosREspuesta => datosREspuesta.json())
    .then(datos =>{
        SPAN_SABIAS.innerText = datos[Math.floor(Math.random()*datos.length)].fact;
    })
    .catch(error => console.error(error));
}


function mostrarInicioModal() {
    IMG_MODAL.setAttribute("src", DATOS_MODAL.IMG_INICIO);
    MODAL_TEXT_P.innerHTML = DATOS_MODAL.TEXT_PARRAFO_INICIO;
    CERRAR_MODAL.innerText = DATOS_MODAL.BOTON_CERRAR_MODAL_TEXT;
}
function mostrarCreadorModal() {
    VENTANA_MODAL.style.display = "block";
    IMG_MODAL.setAttribute("src", DATOS_MODAL.IMG_CREADOR);
    MODAL_TEXT_P.innerHTML = DATOS_MODAL.TEXT_PARRAFO_CREADOR;
    CERRAR_MODAL.innerText = DATOS_MODAL.BOTON_CERRAR_MODAL_CREADOR;
}