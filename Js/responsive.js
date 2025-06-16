// ===============================
// Menú Responsive y Navbar dinámico
// ===============================

const abrirMenu = document.querySelector(".menu__responsive");
const cerrarMenu = document.querySelector(".menu__responsive-quitar");
const menu = document.querySelector(".nav__list");
const logoNav = document.querySelector(".img__nav");
const nav = document.querySelector(".nav");
const navScroll = document.getElementById("header");

let ubicacionPrincipal = window.scrollY; // Guarda la posición inicial del scroll

// Esconde o muestra el navbar al hacer scroll
function esconderMenu() {
  let ubicacionActual = window.scrollY;
  if (ubicacionActual > ubicacionPrincipal && ubicacionActual > 80) {
    navScroll.style.transition = "400ms ease";
    navScroll.style.top = "-120px";
  } else {
    navScroll.style.top = "0px";
    navScroll.style.transition = "400ms ease";
  }
  ubicacionPrincipal = ubicacionActual;
}
window.addEventListener("scroll", esconderMenu);

// Abre el menú móvil
function mostrarMenu() {
  abrirMenu.addEventListener("click", () => {
    abrirMenu.classList.toggle("active");
    cerrarMenu.classList.toggle("active");
    menu.classList.toggle("active");
    logoNav.classList.add("active");
    nav.style.padding = "0px 0px";
    document.body.style.overflow = "hidden"; // Evita scroll en fondo
  });
}

// Cierra el menú móvil
function ocultarMenu() {
  cerrarMenu.addEventListener("click", () => {
    abrirMenu.classList.remove("active");
    cerrarMenu.classList.remove("active");
    menu.classList.remove("active");
    logoNav.classList.remove("active");
    nav.style.padding = "35px 0px";
    document.body.style.overflow = "";
  });
}

mostrarMenu();
ocultarMenu();

// Cierra el menú al hacer click fuera del menú en móvil
window.addEventListener("click", (e) => {
  if (
    menu.classList.contains("active") &&
    !menu.contains(e.target) &&
    !abrirMenu.contains(e.target)
  ) {
    abrirMenu.classList.remove("active");
    cerrarMenu.classList.remove("active");
    menu.classList.remove("active");
    logoNav.classList.remove("active");
    nav.style.padding = "35px 0px";
    document.body.style.overflow = "";
  }
});
