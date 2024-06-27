let intentos = 6;
let diccionario = ["APPLE", "HURLS", "WINGS", "YOUTH"];
let palabra = "";

/**
 * Mensajes al Usuario
 */
const MENSAJES_USER = {
  MENSAJE_ERROR: "ERROR: El texto no es valido.",
  MENSAJE_CONEXION: "Conexión exitosa",
  MENSAJE_ERROR_API: "Conexion fallida con el servidor",
  MENSAJE_ACIERTO: "<h1>GANASTE!😀</h1>",
  MENSAJE_PERDISTE: "<h1>PERDISTE!😖</h1>",
};

const COLORS_GRID = {
  GREEN: "#2ea44f",
  YELLOW: "#d29922",
  GREY: "#6e7681",
};

const URL_DATA ={
  URL_API : 'https://random-word.ryanrk.com/api/en/word/random/?length=5',
  URL_DATOS: './assets/json/DatosCuriosos.json'
}

/**
 * Variables del HTML
 */

let GRID = document.getElementById("grid");
let INPUT = document.getElementById("guess-input");
let CONTENEDOR = document.getElementById("guesses");
let BUTTON = document.getElementById("guess-button");
let BUTTON_REINICIO = document.getElementById("guess-button-Reinicio");

let VENTANA_MODAL = document.getElementById('ventana-modal');
let SPAN_SABIAS = document.getElementById('sabias-que');

VENTANA_MODAL.addEventListener('click',()=> VENTANA_MODAL.style.display = 'none'); 

/**
 * Event Listeners y Carga de la Página
 */
window.addEventListener("load", () => {
  aleatorioText();
  sabiasQue();
  console.info(MENSAJES_USER.MENSAJE_CONEXION);
});

// Palabra Aleatoria  // Conectar a una API
function aleatorioText() {
  fetch(URL_DATA.URL_API)
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

// Evento para el botón de intento
BUTTON.addEventListener("click", procesarIntento);
INPUT.addEventListener('keydown',function(event){
  if(event.key === 'Enter'){
    procesarIntento();
  }
});


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
  sabiasQue();
  BUTTON_REINICIO.style.display = "none";
}

// Header sabias que? 
function sabiasQue(){
  fetch(URL_DATA.URL_DATOS)
  .then(datosREspuesta => datosREspuesta.json())
  .then(datos =>{
    SPAN_SABIAS.innerText = datos[Math.floor(Math.random()*datos.length)].fact;
  })
  .catch(error => console.error(error));
}

// Función para limpiar la interfaz de usuario
function limpiarUI() {
  GRID.innerHTML = "";
  CONTENEDOR.innerHTML = "";
  INPUT.value = "";
  INPUT.disabled = false;
  BUTTON.disabled = false;
}
