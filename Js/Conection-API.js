const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
let pagina = 1;
const urlApi = `https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`;

// btnSiguiente.addEventListener('click', () => {
// 	if(pagina < 1000){
// 		pagina += 1;
// 		cargarPeliculas();
// 	}
// });

// btnAnterior.addEventListener('click', () => {
// 	if(pagina > 1){
// 		pagina -= 1;
// 		cargarPeliculas();
// 	}
// });

//	 opciones del observador

const optionsObserver = {
	root: null,
	rootMargin: "0px",
	threshold: 1.0,
};

const observer = new IntersectionObserver((entrada, observador) => {}, optionsObserver);

const moviesViewport = document.querySelectorAll('.contenedor .pelicula');

console.log(moviesViewport);

const loadMovies = async () => {
	try {
		const response = await fetch(urlApi); //hacemos la peticion
		// Si la respuesta es correcta
		if (response.status === 200) {
			const data = await response.json();		// manejamos el JSON
			let movies = '';
			data.results.forEach((pelicula) => {	// iteramos sobre cada pelicula
				// creamos un "componente" para mostrar cada una
				movies += `
					<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
					</div>
				`;
			});
			// selesccionamos el contendor 
			document.getElementById("contenedor").innerHTML = movies;
		} else if (response.status === 401) {
			alert("Pusiste la llave mal");
		} else if (response.status === 404) {
			alert("La pelicula que buscas no existe");
		} else {
			alert("Hubo un error y no sabemos que paso");
		}
	} catch (error) {		//atrapamos el error
		console.log(error);
	}
};

loadMovies();
