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
      //.log('APIService: getPopularMovies llamado con página:', page);
      const url = `${CONFIG.API.BASE_URL}/movie/popular?api_key=${CONFIG.API.KEY}&language=${CONFIG.API.LANGUAGE}&page=${page}`;
      //.log('APIService: URL construida:', url);
      
      const response = await fetch(url);
      //.log('APIService: Respuesta recibida, status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      //.log('APIService: Datos parseados exitosamente, películas:', data.results?.length);
      return data;
    } catch (error) {
      //.error('Error al obtener películas:', error);
      throw error;
    }
  }

  /**
   * Obtiene detalles completos de una película específica
   * @param {number} movieId - ID de la película
   * @returns {Promise<Object>} - Detalles completos de la película
   */
  static async getMovieDetails(movieId) {
    try {
      const url = `${CONFIG.API.BASE_URL}/movie/${movieId}?api_key=${CONFIG.API.KEY}&language=${CONFIG.API.LANGUAGE}&append_to_response=credits,videos,similar`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      //.error('Error al obtener detalles de la película:', error);
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
      //.error('Error al obtener películas por género:', error);
      throw error;
    }
  }

  /**
   * Obtiene la URL completa de la imagen
   * @param {string} posterPath - Ruta del poster
   * @param {string} size - Tamaño de la imagen (por defecto w500)
   * @returns {string} - URL completa de la imagen
   */
  static getImageUrl(posterPath, size = 'w500') {
    return posterPath ? `https://image.tmdb.org/t/p/${size}${posterPath}` : '';
  }

  /**
   * Obtiene la URL completa del backdrop
   * @param {string} backdropPath - Ruta del backdrop
   * @param {string} size - Tamaño de la imagen (por defecto w1280)
   * @returns {string} - URL completa del backdrop
   */
  static getBackdropUrl(backdropPath, size = 'w1280') {
    return backdropPath ? `https://image.tmdb.org/t/p/${size}${backdropPath}` : '';
  }

  /**
   * Formatea la duración en minutos a horas y minutos
   * @param {number} runtime - Duración en minutos
   * @returns {string} - Duración formateada
   */
  static formatRuntime(runtime) {
    if (!runtime) return 'N/A';
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  }

  /**
   * Formatea la fecha de lanzamiento
   * @param {string} releaseDate - Fecha en formato YYYY-MM-DD
   * @returns {string} - Fecha formateada
   */
  static formatReleaseDate(releaseDate) {
    if (!releaseDate) return 'N/A';
    const date = new Date(releaseDate);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  /**
   * Obtiene el director de la película desde los créditos
   * @param {Object} credits - Objeto de créditos
   * @returns {string} - Nombre del director
   */
  static getDirector(credits) {
    if (!credits || !credits.crew) return 'N/A';
    const director = credits.crew.find(person => person.job === 'Director');
    return director ? director.name : 'N/A';
  }

  /**
   * Obtiene los actores principales (top 5)
   * @param {Object} credits - Objeto de créditos
   * @returns {Array} - Array de actores principales
   */
  static getMainCast(credits) {
    if (!credits || !credits.cast) return [];
    return credits.cast.slice(0, 5);
  }
}
