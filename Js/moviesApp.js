// ===============================
// Aplicación Principal de Películas (Modular)
// ===============================

import { APIService } from './modules/apiService.js';
import { DOMManager } from './modules/domManager.js';
import { EventManager } from './modules/eventManager.js';
import { InfiniteScrollManager } from './modules/infiniteScrollManager.js';

class MoviesApp {
  constructor() {
    this.domManager = new DOMManager();
    this.eventManager = new EventManager(this.domManager);
    this.infiniteScrollManager = new InfiniteScrollManager(this.loadMoreMovies.bind(this));
    this.currentFilter = 'popular';
    
    this.init();
  }

  /**
   * Inicializa la aplicación
   */
  async init() {
    try {
      this.setupEventListeners();
      this.domManager.renderFilter();
      await this.loadInitialMovies();
    } catch (error) {
      console.error('Error al inicializar la aplicación:', error);
      this.domManager.showError('Error al cargar la aplicación');
    }
  }

  /**
   * Configura los event listeners personalizados
   */
  setupEventListeners() {
    // Listener para cambio de filtro
    this.eventManager.addEventListener('filterChanged', (event) => {
      this.handleFilterChange(event.detail.filterValue);
    });

    // Listener para selección de película
    this.eventManager.addEventListener('movieSelected', (event) => {
      console.log('Película seleccionada:', event.detail.movieId);
    });

    // Listener para deselección de película
    this.eventManager.addEventListener('movieDeselected', (event) => {
      console.log('Regresando al grid de películas');
    });
  }

  /**
   * Carga las películas iniciales
   */
  async loadInitialMovies() {
    this.domManager.showLoading();
    
    try {
      const data = await this.getMoviesData(this.currentFilter, 1);
      this.domManager.renderMovies(data.results, false);
      this.updateInfiniteScroll();
    } catch (error) {
      console.error('Error al cargar películas iniciales:', error);
      this.domManager.showError('Error al cargar las películas');
    }
  }

  /**
   * Carga más películas (para scroll infinito)
   * @param {number} page - Número de página
   */
  async loadMoreMovies(page) {
    try {
      const data = await this.getMoviesData(this.currentFilter, page);
      this.domManager.renderMovies(data.results, true);
      this.updateInfiniteScroll();
    } catch (error) {
      console.error('Error al cargar más películas:', error);
      throw error;
    }
  }

  /**
   * Obtiene datos de películas según el filtro
   * @param {string} filter - Tipo de filtro
   * @param {number} page - Número de página
   * @returns {Promise<Object>} - Datos de la API
   */
  async getMoviesData(filter, page) {
    if (filter === 'popular') {
      return await APIService.getPopularMovies(page);
    } else if (!isNaN(filter)) {
      // Es un ID de género
      return await APIService.getMoviesByGenre(parseInt(filter), page);
    } else {
      throw new Error('Filtro no válido');
    }
  }

  /**
   * Maneja el cambio de filtro
   * @param {string} filterValue - Nuevo valor del filtro
   */
  async handleFilterChange(filterValue) {
    if (filterValue === this.currentFilter) return;
    
    this.currentFilter = filterValue;
    this.infiniteScrollManager.reset();
    
    try {
      this.domManager.showLoading();
      const data = await this.getMoviesData(this.currentFilter, 1);
      this.domManager.renderMovies(data.results, false);
      this.updateInfiniteScroll();
    } catch (error) {
      console.error('Error al cambiar filtro:', error);
      this.domManager.showError('Error al aplicar el filtro');
    }
  }

  /**
   * Actualiza el scroll infinito con la última película
   */
  updateInfiniteScroll() {
    const lastMovie = this.domManager.getLastMovieElement();
    this.infiniteScrollManager.updateObservedElement(lastMovie);
  }

  /**
   * Destruye la aplicación y limpia recursos
   */
  destroy() {
    this.infiniteScrollManager.destroy();
    this.domManager.clearContainer();
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.moviesApp = new MoviesApp();
});

// Exportar para uso en otros archivos si es necesario
export default MoviesApp;
