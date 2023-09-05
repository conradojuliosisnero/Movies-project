const abrirMenu = document.querySelector('.menu__responsive');
const cerrarMenu = document.querySelector('.menu__responsive-quitar');
const menu = document.querySelector('.nav__list');


function mostrarMenu() {
    //abrir el menu
    abrirMenu.addEventListener('click',()=>{
        abrirMenu.classList.toggle('active');
        cerrarMenu.classList.toggle('active');
        menu.classList.toggle('active');
    })
}

function ocultarMenu() {
    //cerrar el menu
    cerrarMenu.addEventListener('click',()=>{
        abrirMenu.classList.remove('active');
        cerrarMenu.classList.toggle('active');
        menu.classList.toggle('active');
    })
}

ocultarMenu(cerrarMenu);
mostrarMenu(abrirMenu);