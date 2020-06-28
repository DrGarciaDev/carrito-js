// variables 
const carrito           = document.getElementById('carrito');
const cursos            = document.getElementById('lista-cursos');
const listaCursos       = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn  = document.getElementById('vaciar-carrito');

// listeners 
cargarEventListeners();

function cargarEventListeners() {
    // dispara cuando se presiona agregar carrito
    cursos.addEventListener('click', comprarCurso);

    // cuando se elimina un curso del carrito 
    carrito.addEventListener('click', eliminarCurso);

    // al vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // al cargar el documento mostrar el local storage 
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
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
    guardarCursoLocalStorage(curso);
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

// elimina los cursos del carrito 
function vaciarCarrito() {
    // forma lenta 
    // listaCursos.innerHTML = '';
    // forma rapida y recomendada 
    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }

    return false;
}

// almacena cursos en el carrito 
function guardarCursoLocalStorage(curso) {
    let cursos;

    // toma el valor de un arreglo con datos del local storage o vacio 
    cursos = obtenerCursosLocalStorage();

    // el cursoseleccionado se agrega al carrito 
    cursos.push(curso);

    // agrega los cursos al local storage 
    localStorage.setItem('cursos', JSON.stringify(cursos));
}

// comprueba que haya elementos en local storage 
function obtenerCursosLocalStorage() {
    let cursosLS;

    if (localStorage.getItem('cursos') === null) {
        cursosLS = [];
    }else{
        cursosLS = JSON.parse( localStorage.getItem('cursos') );
    }

    return cursosLS;
}

// imprime los cursos del locarl storage en el carrito 
function leerLocalStorage() {
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(curso){
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
    });
}