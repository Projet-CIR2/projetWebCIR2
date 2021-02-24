module.exports = {
    initSocket(socket, game) {
        socket.on('play', (x, y) => {
            game.play(x, y);
        });
    }
}
