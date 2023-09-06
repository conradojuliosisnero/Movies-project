let pagina = 1;
let peliculas = "";
let ultimaPelicula;

const optionsObserver = {
	root: null,
	rootMargin: "0px 0px 350px 0px",
	threshold: 1.0,
};

const observador = new IntersectionObserver((entradas, observador) => {
	entradas.forEach((entrada) => {
		if (entrada.isIntersecting) {
			pagina++;
			loadMovies();
		}
	});
}, optionsObserver);

const loadMovies = async () => {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`
		); //hacemos la peticion

		// console.log(response);
		// Si la respuesta es correcta
		if (response.status === 200) {
			const data = await response.json(); // manejamos el JSON
			// console.log(data);
			// iteramos sobre cada pelicula
			data.results.forEach((pelicula) => {
				// creamos un "componente" para mostrar cada una

				peliculas += `   <div class="pelicula" data-id="${pelicula.id}">
				<div class="contend__poster">
					<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
					<div class="contend__hover" data-id="${pelicula.id}">
						<a href="../html/page-movie.html" class="movie-link" id="${pelicula.id}">More Info</a>
					</div>
				</div>
				<h3 class="titulo">${pelicula.title}</h3>
			</div>
			`;
				
				const idSelect = document.querySelectorAll(".movie-link")

			document.addEventListener('click', (event) => {
				if (event.target.classList.contains('movie-link')) {
					const movieId = event.target.id;
					console.log(`Se hizo clic en el póster con ID ${movieId}`);
				}
			});

			});

			// selesccionamos el contendor
			document.getElementById("contenedor").innerHTML = peliculas;

			if (pagina < 1000) {
				if (ultimaPelicula) {
					observador.unobserve(ultimaPelicula);
				}

				// obtenemos el numero de peliculas en pantalla

				const moviesInViewport = document.querySelectorAll(
					".contenedor .pelicula"
				);

				ultimaPelicula = moviesInViewport[moviesInViewport.length - 1];
			}
			observador.observe(ultimaPelicula);
		} else if (response.status === 401) {
			alert("Pusiste la llave mal");
		} else if (response.status === 404) {
			alert("La pelicula que buscas no existe");
		} else {
			alert("Hubo un error y no sabemos que paso");
		}
	} catch (error) {
		//atrapamos el error
		console.log(error);
	}
};

loadMovies();
