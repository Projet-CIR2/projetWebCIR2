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

    return {
        initSocket(socket, game) {
            play(socket, game);
            move(socket, game);
        }
    }
}) ();

module.exports = socketModule;
