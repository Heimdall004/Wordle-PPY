let intentos = 6;
let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH'];
let palabra = '';

/**
 * Mensajes al Usuario
 */
const MENSAJES_USER = {
    MENSAJE_ERROR: 'ERROR: El texto no es valido.',
    MENSAJE_CONEXION: 'Conexión exitosa',
    MENSAJE_ACIERTO: '<h1>GANASTE!😀</h1>',
    MENSAJE_PERDISTE: '<h1>PERDISTE!😖</h1>'
};

const COLORS_GRID = {
    GREEN: '#2ea44f',
    YELLOW: '#d29922',
    GREY: '#6e7681' 
};

/**
 * Funciones del Juego
 */

// Palabra Aleatoria
function aleatorioText(){
    palabra = diccionario[Math.floor(Math.random()*diccionario.length)];
}

// Función para limpiar la interfaz de usuario
function limpiarUI() {
    const GRID = document.getElementById("grid");
    const INPUT = document.getElementById('guess-input');
    const CONTENEDOR = document.getElementById('guesses');
    const BUTTON = document.getElementById('guess-button');
    
    GRID.innerHTML = '';
    CONTENEDOR.innerHTML = '';
    INPUT.value = ''; 
    INPUT.disabled = false;
    BUTTON.disabled = false;
}

// Función para comenzar un nuevo juego
function nuevoJuego() {
    intentos = 6;
    limpiarUI();
    aleatorioText();
    buttonReinicio.style.display='none';
}


// Función principal para procesar el intento del usuario
function procesarIntento() {
    const INPUT = document.getElementById('guess-input').value.toUpperCase().trim();
    
    if (INPUT.length === 5) {
        mostrarIntento(INPUT);
        return;
    } 
    alert(MENSAJES_USER.MENSAJE_ERROR);
    
}

// Función para mostrar el intento del usuario y validar
function mostrarIntento(text) {
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    
    if (text === palabra) {
        terminarJuego(MENSAJES_USER.MENSAJE_ACIERTO);
        return;
    }
    
    for (let i = 0; i < palabra.length; i++) {
        let SPAN = document.createElement('span');
        SPAN.className = 'letter';
        
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
    
    if (intentos === 0) {
        terminarJuego(MENSAJES_USER.MENSAJE_PERDISTE);
    }
}

// Función para terminar el juego
function terminarJuego(mensaje) {
    const BUTTON = document.getElementById('guess-button');
    const INPUT = document.getElementById('guess-input');
    const contenedor = document.getElementById('guesses');
    document.getElementById('guess-button-Reinicio').style.display='block';
    
    INPUT.disabled = true;
    BUTTON.disabled = true;

    contenedor.innerHTML = mensaje;
}

/**
 * Event Listeners y Carga de la Página
 */
window.addEventListener('load', () => {
    aleatorioText();
    console.info(MENSAJES_USER.MENSAJE_CONEXION);
});

// Evento para el botón de intento
const button = document.getElementById('guess-button');
button.addEventListener('click', procesarIntento);

// Evento para el botón de reinicio
const buttonReinicio = document.getElementById('guess-button-Reinicio');
buttonReinicio.addEventListener('click', nuevoJuego);