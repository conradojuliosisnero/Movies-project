// ===============================
// Gestor de DOM y Renderizado
// ===============================

import { CONFIG } from './config.js';
import { MovieTemplate } from './movieTemplate.js';

export class DOMManager {
  constructor() {
    //.log('DOMManager: Constructor iniciado');
    this.container = document.querySelector(CONFIG.SELECTORS.container);
    //.log('DOMManager: Selector usado:', CONFIG.SELECTORS.container);
    //.log('DOMManager: Contenedor encontrado:', this.container);
    
    if (!this.container) {
      //.error('DOMManager: No se pudo encontrar el contenedor!');
    }
    
    this.moviesHTML = '';
  }

  /**
   * Renderiza películas en el contenedor
   * @param {Array} movies - Array de películas
   * @param {boolean} append - Si es true, añade al final; si es false, reemplaza
   */
  renderMovies(movies, append = true) {
    //.log('DOMManager: renderMovies llamado');
    //.log('DOMManager: Películas recibidas:', movies?.length);
    //.log('DOMManager: Append:', append);
    
    if (!this.container) {
      //.error('DOMManager: No hay contenedor para renderizar!');
      return;
    }
    
    const moviesHTML = MovieTemplate.generateMoviesGrid(movies);
    //.log('DOMManager: HTML generado, longitud:', moviesHTML.length);
    
    if (append) {
      this.moviesHTML += moviesHTML;
    } else {
      this.moviesHTML = moviesHTML;
    }
    
    //.log('DOMManager: Insertando HTML en contenedor...');
    this.container.innerHTML = this.moviesHTML;
    //.log('DOMManager: HTML insertado exitosamente');
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
    return document.querySelectorAll(CONFIG.SELECTORS.movieCard);
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
      if (movie.getAttribute('data-id') !== movieId) {
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
      if (movie.getAttribute('data-id') === movieId) {
        movie.classList.remove(CONFIG.CSS_CLASSES.movieView);
      }
    });

    container.classList.remove(CONFIG.CSS_CLASSES.movieView);
  }

  /**
   * Limpia el contenedor
   */
  clearContainer() {
    this.container.innerHTML = '';
    this.moviesHTML = '';
  }

  /**
   * Muestra el modal de detalles de película
   * @param {Object} movieDetails - Datos completos de la película
   */
  showMovieDetailModal(movieDetails) {
    const modalHTML = MovieTemplate.generateMovieDetailModal(movieDetails);
    
    // Remover modal existente si existe
    this.removeMovieDetailModal();
    
    // Añadir modal al body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Añadir clase para bloquear scroll del body
    document.body.classList.add(CONFIG.CSS_CLASSES.modalOpen);
    
    // Animación de entrada
    requestAnimationFrame(() => {
      const modal = document.getElementById('movieDetailModal');
      if (modal) {
        modal.classList.add(CONFIG.CSS_CLASSES.detailVisible);
      }
    });
  }

  /**
   * Oculta el modal de detalles de película
   */
  hideMovieDetailModal() {
    const modal = document.getElementById('movieDetailModal');
    
    if (modal) {
      modal.classList.remove(CONFIG.CSS_CLASSES.detailVisible);
      
      // Esperar a que termine la animación antes de remover
      setTimeout(() => {
        this.removeMovieDetailModal();
      }, 300);
    }
    
    // Restaurar scroll del body
    document.body.classList.remove(CONFIG.CSS_CLASSES.modalOpen);
  }

  /**
   * Remueve el modal del DOM
   */
  removeMovieDetailModal() {
    const existingModal = document.getElementById('movieDetailModal');
    if (existingModal) {
      existingModal.remove();
    }
  }

  /**
   * Verifica si el modal está abierto
   * @returns {boolean}
   */
  isModalOpen() {
    return document.getElementById('movieDetailModal') !== null;
  }
}
