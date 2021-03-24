let form = document.getElementById('form');
let firstName = document.getElementById('FirstName');
let lastName = document.getElementById('LastName');
let mail = document.getElementById('Mail');
let username = document.getElementById('Pseudo');
let pwrd = document.getElementById('Password');

form.addEventListener('submit', event=> {
    console.log(form);
    event.preventDefault();
    logger.sendLogin(firstName.value,lastName.value,mail.value,username.value, pwrd.value);
});