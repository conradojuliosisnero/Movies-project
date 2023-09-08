const eyeInputOpen = document.querySelector('.icon__eye--open');
const eyeInputSlash = document.querySelector('.icon__eye--slash');
const inputPassword = document.querySelector('.form__input--password');
const leyendInput = document.querySelector('.form__input__leyend--requerid');
const userName = document.querySelector('.form__input--text');
const password = document.querySelector('.form__input--password');



eyeInputOpen.addEventListener('click',()=>{
    eyeInputSlash.style.display = "flex";
    eyeInputOpen.style.display = "none";
    inputPassword.type = "text";
})

eyeInputSlash.addEventListener('click',()=>{
    eyeInputSlash.style.display = "none";
    eyeInputOpen.style.display = "flex";
    inputPassword.type = "password";
})

// userName.addEventListener('click',()=>{
    
// })
