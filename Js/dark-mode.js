// selects 
const btndarkMode = document.querySelector('.bb8-toggle__container');
const nav = document.querySelector('.nav');

btndarkMode.addEventListener("click", () => {
    document.body.classList.toggle("modo-oscuro");
    nav.classList.toggle("nav-dark");
    btndarkMode.classList.toggle("active");
  
    // modo guardado en localstorage
    if (document.body.classList.contains("modo-oscuro")) {
      localStorage.setItem("oscuro", "true");
    } else {
      localStorage.setItem("oscuro", "false");
    }
  });
  
  // comprovacion del localstore
  if (localStorage.getItem("oscuro") === "true") {
    document.body.classList.add("modo-oscuro");
    nav.classList.add("nav-dark");
    btndarkMode.classList.add("");
  } else {
    document.body.classList.remove("modo-oscuro");
    nav.classList.remove("nav-dark");
    btndarkMode.classList.remove("");
  }