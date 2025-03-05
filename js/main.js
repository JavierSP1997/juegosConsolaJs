const formulario = document.querySelector('#formulario');
const input1 = document.querySelector('#floatingInput');
const input2 = document.querySelector('#floatingUniverse');
const lista = document.querySelector('#listaPersonajes');

document.addEventListener('DOMContentLoaded', cargarPersonajes);

formulario.addEventListener('submit', getData);

function getData(event) {
    event.preventDefault();

    const valor1 = input1.value.trim();
    const valor2 = input2.value.trim();

    if (valor1 !== '' && valor2 !== '') {
        const nuevoElementoTexto = `El personaje: ${valor1}, es del universo: ${valor2}`;

        const personajes = obtenerPersonajesDeStorage();
        if (personajes.some(personaje => personaje.texto === nuevoElementoTexto)) {
            alert('Este valor ya ha sido agregado a la lista.');
        } else {
            const nuevoPersonaje = {
                texto: nuevoElementoTexto
            };
            personajes.push(nuevoPersonaje);
            guardarPersonajesEnStorage(personajes);
            agregarElementoALista(nuevoElementoTexto);
        }

        input1.value = '';
        input2.value = '';
    } else {
        alert('Por favor, rellena ambos campos.');
    }
}

function agregarElementoALista(texto) {
    document.getElementById('titulolista').style.display = 'block';

    const nuevoElemento = document.createElement('li');
    nuevoElemento.textContent = texto;
    nuevoElemento.classList.add("listado");

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'X';
    botonEliminar.classList.add("eliminar");

    botonEliminar.addEventListener('click', function () {
        nuevoElemento.remove();
        eliminarPersonajeDeStorage(texto);
    });

    nuevoElemento.appendChild(botonEliminar);
    lista.appendChild(nuevoElemento);
}


function cargarPersonajes() {
    const personajes = obtenerPersonajesDeStorage();
    personajes.forEach(personaje => {
        agregarElementoALista(personaje.texto);
    });
}


function obtenerPersonajesDeStorage() {
    const personajes = localStorage.getItem('personajes');
    return personajes ? JSON.parse(personajes) : [];
}


function guardarPersonajesEnStorage(personajes) {
    localStorage.setItem('personajes', JSON.stringify(personajes));
}


function eliminarPersonajeDeStorage(texto) {
    let personajes = obtenerPersonajesDeStorage();
    personajes = personajes.filter(personaje => personaje.texto !== texto);
    guardarPersonajesEnStorage(personajes);
}
