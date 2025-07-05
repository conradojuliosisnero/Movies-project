// ===============================
// Gestor de DOM y Renderizado
// ===============================

import { CONFIG } from './config.js';
import { MovieTemplate } from './movieTemplate.js';

export class DOMManager {
  constructor() {
    this.container = document.querySelector(CONFIG.SELECTORS.container);
    this.moviesHTML = '';
  }

  /**
   * Renderiza películas en el contenedor
   * @param {Array} movies - Array de películas
   * @param {boolean} append - Si es true, añade al final; si es false, reemplaza
   */
  renderMovies(movies, append = true) {
    const moviesHTML = MovieTemplate.generateMoviesGrid(movies);
    
    if (append) {
      this.moviesHTML += moviesHTML;
    } else {
      this.moviesHTML = moviesHTML;
    }
    
    this.container.innerHTML = this.moviesHTML;
  }

  /**
   * Añade el filtro al contenedor
   */
  renderFilter() {
    const filterHTML = MovieTemplate.generateFilterHTML();
    this.container.insertAdjacentHTML('afterbegin', filterHTML);
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
}
