let socketModule = (function () {
    function initJoueur(socket, view) {
        socket.on('initJoueur', (joueur) => {
            view.affichePion(joueur);
        });
    }

    function affiche(socket, view) {
        socket.on('affiche', (type, x, y) => {
            view.affichePion(type, x, y);
        });
    }

    return {
        initSocket(socket, view) {
            affiche(socket, view);
            initJoueur(socket, view);
        }
    }
}) ();
