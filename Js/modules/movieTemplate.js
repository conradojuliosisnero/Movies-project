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
            <a href="/movie/${movie.id}" class="movie-link" data-id="${movie.id}">Ver Detalles</a>
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
   * Genera la página completa de detalles de película
   * @param {Object} movieDetails - Detalles completos de la película
   * @returns {string} - HTML completo de la página de detalles
   */
  static generateMovieDetailPage(movieDetails) {
    const {
      id,
      title,
      overview,
      poster_path,
      backdrop_path,
      release_date,
      runtime,
      vote_average,
      vote_count,
      genres,
      production_companies,
      production_countries,
      budget,
      revenue,
      credits,
      videos,
      similar
    } = movieDetails;

    const backdropUrl = APIService.getBackdropUrl(backdrop_path);
    const posterUrl = APIService.getImageUrl(poster_path, 'w342');
    const director = APIService.getDirector(credits);
    const mainCast = APIService.getMainCast(credits);
    const formattedDate = APIService.formatReleaseDate(release_date);
    const formattedRuntime = APIService.formatRuntime(runtime);

    // Configurar el estilo de fondo
    const heroStyle = backdropUrl ? 
      `style="background-image: url('${backdropUrl}');"` : 
      `style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"`;

    return `
      <div class="movie-detail-page">
        <!-- Backdrop Hero Section -->
        <div class="movie-hero" ${heroStyle}>>
          <div class="hero-content">
            <button class="back-button" onclick="history.back()">
              <i class="fas fa-arrow-left"></i>
              Volver
            </button>
            <div class="hero-info">
              <div class="movie-poster">
                <img src="${posterUrl}" alt="${title}" class="poster-image">
              </div>
              <div class="movie-main-info">
                <h1 class="movie-title">${title}</h1>
                <div class="movie-meta">
                  <span class="rating">
                    <i class="fas fa-star"></i>
                    ${vote_average.toFixed(1)} (${vote_count} votos)
                  </span>
                  <span class="release-date">${formattedDate}</span>
                  <span class="runtime">${formattedRuntime}</span>
                </div>
                <div class="genres">
                  ${genres.map(genre => `<span class="genre-tag">${genre.name}</span>`).join('')}
                </div>
                <p class="movie-overview">${overview}</p>
                <div class="director-info">
                  <strong>Director:</strong> ${director}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Movie Details Content -->
        <div class="movie-details-content">
          <div class="details-container">
            
            <!-- Cast Section -->
            ${mainCast.length > 0 ? `
            <section class="cast-section">
              <h2>Reparto Principal</h2>
              <div class="cast-grid">
                ${mainCast.map(actor => `
                  <div class="cast-member">
                    <img src="${APIService.getImageUrl(actor.profile_path, 'w185')}" 
                         alt="${actor.name}" 
                         onerror="this.src='https://via.placeholder.com/185x278?text=Sin+Foto'">
                    <h4>${actor.name}</h4>
                    <p>${actor.character}</p>
                  </div>
                `).join('')}
              </div>
            </section>
            ` : ''}

            <!-- Production Info -->
            <section class="production-section">
              <h2>Información de Producción</h2>
              <div class="production-grid">
                <div class="production-item">
                  <strong>Presupuesto:</strong>
                  <span>${budget > 0 ? `$${(budget / 1000000).toFixed(1)}M` : 'No disponible'}</span>
                </div>
                <div class="production-item">
                  <strong>Recaudación:</strong>
                  <span>${revenue > 0 ? `$${(revenue / 1000000).toFixed(1)}M` : 'No disponible'}</span>
                </div>
                <div class="production-item">
                  <strong>Países:</strong>
                  <span>${production_countries.map(country => country.name).join(', ')}</span>
                </div>
                <div class="production-item">
                  <strong>Productoras:</strong>
                  <span>${production_companies.slice(0, 3).map(company => company.name).join(', ')}</span>
                </div>
              </div>
            </section>

            <!-- Similar Movies -->
            ${similar.results.length > 0 ? `
            <section class="similar-section">
              <h2>Películas Similares</h2>
              <div class="similar-grid">
                ${similar.results.slice(0, 6).map(movie => `
                  <div class="similar-movie">
                    <a href="/movie/${movie.id}" class="similar-link">
                      <img src="${APIService.getImageUrl(movie.poster_path, 'w185')}" 
                           alt="${movie.title}"
                           onerror="this.src='https://via.placeholder.com/185x278?text=Sin+Poster'">
                      <h4>${movie.title}</h4>
                      <span class="similar-rating">⭐ ${movie.vote_average.toFixed(1)}</span>
                    </a>
                  </div>
                `).join('')}
              </div>
            </section>
            ` : ''}

          </div>
        </div>
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
        <div class="loading-spinner"></div>
        <p>Cargando...</p>
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
        <div class="error-icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <h3>Oops! Algo salió mal</h3>
        <p>${message}</p>
        <button onclick="location.reload()" class="retry-button">
          <i class="fas fa-redo"></i>
          Reintentar
        </button>
      </div>
    `;
  }
}
