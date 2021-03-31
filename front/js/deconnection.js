let fonctionDeconnexion = function (socket) {
    let form = document.getElementById('deconnection');
    console.log(form);
    if (form !== null) {
        form.addEventListener('click', event => {
            console.log("t'es deconnecté");
            let deco = true;
            event.preventDefault();
            deconnectionner.senddeco(deco);
            socket.emit('deconnexion');
        });
    }
}
