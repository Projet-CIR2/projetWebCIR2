let socketModule = (function () {
    function affiche(socket, view) {
        socket.on('affiche', () => {
            view.affichePion();
        });
    }

    return {
        initSocket(socket, view) {
            affiche(socket, view);
        }
    }
}) ();
