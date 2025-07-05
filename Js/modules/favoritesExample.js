// ===============================
// Ejemplo: Extensión de Funcionalidad - Favoritos
// ===============================

import { APIService } from './apiService.js';

/**
 * Ejemplo de cómo extender la aplicación con nuevas funcionalidades
 * Este módulo maneja los favoritos de usuario
 */
export class FavoritesManager {
  constructor() {
    this.favorites = this.loadFavoritesFromStorage();
    this.storageKey = 'movieApp_favorites';
  }

  /**
   * Añade una película a favoritos
   * @param {Object} movie - Datos de la película
   */
  addToFavorites(movie) {
    if (!this.isFavorite(movie.id)) {
      this.favorites.push(movie);
      this.saveFavoritesToStorage();
      this.emitFavoritesChanged();
    }
  }

  /**
   * Remueve una película de favoritos
   * @param {number} movieId - ID de la película
   */
  removeFromFavorites(movieId) {
    this.favorites = this.favorites.filter(movie => movie.id !== movieId);
    this.saveFavoritesToStorage();
    this.emitFavoritesChanged();
  }

  /**
   * Verifica si una película está en favoritos
   * @param {number} movieId - ID de la película
   * @returns {boolean}
   */
  isFavorite(movieId) {
    return this.favorites.some(movie => movie.id === movieId);
  }

  /**
   * Obtiene todas las películas favoritas
   * @returns {Array} - Array de películas favoritas
   */
  getFavorites() {
    return [...this.favorites];
  }

  /**
   * Carga favoritos desde localStorage
   * @returns {Array} - Array de favoritos
   */
  loadFavoritesFromStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      //.error('Error al cargar favoritos:', error);
      return [];
    }
  }

  /**
   * Guarda favoritos en localStorage
   */
  saveFavoritesToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
    } catch (error) {
      //.error('Error al guardar favoritos:', error);
    }
  }

  /**
   * Emite evento de cambio en favoritos
   */
  emitFavoritesChanged() {
    const event = new CustomEvent('favoritesChanged', {
      detail: { favorites: this.getFavorites() }
    });
    document.dispatchEvent(event);
  }

  /**
   * Genera HTML para el botón de favoritos
   * @param {Object} movie - Datos de la película
   * @returns {string} - HTML del botón
   */
  generateFavoriteButton(movie) {
    const isFav = this.isFavorite(movie.id);
    const icon = isFav ? '❤️' : '🤍';
    const text = isFav ? 'Quitar de favoritos' : 'Añadir a favoritos';
    
    return `
      <button class="favorite-btn" data-movie-id="${movie.id}" title="${text}">
        ${icon} ${text}
      </button>
    `;
  }
}

/**
 * Ejemplo de cómo integrar favoritos en la aplicación principal
 */
export function integrateFavorites(moviesApp) {
  const favoritesManager = new FavoritesManager();

  // Extender el template de películas para incluir botón de favoritos
  const originalGenerateMovieCard = moviesApp.domManager.constructor.prototype.generateMovieCard;
  
  moviesApp.domManager.constructor.prototype.generateMovieCard = function(movie) {
    const originalHTML = originalGenerateMovieCard.call(this, movie);
    const favoriteButton = favoritesManager.generateFavoriteButton(movie);
    
    // Insertar el botón de favoritos en el HTML
    return originalHTML.replace(
      '<div class="contend__hover">',
      `<div class="contend__hover">${favoriteButton}`
    );
  };

  // Manejar clicks en botones de favoritos
  moviesApp.eventManager.domManager.container.addEventListener('click', (event) => {
    if (event.target.matches('.favorite-btn')) {
      const movieId = parseInt(event.target.getAttribute('data-movie-id'));
      
      if (favoritesManager.isFavorite(movieId)) {
        favoritesManager.removeFromFavorites(movieId);
      } else {
        // Necesitaríamos los datos completos de la película
        // En una implementación real, los obtendríamos de la API o del estado
        favoritesManager.addToFavorites({ id: movieId });
      }
      
      // Actualizar el botón
      event.target.innerHTML = favoritesManager.isFavorite(movieId) ? '❤️ Quitar de favoritos' : '🤍 Añadir a favoritos';
    }
  });

  // Escuchar cambios en favoritos
  document.addEventListener('favoritesChanged', (event) => {
    //.log('Favoritos actualizados:', event.detail.favorites);
  });

  return favoritesManager;
}

// Uso en la aplicación principal:
/*
import { integrateFavorites } from './modules/favoritesExample.js';

// Después de inicializar MoviesApp
const favoritesManager = integrateFavorites(moviesApp);
*/
