const abrirMenu = document.querySelector('.menu__responsive');
const cerrarMenu = document.querySelector('.menu__responsive-quitar');
const menu = document.querySelector('.nav__list');
const logoNav = document.querySelector('.img__nav');
const nav = document.querySelector('.nav');
const navScroll = document.getElementById("header");

// menu dinamico 
let ubicacionPrincipal = window.scrollY;//ubicacion en 0

    // funcion de esconder el menu 
function esconderMenu() {
        //ubicacion al hacer scroll
        let ubicacionActual = window.scrollY;
        //si la ubicacion en actual es mayor a 0 
        if (ubicacionActual >= ubicacionPrincipal) {
            navScroll.style.transition = "400ms ease";
            navScroll.style.top = "-120px";
        }else{
            navScroll.style.top = "0px";
            navScroll.style.transition = "400ms ease";
        }

        // ahora la ubicaion en 0 pasa a ser la ubicacion actual 
        ubicacionPrincipal = ubicacionActual;
}
    // ejecutamos la funcion 
window.addEventListener('scroll',esconderMenu);


// menu responsive
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