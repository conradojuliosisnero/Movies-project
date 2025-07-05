// Test simple para verificar la API
async function testAPI() {
  try {
    //.log('Testing API...');
    
    const API_KEY = '192e0b9821564f26f52949758ea3c473';
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-MX&page=1`;
    
    //.log('Fetching from:', url);
    
    const response = await fetch(url);
    //.log('Response status:', response.status);
    //.log('Response ok:', response.ok);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    //.log('Data received:', data);
    //.log('Number of movies:', data.results?.length);
    
    if (data.results && data.results.length > 0) {
      //.log('First movie:', data.results[0]);
    }
    
    return data;
  } catch (error) {
    //.error('Error in test:', error);
    return null;
  }
}

// Ejecutar test cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
  //.log('DOM loaded, starting API test...');
  testAPI();
});
