let form = document.getElementById("form");
let name = document.getElementById("pseudo");
let pwrd = document.getElementById("password");

form.addEventListener('submit', event=> {
    console.log(name, pwrd);
});