// ===============================
// Configuración y variables globales
// ===============================

// Página actual de la API
let pagina = 1;
// Acumulador de HTML de películas
let peliculas = "";
// Referencia a la última película observada para scroll infinito
let ultimaPelicula;

// Configuración del IntersectionObserver para scroll infinito
const optionsObserver = {
  root: null,
  rootMargin: "0px 0px 350px 0px", // Carga más películas cuando faltan 350px para el final
  threshold: 1.0,
};

// Observer que detecta cuando el usuario llega al final de la lista
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      pagina++;
      loadMovies(); // Carga la siguiente página de películas
    }
  });
}, optionsObserver);

// Clave de API de TMDB
const API_KEY = `192e0b9821564f26f52949758ea3c473`;

/**
 * Función principal para cargar películas populares desde la API de TMDB
 * Utiliza scroll infinito y renderiza las películas en el contenedor principal
 */
const loadMovies = async () => {
  try {
    // Petición a la API de películas populares
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-MX&page=${pagina}`
    ); //hacemos la peticion

    // Si la respuesta es correcta
    if (response.status === 200) {
      // Procesamos el JSON recibido
      const data = await response.json();
      // Recorremos cada película y generamos su HTML
      data.results.forEach((pelicula) => {
        peliculas += `   <div class="pelicula" data-id="${pelicula.id}">
        <div class="contend__poster" data-id="${pelicula.id}">
          <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
          <div class="contend__hover">
            <a href="#" class="movie-link" data-id="${pelicula.id}">More Info</a>
          </div>
        </div>
        <h3 class="titulo">${pelicula.title}</h3>
        <div class="contend__overview" id="contend__overview">
          <div class="regresar__overview"><i class="fa-solid fa-x"></i></div>
          <p class="sinopsis">📖 Sinopsis<br><br>${pelicula.overview}</p>        
          <p class="popularity"> ⭐ Popularidad: ${pelicula.popularity}</p>
          <p class="publicacion"> 📅 Publicada: ${pelicula.release_date}</p>
        </div>
      </div>
      `;
      });
      // Renderizamos el HTML acumulado en el contenedor principal
      document.getElementById("contenedor").innerHTML = peliculas;

      // Asignamos eventos a los enlaces de cada película para mostrar detalles
      const idPelicula = document.querySelectorAll(
        ".contenedor .pelicula .contend__hover .movie-link"
      );

      idPelicula.forEach((pelicula) => {
        pelicula.addEventListener("click", async (event) => {
          const idPelicula = await event.currentTarget.getAttribute("data-id");
          //.log("ID de la película: " + idPelicula);

          // Ocultamos las demás películas y mostramos solo la seleccionada
          const peliculas = document.querySelectorAll(".contenedor .pelicula");
          const contenedor = document.querySelector(".contenedor");
          const btnregresar = document.querySelectorAll(".regresar__overview");
          peliculas.forEach((pelicula) => {
            if (pelicula.getAttribute("data-id") !== idPelicula) {
              pelicula.classList.add("oculta");
              contenedor.classList.toggle("movie__view");
            } else {
              pelicula.classList.add("movie__view");
            }
          });

          // Evento para regresar al menú principal
          btnregresar.forEach((btnregresar) => {
            btnregresar.addEventListener("click", () => {
              peliculas.forEach((pelicula) => {
                pelicula.classList.remove("oculta");
                if (pelicula.getAttribute("data-id") === idPelicula) {
                  pelicula.classList.remove("movie__view");
                  contenedor.classList.remove("movie__view");
                }
              });
            });
          });
        });
      });

      // ===============================
      // Lógica de scroll infinito
      // ===============================
      if (pagina < 1000) {
        if (ultimaPelicula) {
          observador.unobserve(ultimaPelicula); // Dejamos de observar la anterior
        }
        // Obtenemos la última película en pantalla para observarla
        const moviesInViewport = document.querySelectorAll(
          ".contenedor .pelicula"
        );
        ultimaPelicula = moviesInViewport[moviesInViewport.length - 1];
      }
      observador.observe(ultimaPelicula); // Observamos la nueva última película
    } else if (response.status === 401) {
      alert("Pusiste la llave mal"); // Error de autenticación
    } else if (response.status === 404) {
      alert("La pelicula que buscas no existe"); // No encontrado
    } else {
      alert("Hubo un error y no sabemos que paso"); // Otro error
    }
  } catch (error) {
    // Capturamos cualquier error de red o ejecución
    //.log(error);
  }
};

// Inicializamos la carga de películas al cargar el script
loadMovies();
