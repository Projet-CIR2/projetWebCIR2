let socketModule = (function () {
    let socket, game;

    function play() {
        socket.on('play', (x, y) => {
            game.play(x, y);
        });
    }

    function placePion() {
        socket.on('placePion', (joueur, x, y, value) => {
            game.placer(joueur, x, y, value);
        });
    }

    function pret() {
        socket.on('pret', (joueur) => {
            game.pret(joueur);
        });
    }

    function lancerPartie() {
        socket.on('lancerPartie', (joueur) => {
            game.lancerPartie(joueur);
        });
    }

    function enlever() {
        socket.on('enlever', (joueur, x, y) => {
            game.enlever(joueur, x, y);
        });
    }

    function enlevePion() {
        socket.on('enlevePion', (joueur, value) => {
            game.enlevePion(joueur, value);
        })
    }

    function deplacement() {
        socket.on('deplacement', (x_clic, y_clic, x_pos, y_pos) => {
            game.deplacement(x_clic, y_clic, x_pos, y_pos);
        });
    }

    function affiche() {
        socket.on('affiche', (joueur, x_pos, y_pos) => {
            game.affiche(joueur, x_pos, y_pos);
        });
    }

    return {
        initSocket(socket_, game_) {
            socket = socket_;
            game = game_;

            play();
            placePion();
            pret();
            lancerPartie();
            enlever();
            enlevePion();
            deplacement();
            affiche();
        }
    }
}) ();

module.exports = socketModule;
