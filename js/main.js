const formulario = document.querySelector('#formulario');
const input1 = document.querySelector('#floatingInput');
const input2 = document.querySelector('#floatingUniverse');
const lista = document.querySelector('#listaPersonajes');

formulario.addEventListener('submit', getData)

function getData(event) {
    event.preventDefault();

    const valor1 = input1.value.trim();
    const valor2 = input2.value.trim();

    if (valor1 !== '' && valor2 !== '') {
        const nuevoElementoTexto = `El personaje: ${valor1}, es del universo: ${valor2}`;
        const elementos = lista.getElementsByTagName('li');
        let existe = false;

        for (let li of elementos) {
            if (li.textContent.includes(nuevoElementoTexto)) {
                existe = true;
                break;
            }
        }

        if (!existe) {
            document.getElementById('titulolista').style.display = 'block';
            const nuevoElemento = document.createElement('li');
            nuevoElemento.textContent = nuevoElementoTexto;
            nuevoElemento.classList.add("listado");

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'X';
            botonEliminar.classList.add("eliminar");

            botonEliminar.addEventListener('click', function () {
                lista.removeChild(nuevoElemento);
            });

            nuevoElemento.appendChild(botonEliminar);
            lista.appendChild(nuevoElemento);

            input1.value = '';
            input2.value = '';
        } else {
            alert('Este valor ya ha sido agregado a la lista.');
        }
    } else {
        alert('Por favor, rellena ambos campos.');
    }
};

