let socketModule = (function () {
    let socket, view;

    function initJoueur() {
        socket.on('initJoueur', (joueur) => {
            view.affichePion(joueur);
        });
    }

    function modifNombrePion() {
        socket.on('modifNombrePion', (numPion, value) => {
            view.modifNombrePion(numPion, value);
        })
    }

    function affichePlayer() {
        socket.on('affichePlayer', (joueur) => {
            view.affichePlayer(joueur);
        });
    }

    function affichePion() {
        socket.on('affichePion', (type, x, y, joueur) => {
            view.affichePion(type, x, y, joueur);
        });
    }

    function removePion() {
        socket.on('removePion', (x, y) => {
            view.removePion(x, y);
        });
    }

    function removePions() {
        socket.on('removePions', () => {
            view.removePions();
        });
    }

    function removeTabAjout() {
        socket.on('removeTabAjout', () => {
            view.removeTabAjout();
        });
    }

    return {
        initSocket(socket_, view_) {
            socket = socket_;
            view = view_;
            initJoueur();
            modifNombrePion();
            affichePion();
            affichePlayer();
            removePion();
            removePions();
            removeTabAjout();
        }
    }
}) ();
