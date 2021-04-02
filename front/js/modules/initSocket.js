let socketModule = (function () {
    let socket, view;

    function initJoueur() {
        socket.on('initJoueur', (joueur) => {
            view.initJoueur(joueur);
        });
    }

    function modifNombrePion() {
        socket.on('modifNombrePion', (joueur, numPion, value) => {
            view.modifNombrePion(joueur, numPion, value);
        })
    }

    function modifNbPret() {
        socket.on('modifNbPret', (joueur, value) => {
            view.modifNbPret(joueur, value);
        })
    }

    function affichePlayer() {
        socket.on('affichePlayer', (joueur) => {
            view.affichePlayer(joueur);
        });
    }

    function affichePion() {
        socket.on('affichePion', (type, x, y, joueur, value) => {
            view.affichePion(type, x, y, joueur, value);
        });
    }

    function removePion() {
        socket.on('removePion', (joueur, x, y) => {
            view.removePion(joueur, x, y);
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

    function hey() {
        socket.on('hey', (text) => {
            console.log(text);
        })
    }

    return {
        initSocket(socket_, view_) {
            socket = socket_;
            view = view_;
            initJoueur();
            modifNombrePion();
            modifNbPret();
            affichePion();
            affichePlayer();
            removePion();
            removePions();
            removeTabAjout();
            hey();
        }
    }
}) ();
