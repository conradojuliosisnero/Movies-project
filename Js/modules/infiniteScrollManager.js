// ===============================
// Gestor de Scroll Infinito
// ===============================

import { CONFIG } from './config.js';

export class InfiniteScrollManager {
  constructor(loadMoreCallback) {
    this.loadMoreCallback = loadMoreCallback;
    this.currentPage = 1;
    this.maxPages = CONFIG.API.MAX_PAGES;
    this.isLoading = false;
    this.lastObservedElement = null;
    
    this.initObserver();
  }

  /**
   * Inicializa el Intersection Observer
   */
  initObserver() {
    const options = {
      root: null,
      rootMargin: CONFIG.OBSERVER.rootMargin,
      threshold: CONFIG.OBSERVER.threshold
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.isLoading && this.canLoadMore()) {
          this.loadNext();
        }
      });
    }, options);
  }

  /**
   * Carga la siguiente página
   */
  async loadNext() {
    if (!this.canLoadMore()) return;

    this.isLoading = true;
    this.currentPage++;
    
    try {
      await this.loadMoreCallback(this.currentPage);
    } catch (error) {
      console.error('Error al cargar más películas:', error);
      this.currentPage--; // Revertir en caso de error
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Actualiza el elemento observado (última película)
   * @param {Element} element - Nuevo elemento a observar
   */
  updateObservedElement(element) {
    if (this.lastObservedElement) {
      this.observer.unobserve(this.lastObservedElement);
    }
    
    if (element && this.canLoadMore()) {
      this.lastObservedElement = element;
      this.observer.observe(element);
    }
  }

  /**
   * Verifica si se pueden cargar más páginas
   * @returns {boolean}
   */
  canLoadMore() {
    return this.currentPage < this.maxPages;
  }

  /**
   * Reinicia el estado del scroll infinito
   */
  reset() {
    this.currentPage = 1;
    this.isLoading = false;
    
    if (this.lastObservedElement) {
      this.observer.unobserve(this.lastObservedElement);
      this.lastObservedElement = null;
    }
  }

  /**
   * Destruye el observer
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  /**
   * Obtiene la página actual
   * @returns {number}
   */
  getCurrentPage() {
    return this.currentPage;
  }

  /**
   * Obtiene el estado de carga
   * @returns {boolean}
   */
  getLoadingState() {
    return this.isLoading;
  }
}
