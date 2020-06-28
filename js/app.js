// variables 
const carrito       = document.getElementById('carrito');
const cursos        = document.getElementById('lista-cursos');
const listaCursos   = document.querySelector('#lista-carrito tbody');

// listeners 
cargarEventListeners();

function cargarEventListeners() {
    // dispara cuando se presiona agregar carrito
    cursos.addEventListener('click', comprarCurso);

    carrito.addEventListener('click', eliminarCurso);
}


// funciones 
// funcion que añade el curso al carrito
function comprarCurso(e) {
    e.preventDefault();

    // delegation para agregar carrito 
    if (e.target.classList.contains('agregar-carrito')) {
        // console.log('si');
        // enviar curso seleccionado para leer sus datos
        const curso = e.target.parentElement.parentElement;

        // console.log(curso);
        leerDatosCurso(curso);
    }
}

// leer los datos del curso 
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    // console.log(infoCurso);
    insertarCarrito(infoCurso);
}

function insertarCarrito(curso) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width="100">
        </td>
        <td>
            ${curso.titulo}
        </td>
        <td>
            ${curso.precio}
        </td>
        <td>
            <a href="#" class="borrar-curso"  data-id="${curso.id}">X</a>
        </td>
    `;

    listaCursos.appendChild(row);
}

// eliminar un curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();

    let curso;

    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
    }
    // console.log('Eliminado');
}