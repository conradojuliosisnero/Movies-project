// ===============================
// Gestor de DOM y Renderizado
// ===============================

import { CONFIG } from "./config.js";
import { MovieTemplate } from "./movieTemplate.js";

export class DOMManager {
  constructor() {
    this.container = document.querySelector(CONFIG.SELECTORS.container);

    if (!this.container) {
      console.error("DOMManager: No se pudo encontrar el contenedor!");
    }

    this.moviesHTML = "";
  }

  /**
   * Renderiza películas en el contenedor
   * @param {Array} movies - Array de películas
   * @param {boolean} append - Si es true, añade al final; si es false, reemplaza
   */
  renderMovies(movies, append = true) {
    if (!this.container) {
      console.error("DOMManager: No hay contenedor para renderizar!");
      return;
    }

    const moviesHTML = MovieTemplate.generateMoviesGrid(movies);

    if (append) {
      this.moviesHTML += moviesHTML;
    } else {
      this.moviesHTML = moviesHTML;
    }

    this.container.innerHTML = this.moviesHTML;
  }

  /**
   * Muestra estado de carga
   */
  showLoading() {
    const loadingHTML = MovieTemplate.generateLoadingHTML();
    this.container.innerHTML = loadingHTML;
  }

  /**
   * Muestra mensaje de error
   * @param {string} message - Mensaje de error
   */
  showError(message) {
    const errorHTML = MovieTemplate.generateErrorHTML(message);
    this.container.innerHTML = errorHTML;
  }

  /**
   * Obtiene todas las películas actualmente en el DOM
   * @returns {NodeList} - Lista de elementos de película
   */
  getAllMovieElements() {
    return this.container.querySelectorAll(CONFIG.SELECTORS.movieCard);
  }

  /**
   * Obtiene la última película en el DOM (para scroll infinito)
   * @returns {Element|null} - Último elemento de película
   */
  getLastMovieElement() {
    const movies = this.getAllMovieElements();
    return movies.length > 0 ? movies[movies.length - 1] : null;
  }

  /**
   * Muestra la vista detallada de una película
   * @param {string} movieId - ID de la película
   */
  showMovieDetail(movieId) {
    const movies = this.getAllMovieElements();
    const container = this.container;

    movies.forEach((movie) => {
      if (movie.getAttribute("data-id") !== movieId) {
        movie.classList.add(CONFIG.CSS_CLASSES.hidden);
      } else {
        movie.classList.add(CONFIG.CSS_CLASSES.movieView);
      }
    });

    container.classList.add(CONFIG.CSS_CLASSES.movieView);
  }

  /**
   * Vuelve a la vista de grid de películas
   * @param {string} movieId - ID de la película que estaba en detalle
   */
  hideMovieDetail(movieId) {
    const movies = this.getAllMovieElements();
    const container = this.container;

    movies.forEach((movie) => {
      movie.classList.remove(CONFIG.CSS_CLASSES.hidden);
      if (movie.getAttribute("data-id") === movieId) {
        movie.classList.remove(CONFIG.CSS_CLASSES.movieView);
      }
    });

    container.classList.remove(CONFIG.CSS_CLASSES.movieView);
  }

  /**
   * Limpia el contenedor
   */
  clearContainer() {
    this.container.innerHTML = "";
    this.moviesHTML = "";
  }

  /**
   * Muestra el modal de detalles de película
   * @param {Object} movieDetails - Datos completos de la película
   */
  showMovieDetailModal(movieDetails) {
    // Crear modal overlay
    const modalHTML = `
      <div class="modal-overlay" id="movieModal">
        <div class="modal-content">
          <button class="modal-close" onclick="this.parentElement.parentElement.remove()">
            <i class="fas fa-times"></i>
          </button>
          ${MovieTemplate.generateMovieDetailPage(movieDetails)}
        </div>
      </div>
    `;

    // Añadir modal al body
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Prevenir scroll del body
    document.body.style.overflow = "hidden";
  }

  /**
   * Verifica si un elemento está visible en el viewport
   * @param {Element} element - Elemento a verificar
   * @returns {boolean} - True si está visible
   */
  isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Obtiene elementos de película que están en el viewport
   * @returns {Element[]} - Array de elementos visibles
   */
  getMoviesInViewport() {
    const movies = this.getAllMovieElements();
    return Array.from(movies).filter((movie) =>
      this.isElementInViewport(movie)
    );
  }

  /**
   * Añade clase de animación a elementos
   * @param {string} className - Clase de animación
   * @param {number} delay - Retraso entre elementos (ms)
   */
  animateMovies(className = "fade-in", delay = 100) {
    const movies = this.getAllMovieElements();
    movies.forEach((movie, index) => {
      setTimeout(() => {
        movie.classList.add(className);
      }, index * delay);
    });
  }

  /**
   * Scroll suave al top de la página
   */
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /**
   * Muestra notificación toast
   * @param {string} message - Mensaje a mostrar
   * @param {string} type - Tipo de notificación (success, error, info)
   */
  showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Mostrar y ocultar después de 3 segundos
    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}
