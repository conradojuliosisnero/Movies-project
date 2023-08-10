// variables
let pagina = 1;
// colocamos a funcionar los botones 
const btnDerecho = document.getElementById('btnSiguiente');
const btnIzquierdo = document.getElementById('btnAnterior');

btnDerecho.addEventListener('click',() => {
    if (pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
    }
});

btnIzquierdo.addEventListener('click',() => {
    if (pagina > 1) {
        pagina -= 1;
        cargarPeliculas();
    }
});

    // import { buttons } from "./menu.dinamic.down.js";
// comenzamos creando una funcion para conectarnos a la api
const cargarPeliculas = async () => {
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=6684d118538ed2ff3c2882fe2b6e2e2e&language=es-MX&page=${pagina}`);   // esperamos la respuesta de la API    
        const data = await respuesta.json();    // obtenemos los datos del json
        const resultados = data.results;    // accedemos a los resultados de peliculas
        // si la respuesta es valida 
        if (respuesta.status == 200) {
                let peliculas = '';  
                resultados.forEach( pelicula => {       // iteramos sobre cada titulo del arreglo
                    
                    // accedemos a  las imagenes de las peliculas
                    peliculas += `
                        <div class="pelicula">
                            <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                            <h3 class="titulo">${pelicula.title}</h3>
                        </div>
                    `;
                });
                // seleccionamos el contenedor
                document.getElementById('contenedor').innerHTML = peliculas;

            } else if(respuesta.status == 404){
                console.log("no se encontro el sitio")
            }else if(respuesta.status == 401){
                console.log("no se encontro el sitio deseado")
            }
        
	} catch (error) {      // manejamos el error
		console.log(error);
	}
};

cargarPeliculas();

// export const conectionApi = {
//     cargarPeliculas,
// }
