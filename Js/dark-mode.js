// ===============================
// Modo Oscuro Mejorado y Accesible
// ===============================

const btndarkMode = document.querySelector(".input");
const nav = document.querySelector(".nav");
const slaider = document.querySelector(".slider");
const leyend = document.querySelector(".leyenda p a");
const btnLogin = document.querySelector(".btn__login");

// Aplica o quita clases de modo oscuro
function toggleDarkMode() {
  document.body.classList.toggle("modo-oscuro");
  nav.classList.toggle("nav-dark");
  leyend.classList.toggle("leyend_dark");
  btnLogin.classList.toggle("dark");
  btndarkMode.classList.toggle("dark-btn");
  slaider.classList.toggle("dark-btn");

  // Guarda el estado en localStorage
  localStorage.setItem(
    "oscuro",
    document.body.classList.contains("modo-oscuro")
  );
  localStorage.setItem("dark-btn", btndarkMode.classList.contains("dark-btn"));
}

// Listener principal para el switch
btndarkMode.addEventListener("click", toggleDarkMode);

// Aplica el modo oscuro guardado al cargar la página
function aplicarModoOscuroGuardado() {
  if (localStorage.getItem("oscuro") === "true") {
    document.body.classList.add("modo-oscuro");
    nav.classList.add("nav-dark");
    leyend.classList.add("leyend_dark");
    btnLogin.classList.add("dark");
  } else {
    document.body.classList.remove("modo-oscuro");
    nav.classList.remove("nav-dark");
    leyend.classList.remove("leyend_dark");
    btnLogin.classList.remove("dark");
  }
  if (localStorage.getItem("dark-btn") === "true") {
    btndarkMode.classList.add("dark-btn");
    slaider.classList.add("dark-btn");
  } else {
    btndarkMode.classList.remove("dark-btn");
    slaider.classList.remove("dark-btn");
  }
}

aplicarModoOscuroGuardado();
