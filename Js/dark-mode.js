// selects 
const darkMode = document.getElementById('toggle');
const nav = document.querySelector('.nav');


darkMode.addEventListener("click", () => {
    document.body.classList.toggle("modo-oscuro");
    nav.classList.toggle("nav-dark");
    darkMode.classList.toggle("active");
  
    // modo guardado en localstorage
    if (document.body.classList.contains("modo-oscuro")) {
      localStorage.setItem("oscuro", "true");
    } else {
      localStorage.setItem("oscuro", "false");
    }
  });
  
  // comprovacion del localstore
  if (localStorage.getItem("oscuro") === "true") {
    // document.body.classList.add("modo-oscuro");
    nav.classList.add("nav-dark");
  } else {
    document.body.classList.remove("modo-oscuro");
    nav.classList.remove("nav-dark");
    darkMode.classList.remove("active");
  }