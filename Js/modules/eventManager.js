// ===============================
// Gestor de Eventos de la Aplicación
// ===============================

import { CONFIG } from './config.js';

export class EventManager {
  constructor(domManager) {
    this.domManager = domManager;
    this.setupEventListeners();
  }

  /**
   * Configura todos los event listeners de la aplicación
   */
  setupEventListeners() {
    // Delegación de eventos en el contenedor principal
    this.domManager.container.addEventListener('click', (event) => {
      // Manejo de clics en enlaces de película
      if (event.target.matches(CONFIG.SELECTORS.movieLink)) {
        event.preventDefault();
        this.handleMovieClick(event);
      }

      // Manejo de clics en botón de regresar
      if (event.target.closest(CONFIG.SELECTORS.backButton)) {
        this.handleBackClick(event);
      }
    });

    // Event listener para el filtro
    this.setupFilterListener();
  }

  /**
   * Maneja el clic en una película para mostrar detalles
   * @param {Event} event - Evento de clic
   */
  handleMovieClick(event) {
    const movieId = event.target.getAttribute('data-id');
    console.log('ID de la película seleccionada:', movieId);
    
    this.domManager.showMovieDetail(movieId);
    
    // Emite evento personalizado para que otros módulos puedan escuchar
    this.emitCustomEvent('movieSelected', { movieId });
  }

  /**
   * Maneja el clic en el botón de regresar
   * @param {Event} event - Evento de clic
   */
  handleBackClick(event) {
    // Encuentra el ID de la película actual
    const movieElement = event.target.closest(CONFIG.SELECTORS.movieCard);
    const movieId = movieElement?.getAttribute('data-id');
    
    if (movieId) {
      this.domManager.hideMovieDetail(movieId);
      
      // Emite evento personalizado
      this.emitCustomEvent('movieDeselected', { movieId });
    }
  }

  /**
   * Configura el listener para el filtro de películas
   */
  setupFilterListener() {
    // Usamos delegación de eventos para el filtro
    this.domManager.container.addEventListener('change', (event) => {
      if (event.target.matches('#movieFilter')) {
        const filterValue = event.target.value;
        this.emitCustomEvent('filterChanged', { filterValue });
      }
    });
  }

  /**
   * Emite un evento personalizado
   * @param {string} eventName - Nombre del evento
   * @param {Object} detail - Datos del evento
   */
  emitCustomEvent(eventName, detail) {
    const customEvent = new CustomEvent(eventName, { detail });
    document.dispatchEvent(customEvent);
  }

  /**
   * Añade listener para eventos personalizados
   * @param {string} eventName - Nombre del evento
   * @param {Function} callback - Función callback
   */
  addEventListener(eventName, callback) {
    document.addEventListener(eventName, callback);
  }

  /**
   * Remueve listener de eventos personalizados
   * @param {string} eventName - Nombre del evento
   * @param {Function} callback - Función callback
   */
  removeEventListener(eventName, callback) {
    document.removeEventListener(eventName, callback);
  }
}
