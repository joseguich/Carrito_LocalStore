//Funciones globales
const $ = selector => document.querySelector(selector);
const log = log => console.log(log);
const $createElement = create => document.createElement(create);

//Seleccionar los selectores del HTML

const listaCursos = $('#lista-cursos');
const carrito = $('#carrito');
const listaCarrito = $('#lista-carrito tbody');
const vaciarCarrito = $('#vaciar-carrito');
let contenedorCurso = [];

//AddEventListener
logEventListner();
function logEventListner() {

    listaCursos.addEventListener('click', agregarCarrito);

    //Eliminar curso
    carrito.addEventListener('click', deleteCourse);

    //Mostrar el localStore 
    document.addEventListener('DOMContentLoaded', () =>{
        contenedorCurso = JSON.parse(localStorage.getItem('carrito')) || [];
        mostrarCursoCarrito();
    });

}
//Funciones

//Add course
function agregarCarrito(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const seleccionarCurso = e.target.parentElement.parentElement;
        datoSeleccionado(seleccionarCurso);
    }
}

//Delete Course
function deleteCourse(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        const courseDelete = e.target.getAttribute('data-id');
        contenedorCurso = contenedorCurso.filter(curso => curso.id !== courseDelete);
        mostrarCursoCarrito();
        Swal.fire(
            'Delete Course',
            'Delete Correct',
            'success'
        );
    }
}

function datoSeleccionado(curso) {

    const cursoSeleccionada = {
        image: curso.querySelector('img').src,
        title: curso.querySelector('h4').textContent,
        price: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    const existe = contenedorCurso.some(curso => curso.id === cursoSeleccionada.id);
    if (existe) {

        const cursos = contenedorCurso.map(curso => {
            if (curso.id === cursoSeleccionada.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        contenedorCurso = [...cursos];
    } else {
        contenedorCurso = [...contenedorCurso, cursoSeleccionada];
    }

    Swal.fire({
        title: curso.querySelector('h4').textContent,
        text: 'Buy Course',
        imageUrl: curso.querySelector('img').src,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',

    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Buying Course', '', 'success')
        }
    });
    //Mostrar Curso
    mostrarCursoCarrito();
}

function mostrarCursoCarrito() {

    //Limpiar
    limpiarCursoPreview();
    contenedorCurso.forEach(curso => {
        const { image, title, price, cantidad, id } = curso;
        //Crear un tr para mostrar en el carrito
        const row = $createElement('tr')
        row.innerHTML = `
                <td><img src = '${image}' width = '75px'></td>
                
                <td>${title}</td>
                <td>${price}</td>
                <td>${cantidad}</td>
                <td><a href ="#" class = 'borrar-curso bx bxs-trash' data-id = "${id}"></a></td> 
            `;
        //Insertar el elemento al carrito
        listaCarrito.appendChild(row);
    });
    asyn()
}

function asyn(){
    localStorage.setItem('carrito', JSON.stringify(contenedorCurso));
}


function limpiarCursoPreview() {
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}