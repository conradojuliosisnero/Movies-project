// selects
const btndarkMode = document.querySelector(".input");
const nav = document.querySelector(".nav");
const slaider = document.querySelector(".slider");
const leyend = document.querySelector(".leyenda p a");


// listener de modo oscuro
btndarkMode.addEventListener("click", () => {
	document.body.classList.toggle("modo-oscuro");
	nav.classList.toggle("nav-dark");
    leyend.classList.toggle("leyend_dark");
	// modo guardado en localstorage modo oscuro
	if (document.body.classList.contains("modo-oscuro")) {
		localStorage.setItem("oscuro", "true");
	} else {
		localStorage.setItem("oscuro", "false");
	}
});

// comprovacion del localstore del modo oscuro
if (localStorage.getItem("oscuro") === "true") {
	document.body.classList.add("modo-oscuro");
	nav.classList.add("nav-dark");
    leyend.classList.add("leyend_dark");

} else {
	document.body.classList.remove("modo-oscuro");
	nav.classList.remove("nav-dark");
    leyend.classList.remove("leyend_dark");
}

// BOTON EN MODO SOCURO 

// listener de modo oscuro
btndarkMode.addEventListener("click", () => {
    btndarkMode.classList.toggle("dark-btn");
    slaider.classList.toggle("dark-btn");

	// modo guardado en localstorage modo oscuro
	if (btndarkMode.classList.contains("dark-btn")) {
		localStorage.setItem("dark-btn", "true");
	} else {
		localStorage.setItem("dark-btn", "false");
	}
});

// comprovacion del localstore del modo oscuro
if (localStorage.getItem("dark-btn") === "true") {
    btndarkMode.classList.add("dark-btn");
    slaider.classList.add("dark-btn");
} else {
    btndarkMode.classList.remove("dark-btn");
    slaider.classList.remove("dark-btn");
}
