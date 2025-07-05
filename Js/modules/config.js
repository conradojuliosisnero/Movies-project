// ===============================
// Configuración Global de la Aplicación
// ===============================

export const CONFIG = {
  // Configuración de la API
  API: {
    KEY: '192e0b9821564f26f52949758ea3c473',
    BASE_URL: 'https://api.themoviedb.org/3',
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500',
    LANGUAGE: 'es-MX',
    MAX_PAGES: 1000
  },
  
  // Configuración del Intersection Observer
  OBSERVER: {
    rootMargin: '0px 0px 350px 0px',
    threshold: 1.0
  },
  
  // Selectores DOM
  SELECTORS: {
    container: '#contenedor',
    movieCard: '.pelicula',
    movieLink: '.movie-link',
    backButton: '.regresar__overview',
    filter: '.filter select'
  },
  
  // Clases CSS
  CSS_CLASSES: {
    hidden: 'oculta',
    movieView: 'movie__view'
  }
};
