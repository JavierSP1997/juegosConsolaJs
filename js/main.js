const formulario = document.querySelector('#formulario');
const input1 = document.querySelector('#floatingInput');
const input2 = document.querySelector('#floatingUniverse');
const lista = document.querySelector('#listaPersonajes');

// Cargar los personajes guardados en localStorage cuando la página se recarga
document.addEventListener('DOMContentLoaded', cargarPersonajes);

// Evento para agregar un nuevo personaje
formulario.addEventListener('submit', getData);

function getData(event) {
    event.preventDefault();

    const valor1 = input1.value.trim();
    const valor2 = input2.value.trim();

    if (valor1 !== '' && valor2 !== '') {
        const nuevoElementoTexto = `El personaje: ${valor1}, es del universo: ${valor2}`;

        // Verificar si el personaje ya existe en la lista
        const personajes = obtenerPersonajesDeStorage();
        if (personajes.some(personaje => personaje.texto === nuevoElementoTexto)) {
            alert('Este valor ya ha sido agregado a la lista.');
        } else {
            // Crear un nuevo objeto para almacenar en localStorage
            const nuevoPersonaje = {
                texto: nuevoElementoTexto
            };
            personajes.push(nuevoPersonaje);

            // Guardar el nuevo array de personajes en localStorage
            guardarPersonajesEnStorage(personajes);

            // Mostrar el nuevo personaje en la lista
            agregarElementoALista(nuevoElementoTexto);
        }

        // Limpiar los campos de entrada
        input1.value = '';
        input2.value = '';
    } else {
        alert('Por favor, rellena ambos campos.');
    }
}

// Función para agregar un personaje a la lista del DOM
function agregarElementoALista(texto) {
    document.getElementById('titulolista').style.display = 'block';

    const nuevoElemento = document.createElement('li');
    nuevoElemento.textContent = texto;
    nuevoElemento.classList.add("listado");

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'X';
    botonEliminar.classList.add("eliminar");

    // Eliminar el personaje de la lista y localStorage
    botonEliminar.addEventListener('click', function () {
        nuevoElemento.remove();
        eliminarPersonajeDeStorage(texto);
    });

    nuevoElemento.appendChild(botonEliminar);
    lista.appendChild(nuevoElemento);
}

// Función para cargar los personajes desde localStorage
function cargarPersonajes() {
    const personajes = obtenerPersonajesDeStorage();
    personajes.forEach(personaje => {
        agregarElementoALista(personaje.texto);
    });
}

// Obtener los personajes almacenados en localStorage
function obtenerPersonajesDeStorage() {
    const personajes = localStorage.getItem('personajes');
    return personajes ? JSON.parse(personajes) : [];
}

// Guardar los personajes en localStorage
function guardarPersonajesEnStorage(personajes) {
    localStorage.setItem('personajes', JSON.stringify(personajes));
}

// Eliminar un personaje de localStorage
function eliminarPersonajeDeStorage(texto) {
    let personajes = obtenerPersonajesDeStorage();
    personajes = personajes.filter(personaje => personaje.texto !== texto);
    guardarPersonajesEnStorage(personajes);
}
