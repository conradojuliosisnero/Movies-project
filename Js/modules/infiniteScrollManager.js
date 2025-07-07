// ===============================
// Gestor de Scroll Infinito
// ===============================

import { CONFIG } from "./config.js";

export class InfiniteScrollManager {
  constructor(loadMoreCallback) {
    this.loadMoreCallback = loadMoreCallback;
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
      threshold: CONFIG.OBSERVER.threshold,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.isLoading) {
          console.log("👁️ Elemento intersectando, cargando más contenido...");
          this.loadNext();
        }
      });
    }, options);
  }

  /**
   * Carga la siguiente página
   */
  async loadNext() {
    this.isLoading = true;

    try {
      await this.loadMoreCallback();
    } catch (error) {
      console.error("Error al cargar más películas:", error);
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

    if (element) {
      console.log("🎯 Observando nuevo elemento:", element);
      this.lastObservedElement = element;
      this.observer.observe(element);
    }
  }

  /**
   * Obtiene el estado de carga
   * @returns {boolean}
   */
  getLoadingState() {
    return this.isLoading;
  }

  /**
   * Reinicia el estado del scroll infinito
   */
  reset() {
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
}
