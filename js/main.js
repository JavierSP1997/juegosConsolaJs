const formulario = document.querySelector('#formulario');
const input1 = document.querySelector('#floatingInput');
const input2 = document.querySelector('#floatingUniverse');
const lista = document.querySelector('#listaPersonajes');

formulario.addEventListener('submit', getData)

function getData(event) {
    event.preventDefault();

    const valor1 = input1.value;
    const valor2 = input2.value;

    if (valor1 !== '' && valor2 !== '') {
        const nuevoElemento = document.createElement('li');
        nuevoElemento.textContent = `${valor1} - ${valor2}`;
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', function () {
            lista.removeChild(nuevoElemento);
        });
        nuevoElemento.appendChild(botonEliminar);
        lista.appendChild(nuevoElemento);
        input1.value = '';
        input2.value = '';
    } else {
        alert('Por favor, rellena ambos campos.');
    }
};

