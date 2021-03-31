let form = document.getElementById('deconnection');

form.addEventListener('submit', event=> {
    console.log("t'es deconnecté");
    let deco = true;
    event.preventDefault();
    deconnectionner.senddeco(deco);
});