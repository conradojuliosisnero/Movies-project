// ===============================
// Aplicación Principal de Películas (Modular con Routing)
// ===============================

import { APIService } from './modules/apiService.js';
import { DOMManager } from './modules/domManager.js';
import { EventManager } from './modules/eventManager.js';
import { InfiniteScrollManager } from './modules/infiniteScrollManager.js';
import { MovieTemplate } from './modules/movieTemplate.js';
import { Router } from './modules/router.js';

class MoviesApp {
  constructor() {
    //.log('MoviesApp: Constructor iniciado');
    
    // Verificar que el contenedor existe
    const container = document.querySelector('#contenedor');
    if (!container) {
      //.error('MoviesApp: Contenedor #contenedor no encontrado!');
      return;
    }
    //.log('MoviesApp: Contenedor encontrado:', container);
    
    this.domManager = new DOMManager();
    //.log('MoviesApp: DOMManager creado');
    
    this.infiniteScrollManager = new InfiniteScrollManager(this.loadMoreMovies.bind(this));
    //.log('MoviesApp: InfiniteScrollManager creado');
    
    // Inicializar después de configurar todo
    this.init();
  }

  /**
   * Inicializa la aplicación
   */
  async init() {
    try {
      //.log('MoviesApp: Iniciando aplicación...');
      
      // Configurar router y rutas primero
      this.router = new Router();
      this.setupRoutes();
      
      // Inicializar event manager después del router
      this.eventManager = new EventManager(this.domManager, this.router);
      this.setupEventListeners();
      
      // Iniciar el router después de configurar todo
      this.router.start();
      
      // Fallback: Si estamos en file:// y no se cargó nada, cargar movies por defecto
      setTimeout(() => {
        //.log('MoviesApp: Fallback check - container content:', this.domManager.container.innerHTML.trim());
        if (this.domManager.container.innerHTML.trim() === '') {
          //.log('MoviesApp: Fallback - Loading movies directly');
          this.showMoviesGrid();
        } else {
          //.log('MoviesApp: Container already has content, skipping fallback');
        }
      }, 1000);
      
    } catch (error) {
      //.error('Error al inicializar la aplicación:', error);
      this.domManager.showError('Error al cargar la aplicación');
    }
  }
      
      // Inicializar event manager después del router
      this.eventManager = new EventManager(this.domManager, this.router);
      this.setupEventListeners();
      
      // Iniciar el router después de configurar todo
      this.router.start();
      
      // Fallback: Si estamos en file:// y no se cargó nada, cargar movies por defecto
      setTimeout(() => {
        if (this.domManager.container.innerHTML.trim() === '') {
          //.log('MoviesApp: Fallback - Loading movies directly');
          this.showMoviesGrid();
        }
      }, 1000);
      
    } catch (error) {
      //.error('Error al inicializar la aplicación:', error);
      this.domManager.showError('Error al cargar la aplicación');
    }
  }

  /**
   * Configura las rutas de la aplicación
   */
  setupRoutes() {
    //.log('MoviesApp: Setting up routes');
    
    // Ruta principal (home/grid de películas)
    this.router.addRoute('/', () => {
      //.log('Route handler: Home route triggered');
      this.showMoviesGrid();
    });

    // Ruta para detalles de película
    this.router.addRoute('/movie/:id', (params) => {
      //.log('Route handler: Movie detail route triggered with ID:', params.id);
      this.showMovieDetail(params.id);
    });

    // Ruta de índice (index.html)
    this.router.addRoute('/index.html', () => {
      //.log('Route handler: Index route triggered, redirecting to home');
      this.router.navigate('/', true);
    });
    
    //.log('MoviesApp: Routes configured');
  }

  /**
   * Muestra el grid principal de películas
   */
  async showMoviesGrid() {
    //.log('MoviesApp: Showing movies grid');
    try {
      this.domManager.showLoading();
      await this.loadInitialMovies();
      
      // Actualizar el título de la página
      document.title = 'MoviesCon - Películas Populares';
      //.log('MoviesApp: Movies grid loaded successfully');
    } catch (error) {
      //.error('Error al mostrar grid de películas:', error);
      this.domManager.showError('Error al cargar las películas');
    }
  }

  /**
   * Muestra los detalles de una película específica
   * @param {string} movieId - ID de la película
   */
  async showMovieDetail(movieId) {
    try {
      this.domManager.showLoading();
      
      // Obtener detalles de la película
      const movieDetails = await APIService.getMovieDetails(movieId);
      
      // Renderizar la página de detalles
      const detailHTML = MovieTemplate.generateMovieDetailPage(movieDetails);
      this.domManager.container.innerHTML = detailHTML;
      
      // Actualizar el título de la página
      document.title = `${movieDetails.title} - MoviesCon`;
      
      // Scroll al top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      //.log('Detalles de película cargados:', movieDetails.title);
      
    } catch (error) {
      //.error('Error al cargar detalles de la película:', error);
      this.domManager.showError('Error al cargar los detalles de la película');
      
      // En caso de error, volver al home después de 3 segundos
      setTimeout(() => {
        this.router.navigate('/');
      }, 3000);
    }
  }

  /**
   * Configura los event listeners personalizados
   */
  setupEventListeners() {
    // Listener para clics en enlaces de películas
    this.eventManager.addEventListener('movieLinkClicked', (event) => {
      //.log('Navegando a película:', event.detail.movieId);
    });
  }

  /**
   * Carga las películas iniciales
   */
  async loadInitialMovies() {
    try {
      //.log('MoviesApp: Cargando películas iniciales...');
      const data = await APIService.getPopularMovies(1);
      //.log('MoviesApp: Datos recibidos de la API:', data);
      //.log('MoviesApp: Número de películas:', data.results?.length);
      
      this.domManager.renderMovies(data.results, false);
      //.log('MoviesApp: Películas renderizadas');
      
      this.updateInfiniteScroll();
      //.log('MoviesApp: Scroll infinito actualizado');
    } catch (error) {
      //.error('Error al cargar películas iniciales:', error);
      throw error;
    }
  }

  /**
   * Carga más películas (para scroll infinito)
   * @param {number} page - Número de página
   */
  async loadMoreMovies(page) {
    try {
      const data = await APIService.getPopularMovies(page);
      this.domManager.renderMovies(data.results, true);
      this.updateInfiniteScroll();
    } catch (error) {
      //.error('Error al cargar más películas:', error);
      throw error;
    }
  }

  /**
   * Actualiza el scroll infinito con la última película
   */
  updateInfiniteScroll() {
    // Solo habilitar scroll infinito en la página principal
    if (this.router.isCurrentRoute('/')) {
      const lastMovie = this.domManager.getLastMovieElement();
      this.infiniteScrollManager.updateObservedElement(lastMovie);
    }
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
