let form = document.getElementById('form');
let username = document.getElementById('pseudo');
let pwrd = document.getElementById('password');

form.addEventListener('submit', event=> {
    event.preventDefault();
    logger.sendLogin(username.value, pwrd.value);
});
