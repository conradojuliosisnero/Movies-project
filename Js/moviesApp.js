// ===============================
// Aplicación Principal de Películas
// ===============================

import { CONFIG } from "./modules/config.js";
import { APIService } from "./modules/apiService.js";
import { MovieTemplate } from "./modules/movieTemplate.js";
import { DOMManager } from "./modules/domManager.js";
import { Router } from "./modules/router.js";
import { InfiniteScrollManager } from "./modules/infiniteScrollManager.js";

class MoviesApp {
  constructor() {
    this.currentPage = 1;
    this.totalPages = 1;
    this.isLoading = false;
    this.currentMovies = [];

    // Inicializar componentes
    this.domManager = new DOMManager();
    this.router = new Router();

    this.init();
  }

  async init() {
    try {
      console.log("🎬 Iniciando aplicación de películas...");

      // Configurar el contenedor
      this.setupContainer();

      // Configurar router y rutas PRIMERO
      this.setupRouter();

      // Verificar si hay una ruta específica al cargar
      const currentPath = window.location.pathname;
      if (currentPath.includes("/movie/")) {
        // Si es una URL de película, el router se encargará
        console.log("🎯 Detectada URL de película:", currentPath);
      } else {
        // Solo cargar películas si estamos en home
        await this.loadInitialMovies();

        // Configurar eventos y scroll infinito solo para home
        this.setupEvents();
        this.setupInfiniteScroll();
      }

      console.log("✅ Aplicación iniciada correctamente");
    } catch (error) {
      console.error("❌ Error al inicializar la aplicación:", error);
      this.showError("Error al cargar la aplicación");
    }
  }

  setupContainer() {
    const container = document.querySelector(CONFIG.SELECTORS.container);
    if (!container) {
      throw new Error("Contenedor principal no encontrado");
    }

    // Limpiar contenedor y agregar clase para grid
    container.innerHTML = "";
    container.classList.remove("movie__view");
    container.classList.add("movies-grid");
  }

  async loadInitialMovies() {
    try {
      this.showLoading();
      console.log("📡 Cargando películas populares...");

      const data = await APIService.getPopularMovies(1);
      this.currentMovies = data.results;
      this.totalPages = data.total_pages;
      this.currentPage = 1;

      console.log(`✅ ${this.currentMovies.length} películas cargadas`);

      this.renderMovies(this.currentMovies, true);
      this.hideLoading();
    } catch (error) {
      console.error("❌ Error al cargar películas:", error);
      this.hideLoading();
      this.showError("Error al cargar las películas");
    }
  }

  async loadMoreMovies() {
    if (this.isLoading || this.currentPage >= this.totalPages) {
      return;
    }

    try {
      this.isLoading = true;
      this.currentPage++;

      console.log(`📡 Cargando página ${this.currentPage}...`);

      const data = await APIService.getPopularMovies(this.currentPage);
      const newMovies = data.results;

      this.currentMovies = [...this.currentMovies, ...newMovies];
      this.renderMovies(newMovies, false);

      console.log(`✅ ${newMovies.length} películas adicionales cargadas`);
    } catch (error) {
      console.error("❌ Error al cargar más películas:", error);
      this.currentPage--; // Revertir el incremento
    } finally {
      this.isLoading = false;
    }
  }

  renderMovies(movies, clearContainer = false) {
    const container = document.querySelector(CONFIG.SELECTORS.container);

    if (clearContainer) {
      container.innerHTML = "";
    }

    const moviesHTML = MovieTemplate.generateMoviesGrid(movies);

    if (clearContainer) {
      container.innerHTML = moviesHTML;
    } else {
      container.insertAdjacentHTML("beforeend", moviesHTML);
    }

    // Configurar eventos en las nuevas películas
    this.setupMovieEvents();
  }

  setupRouter() {
    // Configurar rutas
    this.router.addRoute("/", () => {
      console.log("🏠 Navegando a home");
      this.showHome();
    });

    this.router.addRoute("/movie/:id", (params) => {
      console.log("🎬 Navegando a película:", params.id);
      this.showMovieDetails(params.id);
    });

    // Iniciar el router
    this.router.start();
  }

  async showHome() {
    try {
      // Limpiar contenedor y mostrar grid de películas
      this.setupContainer();

      if (this.currentMovies.length === 0) {
        await this.loadInitialMovies();
      } else {
        this.renderMovies(this.currentMovies, true);
      }

      // Configurar eventos para home
      this.setupEvents();
      if (!this.infiniteScrollManager) {
        this.setupInfiniteScroll();
      }
    } catch (error) {
      console.error("Error al mostrar home:", error);
      this.showError("Error al cargar las películas");
    }
  }

  async showMovieDetails(movieId) {
    try {
      console.log(`🔍 Cargando detalles de película ID: ${movieId}`);
      this.showLoading();

      const movieDetails = await APIService.getMovieDetails(movieId);
      console.log("🎬 Detalles obtenidos:", movieDetails);

      const detailsHTML = MovieTemplate.generateMovieDetailPage(movieDetails);
      console.log("🎨 HTML generado para detalles");

      const container = document.querySelector(CONFIG.SELECTORS.container);
      container.innerHTML = detailsHTML;
      container.classList.add("movie__view");

      this.hideLoading();
      this.setupDetailEvents();

      console.log("✅ Detalles de película mostrados");
    } catch (error) {
      console.error("Error al cargar detalles:", error);
      this.showError("Error al cargar los detalles de la película");
    }
  }

  setupDetailEvents() {
    // Configurar botón de regreso
    const backButtons = document.querySelectorAll(
      ".back-to-home, .regresar__overview"
    );
    backButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this.router.navigate("/");
      });
    });
  }

  setupEvents() {
    // Configurar eventos básicos para las películas
    this.setupMovieEvents();
  }

  setupMovieEvents() {
    const movieCards = document.querySelectorAll(CONFIG.SELECTORS.movieCard);
    console.log(`🎯 Configurando eventos para ${movieCards.length} películas`);

    movieCards.forEach((card) => {
      // Evento click en la tarjeta completa
      card.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const movieId = card.dataset.id;
        console.log("🎬 Click en película, ID:", movieId);

        if (movieId) {
          this.router.navigate(`/movie/${movieId}`);
        }
      });

      // Evento específico para el enlace "Ver Detalles"
      const detailLink = card.querySelector(".movie-link");
      if (detailLink) {
        detailLink.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();

          const movieId = detailLink.dataset.id;
          console.log("🔗 Click en enlace detalles, ID:", movieId);

          if (movieId) {
            this.router.navigate(`/movie/${movieId}`);
          }
        });
      }
    });
  }

  setupInfiniteScroll() {
    // Inicializar el scroll infinito
    this.infiniteScrollManager = new InfiniteScrollManager(() => {
      this.loadMoreMovies();
    });
  }

  showLoading() {
    const container = document.querySelector(CONFIG.SELECTORS.container);
    if (container.children.length === 0) {
      container.innerHTML = `
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <p>Cargando películas...</p>
        </div>
      `;
    }
  }

  hideLoading() {
    const loadingContainer = document.querySelector(".loading-container");
    if (loadingContainer) {
      loadingContainer.remove();
    }
  }

  showError(message) {
    const container = document.querySelector(CONFIG.SELECTORS.container);
    container.innerHTML = `
      <div class="error-container">
        <p class="error-message">${message}</p>
        <button onclick="location.reload()" class="retry-button">Reintentar</button>
      </div>
    `;
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 DOM cargado, iniciando aplicación...");
  new MoviesApp();
});

// Exportar para uso en otros módulos si es necesario
export { MoviesApp };
