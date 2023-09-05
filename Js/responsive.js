const abrirMenu = document.querySelector('.menu__responsive');
const cerrarMenu = document.querySelector('.menu__responsive-quitar');
const menu = document.querySelector('.nav__list');
const logoNav = document.querySelector('.img__nav');
const nav = document.querySelector('.nav');


function mostrarMenu() {
    //abrir el menu
    abrirMenu.addEventListener('click',()=>{
        abrirMenu.classList.toggle('active');
        cerrarMenu.classList.toggle('active');
        menu.classList.toggle('active');
        logoNav.classList.add('active');
        nav.style.padding = "0px 0px";
    })
}

function ocultarMenu() {
    //cerrar el menu
    cerrarMenu.addEventListener('click',()=>{
        abrirMenu.classList.remove('active');
        cerrarMenu.classList.toggle('active');
        menu.classList.toggle('active');
        logoNav.classList.remove('active');
        nav.style.padding = "35px 0px";
    })
}

ocultarMenu(cerrarMenu);
mostrarMenu(abrirMenu);