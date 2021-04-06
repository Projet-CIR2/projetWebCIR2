let fonctionDeconnexion = function (socket) {
    let form = document.getElementById('deconnection');

    if (form !== null) {
        form.addEventListener('click', event => {
            let deco = true;
            event.preventDefault();
            deconnectionner.senddeco(deco);
            socket.emit('deconnexion');
        });
    }
}
