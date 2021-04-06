let form = document.getElementById('form');
let firstName = document.getElementById('FirstName');
let lastName = document.getElementById('LastName');
let username = document.getElementById('Pseudo');
let pwrd = document.getElementById('Password');

form.addEventListener('submit', event=> {
    event.preventDefault();
    signuper.sendLogin(firstName.value,lastName.value,username.value, pwrd.value);
});
