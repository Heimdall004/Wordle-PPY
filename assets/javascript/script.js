let intentos = 6;
let diccionario = ["APPLE", "HURLS", "WINGS", "YOUTH"];
let palabra = "";

/**
 * Mensajes al Usuario
 */
const MENSAJES_USER = {
  MENSAJE_ERROR: "ERROR: El texto no es valido.",
  MENSAJE_CONEXION: "Conexión exitosa",
  MENSAJE_ACIERTO: "<h1>GANASTE!😀</h1>",
  MENSAJE_PERDISTE: "<h1>PERDISTE!😖</h1>",
};

const COLORS_GRID = {
  GREEN: "#2ea44f",
  YELLOW: "#d29922",
  GREY: "#6e7681",
};

/**
 * Variables del HTML
 */

let GRID = document.getElementById("grid");
let INPUT = document.getElementById("guess-input");
let CONTENEDOR = document.getElementById("guesses");
let BUTTON = document.getElementById("guess-button");
let BUTTON_REINICIO = document.getElementById("guess-button-Reinicio");

/**
 * Event Listeners y Carga de la Página
 */
window.addEventListener("load", () => {
  aleatorioText();
  console.info(MENSAJES_USER.MENSAJE_CONEXION);
});

// Palabra Aleatoria  // Conectar a una API
function aleatorioText() {
  fetch("https://random-word-api.herokuapp.com/word?length=5&lang=es")
    .then((respuesta) => respuesta.json())
    .then((respuesta) => {
      let palabra = respuesta[0].toUpperCase();
      console.log(respuesta[0].toUpperCase());
    })
    .catch((error) => {
      console.error("Error:", error);
      palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
    });
}

// Evento para el botón de intento
BUTTON.addEventListener("click", procesarIntento);

// Función principal para procesar el intento del usuario
function procesarIntento() {
  let textoIngresado = INPUT.value.toUpperCase().trim();

  if (textoIngresado.length === 5) {
    mostrarIntento(textoIngresado);
    return;
  }
  alert(MENSAJES_USER.MENSAJE_ERROR);
}

// Función para mostrar el intento del usuario y validar
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

  if (text === palabra) {
    terminarJuego(MENSAJES_USER.MENSAJE_ACIERTO);
  }

  if (intentos === 0) {
    terminarJuego(MENSAJES_USER.MENSAJE_PERDISTE);
  }
}

// Función para terminar el juego
function terminarJuego(mensaje) {
  BUTTON_REINICIO.style.display = "block";
  INPUT.disabled = true;
  BUTTON.disabled = true;
  CONTENEDOR.innerHTML = mensaje;
}

// Evento para el botón de reinicio
BUTTON_REINICIO.addEventListener("click", nuevoJuego);

// Función para comenzar un nuevo juego
function nuevoJuego() {
  intentos = 6;
  limpiarUI();
  aleatorioText();
  BUTTON_REINICIO.style.display = "none";
}

// Función para limpiar la interfaz de usuario
function limpiarUI() {
  GRID.innerHTML = "";
  CONTENEDOR.innerHTML = "";
  INPUT.value = "";
  INPUT.disabled = false;
  BUTTON.disabled = false;
}
