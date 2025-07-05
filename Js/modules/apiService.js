// ===============================
// Servicio de API para comunicarse con TMDB
// ===============================

import { CONFIG } from './config.js';

export class APIService {
  /**
   * Obtiene películas populares de la API de TMDB
   * @param {number} page - Número de página
   * @returns {Promise<Object>} - Respuesta de la API
   */
  static async getPopularMovies(page = 1) {
    try {
      const url = `${CONFIG.API.BASE_URL}/movie/popular?api_key=${CONFIG.API.KEY}&language=${CONFIG.API.LANGUAGE}&page=${page}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al obtener películas:', error);
      throw error;
    }
  }

  /**
   * Obtiene detalles de una película específica
   * @param {number} movieId - ID de la película
   * @returns {Promise<Object>} - Detalles de la película
   */
  static async getMovieDetails(movieId) {
    try {
      const url = `${CONFIG.API.BASE_URL}/movie/${movieId}?api_key=${CONFIG.API.KEY}&language=${CONFIG.API.LANGUAGE}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al obtener detalles de la película:', error);
      throw error;
    }
  }

  /**
   * Busca películas por género
   * @param {number} genreId - ID del género
   * @param {number} page - Número de página
   * @returns {Promise<Object>} - Películas del género
   */
  static async getMoviesByGenre(genreId, page = 1) {
    try {
      const url = `${CONFIG.API.BASE_URL}/discover/movie?api_key=${CONFIG.API.KEY}&language=${CONFIG.API.LANGUAGE}&with_genres=${genreId}&page=${page}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al obtener películas por género:', error);
      throw error;
    }
  }

  /**
   * Obtiene la URL completa de la imagen
   * @param {string} posterPath - Ruta del poster
   * @returns {string} - URL completa de la imagen
   */
  static getImageUrl(posterPath) {
    return posterPath ? `${CONFIG.API.IMAGE_BASE_URL}${posterPath}` : '';
  }
}
