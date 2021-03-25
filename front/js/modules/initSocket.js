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

    function affichePion() {
        socket.on('affichePion', (type, x, y) => {
            view.affichePion(type, x, y);
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

    return {
        initSocket(socket_, view_) {
            socket = socket_;
            view = view_;
            initJoueur();
            modifNombrePion();
            affichePion();
            removePion();
            removePions();
        }
    }
}) ();
