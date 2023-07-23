// variables

const UrlMovies = "https://api.themoviedb.org/3/movie/changes?api_key=6684d118538ed2ff3c2882fe2b6e2e2e&language=es-MX";

// comenzamos creando una funcion para conectarnos a la api
const cargarPeliculas = async () => {
	try {
		const respuesta = await fetch(UrlMovies); // esperamos la respuesta de la api
		console.log(respuesta); //comprobamos la respuesta
		const data = await respuesta.json(); // esperamos acceder al json
		console.log(data); // comprobamos el json
	} catch (error) { // manejamos el error
		console.log(error);
	}
};

cargarPeliculas();
