// ===============================
// Gestor de Eventos de la Aplicación
// ===============================

import { CONFIG } from './config.js';

export class EventManager {
  constructor(domManager, router) {
    this.domManager = domManager;
    this.router = router;
    this.setupEventListeners();
  }

  /**
   * Configura todos los event listeners de la aplicación
   */
  setupEventListeners() {
    // Delegación de eventos en el contenedor principal
    this.domManager.container.addEventListener('click', (event) => {
      // Manejo de clics en enlaces de película (routing)
      if (event.target.matches(CONFIG.SELECTORS.movieLink)) {
        event.preventDefault();
        this.handleMovieLinkClick(event);
      }

      // Manejo de clics en botón de regresar (legacy)
      if (event.target.closest(CONFIG.SELECTORS.backButton)) {
        this.handleBackClick(event);
      }

      // Manejo de clics en películas similares
      if (event.target.closest('.similar-link')) {
        event.preventDefault();
        this.handleSimilarMovieClick(event);
      }
    });

    // Event listener para el filtro
    this.setupFilterListener();

    // Event listener para navegación del browser
    this.setupNavigationListener();
  }

  /**
   * Maneja el clic en un enlace de película para navegar a detalles
   * @param {Event} event - Evento de clic
   */
  handleMovieLinkClick(event) {
    const movieId = event.target.getAttribute('data-id');
    const movieUrl = `/movie/${movieId}`;
    
    //.log('Navegando a película:', movieId);
    
    // Navegar usando el router
    this.router.navigate(movieUrl);
    
    // Emite evento personalizado
    this.emitCustomEvent('movieLinkClicked', { movieId, url: movieUrl });
  }

  /**
   * Maneja el clic en una película similar
   * @param {Event} event - Evento de clic
   */
  handleSimilarMovieClick(event) {
    const link = event.target.closest('.similar-link');
    const href = link.getAttribute('href');
    
    //.log('Navegando a película similar:', href);
    
    // Navegar usando el router
    this.router.navigate(href);
    
    // Scroll al top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Maneja el clic en el botón de regresar (legacy - para vista anterior)
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
   * Configura listeners para navegación del browser
   */
  setupNavigationListener() {
    // Interceptar clics en enlaces del header/nav si existen
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href]');
      if (link && this.isInternalLink(link.href)) {
        const href = link.getAttribute('href');
        if (href.startsWith('/') || href.startsWith('#')) {
          event.preventDefault();
          this.router.navigate(href);
        }
      }
    });
  }

  /**
   * Verifica si un enlace es interno
   * @param {string} href - URL del enlace
   * @returns {boolean}
   */
  isInternalLink(href) {
    try {
      const url = new URL(href, window.location.origin);
      return url.origin === window.location.origin;
    } catch {
      return true; // Enlaces relativos
    }
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
