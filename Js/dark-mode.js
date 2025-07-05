// ===============================
// Modo Oscuro Mejorado con Animaciones
// ===============================

const btndarkMode = document.querySelector(".input");
const nav = document.querySelector(".nav");
const slaider = document.querySelector(".slider");
const leyend = document.querySelector(".leyenda p a");
const btnLogin = document.querySelector(".btn__login");
const switchElement = document.querySelector(".switch");
const menuResponsive = document.querySelector(".menu__responsive");
const navList = document.querySelector(".nav__list");
const header = document.querySelector("header");

// Función mejorada para alternar el modo oscuro con animaciones
function toggleDarkMode() {
  // Agregar clase de transición para animaciones suaves
  if (switchElement) {
    switchElement.classList.add("transitioning");
    setTimeout(() => {
      switchElement.classList.remove("transitioning");
    }, 600);
  }
  
  // Animación de pulso en el body
  document.body.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
  
  // Toggle de clases
  document.body.classList.toggle("modo-oscuro");
  if (nav) nav.classList.toggle("nav-dark");
  if (leyend) leyend.classList.toggle("leyend_dark");
  if (btnLogin) btnLogin.classList.toggle("dark");
  if (btndarkMode) btndarkMode.classList.toggle("dark-btn");
  if (slaider) slaider.classList.toggle("dark-btn");

  // Efectos visuales adicionales
  const isDark = document.body.classList.contains("modo-oscuro");
  
  // Cambiar el cursor temporalmente para feedback visual
  document.body.style.cursor = "wait";
  setTimeout(() => {
    document.body.style.cursor = "default";
  }, 400);
  
  // Animación de ondas en la página
  createRippleEffect();
  
  // Guardar estado en localStorage
  localStorage.setItem("oscuro", isDark);
  localStorage.setItem("dark-btn", btndarkMode.classList.contains("dark-btn"));
  
  // Anunciar cambio para accesibilidad
  announceThemeChange(isDark);
}

// Función para crear efecto de ondas al cambiar tema
function createRippleEffect() {
  const ripple = document.createElement('div');
  ripple.className = 'theme-ripple';
  ripple.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, rgba(79, 195, 247, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    pointer-events: none;
    z-index: 9999;
    animation: rippleExpand 0.6s ease-out forwards;
  `;
  
  // Agregar keyframes para la animación si no existen
  if (!document.querySelector('#ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
      @keyframes rippleExpand {
        to {
          transform: translate(-50%, -50%) scale(100);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Función para anunciar cambio de tema (accesibilidad)
function announceThemeChange(isDark) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.cssText = `
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  `;
  announcement.textContent = isDark ? 'Modo oscuro activado' : 'Modo claro activado';
  
  document.body.appendChild(announcement);
  setTimeout(() => announcement.remove(), 1000);
}

// Función mejorada para el menú hamburguesa con animaciones
function toggleMobileMenu() {
  if (!navList || !menuResponsive) return;
  
  const isActive = navList.classList.contains("active");
  
  // Toggle clases con animaciones
  navList.classList.toggle("active");
  menuResponsive.classList.toggle("active");
  document.body.classList.toggle("menu-open");
  
  // Prevenir scroll cuando el menú está abierto
  if (!isActive) {
    document.body.style.overflow = "hidden";
    // Animación de entrada para cada elemento del menú
    const menuItems = navList.querySelectorAll('.list__li');
    menuItems.forEach((item, index) => {
      item.style.animationDelay = `${0.1 + index * 0.1}s`;
    });
  } else {
    document.body.style.overflow = "auto";
  }
  
  // Feedback háptico en dispositivos compatibles
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
}

// Función para detectar scroll y animar header
function handleScroll() {
  if (!header) return;
  
  const scrolled = window.scrollY > 50;
  
  if (scrolled) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

// Event Listeners principales
if (btndarkMode) {
  btndarkMode.addEventListener("click", toggleDarkMode);
}

if (menuResponsive) {
  menuResponsive.addEventListener("click", toggleMobileMenu);
}

// Scroll listener con throttling para mejor rendimiento
let scrollTimeout;
window.addEventListener("scroll", () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  scrollTimeout = setTimeout(handleScroll, 10);
});

// Cerrar menú al hacer clic en un enlace
if (navList) {
  const menuLinks = navList.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navList.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });
}

// Cerrar menú al hacer clic fuera de él
document.addEventListener('click', (e) => {
  if (navList && navList.classList.contains('active')) {
    if (!navList.contains(e.target) && !menuResponsive.contains(e.target)) {
      toggleMobileMenu();
    }
  }
});

// Manejar tecla Escape para cerrar menú
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navList && navList.classList.contains('active')) {
    toggleMobileMenu();
  }
});

// Aplicar modo oscuro guardado al cargar la página
function aplicarModoOscuroGuardado() {
  const oscuroGuardado = localStorage.getItem("oscuro") === "true";
  const btnOscuroGuardado = localStorage.getItem("dark-btn") === "true";
  
  if (oscuroGuardado) {
    document.body.classList.add("modo-oscuro");
    if (nav) nav.classList.add("nav-dark");
    if (leyend) leyend.classList.add("leyend_dark");
    if (btnLogin) btnLogin.classList.add("dark");
  }
  
  if (btnOscuroGuardado) {
    if (btndarkMode) btndarkMode.classList.add("dark-btn");
    if (slaider) slaider.classList.add("dark-btn");
  }
  
  // Agregar clase de animación de entrada al switch
  if (switchElement) {
    switchElement.classList.add("animate-in");
  }
}

// Inicialización cuando el DOM está listo
document.addEventListener("DOMContentLoaded", () => {
  aplicarModoOscuroGuardado();
  handleScroll(); // Verificar posición inicial de scroll
  
  // Agregar clase para indicar que JS está cargado
  document.body.classList.add("js-loaded");
  
  // Precargar estilos de hover para mejor rendimiento
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = window.location.href;
  document.head.appendChild(link);
});

aplicarModoOscuroGuardado();
