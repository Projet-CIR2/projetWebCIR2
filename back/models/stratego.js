class Stratego {
    constructor(socket) {
        this.socket = socket;
        this.socket.emit('affiche', 'espion', 5, 5);
    }

    play(x, y) {
        console.log('play', x, y);
    }
}

module.exports = Stratego;
