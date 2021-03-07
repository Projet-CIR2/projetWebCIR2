let form = document.getElementById('form');
let name = document.getElementById('pseudo');
let pwrd = document.getElementById('password');

form.addEventListener('submit', event=> {

    event.preventDefault();
    logger.sendLogin(name.value, pwrd.value);
});