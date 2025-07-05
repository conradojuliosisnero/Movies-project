// ===============================
// Plantillas HTML para renderizar películas
// ===============================

import { APIService } from './apiService.js';

export class MovieTemplate {
  /**
   * Genera el HTML para una tarjeta de película
   * @param {Object} movie - Datos de la película
   * @returns {string} - HTML de la tarjeta
   */
  static generateMovieCard(movie) {
    const imageUrl = APIService.getImageUrl(movie.poster_path);
    
    return `
      <div class="pelicula" data-id="${movie.id}">
        <div class="contend__poster" data-id="${movie.id}">
          <img class="poster" src="${imageUrl}" alt="${movie.title}">
          <div class="contend__hover">
            <a href="#" class="movie-link" data-id="${movie.id}">More Info</a>
          </div>
        </div>
        <h3 class="titulo">${movie.title}</h3>
        <div class="contend__overview" id="contend__overview">
          <div class="regresar__overview">
            <i class="fa-solid fa-x"></i>
          </div>
          <p class="sinopsis">📖 Sinopsis<br><br>${movie.overview || 'Sin sinopsis disponible'}</p>        
          <p class="popularity">⭐ Popularidad: ${movie.popularity}</p>
          <p class="publicacion">📅 Publicada: ${movie.release_date}</p>
        </div>
      </div>
    `;
  }

  /**
   * Genera el HTML para múltiples películas
   * @param {Array} movies - Array de películas
   * @returns {string} - HTML concatenado de todas las películas
   */
  static generateMoviesGrid(movies) {
    return movies.map(movie => this.generateMovieCard(movie)).join('');
  }

  /**
   * Genera el HTML para el filtro/selector
   * @returns {string} - HTML del filtro
   */
  static generateFilterHTML() {
    return `
      <div class="filter">
        <select name="filter" id="movieFilter">
          <option value="popular">Popular</option>
          <option value="28">Acción</option>
          <option value="35">Comedia</option>
          <option value="27">Terror</option>
          <option value="18">Drama</option>
          <option value="10749">Romance</option>
          <option value="878">Ciencia Ficción</option>
        </select>
      </div>
    `;
  }

  /**
   * Genera HTML para estado de carga
   * @returns {string} - HTML del loading
   */
  static generateLoadingHTML() {
    return `
      <div class="loading">
        <p>Cargando películas...</p>
      </div>
    `;
  }

  /**
   * Genera HTML para estado de error
   * @param {string} message - Mensaje de error
   * @returns {string} - HTML del error
   */
  static generateErrorHTML(message) {
    return `
      <div class="error">
        <p>Error: ${message}</p>
        <button onclick="location.reload()">Reintentar</button>
      </div>
    `;
  }
}
