let pagina = 1;
let peliculas = '';
let ultimaPelicula;

const optionsObserver = {
	root: null,
	rootMargin: "0px 0px 350px 0px",
	threshold: 1.0,
};

const observador = new IntersectionObserver((entradas,observador) => {

	console.log(entradas)

	entradas.forEach(entrada =>{
		if (entrada.isIntersecting) {
			pagina++;
			loadMovies();
		}
	})
}, optionsObserver);

const loadMovies = async () => {
	
	try {

		const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`); //hacemos la peticion
		
		// Si la respuesta es correcta
		if (response.status === 200) {
			
			const data = await response.json(); // manejamos el JSON
			
			// iteramos sobre cada pelicula
			data.results.forEach((pelicula) => {
			
			
				// creamos un "componente" para mostrar cada una
			
				peliculas += `<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
						</div>`;
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

<<<<<<< HEAD
cargarPeliculas();

// export const conectionApi = {
//     cargarPeliculas,
// }
=======
loadMovies();

>>>>>>> ce2272e151a2ea87d41781c75a1d78075210d4c4
