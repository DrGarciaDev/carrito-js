// variables 
const carrito   = document.getElementById('carrito');
const cursos    = document.getElementById('lista-cursos');


// listeners 
cargarEventListeners();

function cargarEventListeners() {
    // dispara cuando se presiona agregar carrito
    cursos.addEventListener('click', comprarCurso);
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
    console.log(curso);
}