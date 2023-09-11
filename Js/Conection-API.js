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

		// Si la respuesta es correcta
		if (response.status === 200) {
			// manejamos el JSON
			const data = await response.json(); 
			// iteramos sobre cada pelicula
			data.results.forEach((pelicula) => {
				// creamos un "componente" para mostrar cada una
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
			// selesccionamos el contendor
			document.getElementById("contenedor").innerHTML = peliculas;

			// seleccionamos la pelicula dependiendo de su ID 
			const idPelicula = document.querySelectorAll('.contenedor .pelicula .contend__hover .movie-link');

			idPelicula.forEach((pelicula)=>{
				pelicula.addEventListener('click',async (event)=>{
					const idPelicula = await event.currentTarget.getAttribute('data-id');
					console.log('ID de la película: ' + idPelicula);

					// para ocultar las demas peliculas 
					const peliculas = document.querySelectorAll('.contenedor .pelicula');
					const contenedor = document.querySelector('.contenedor');
					const btnregresar = document.querySelectorAll('.regresar__overview');
						peliculas.forEach((pelicula) => {
						if (pelicula.getAttribute('data-id') !== idPelicula) {
							pelicula.classList.add('oculta')
							contenedor.classList.toggle('movie__view')
						}else{
							pelicula.classList.add('movie__view')
						}
						});
						
						// para regresar al menu principal 
						btnregresar.forEach((btnregresar)=>{
							btnregresar.addEventListener('click',()=>{
								peliculas.forEach((pelicula)=>{
									pelicula.classList.remove('oculta')
									if (pelicula.getAttribute('data-id') === idPelicula) {
										pelicula.classList.remove('movie__view')
										contenedor.classList.remove('movie__view')
									}
								})
							})
						})
				})
			})

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
