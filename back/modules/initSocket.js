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

    return {
        initSocket(socket_, game_) {
            socket = socket_;
            game = game_;

            play();
            placePion();
            pret();
            lancerPartie();
            enlever();
        }
    }
}) ();

module.exports = socketModule;
