// ===============================
// Vista de Películas - Página específica de movies
// ===============================

import MoviesApp from './moviesApp.js';

// Inicializar la aplicación de películas cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
  // Verificar si estamos en la página de películas
  if (document.querySelector('#contenedor')) {
    const moviesApp = new MoviesApp();
    
    // Hacer la aplicación accesible globalmente para debugging
    window.moviesApp = moviesApp;
    
    console.log('Aplicación de películas inicializada correctamente');
  }
});
