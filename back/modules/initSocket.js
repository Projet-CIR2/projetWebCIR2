let socketModule = (function () {
    function play(socket, game) {
        socket.on('play', (x, y) => {
            game.play(x, y);
        });
    }

    function move(socket, game) {
        socket.on('move', (x1, y1) => {
            console.log(x1, y1);
        });
    }

    function placePion(socket, game) {
        socket.on('placePion', (joueur, x, y, value) => {
            game.placer(joueur, x, y, value);
        });
    }

    return {
        initSocket(socket, game) {
            play(socket, game);
            move(socket, game);
            placePion(socket, game);
        }
    }
}) ();

module.exports = socketModule;
