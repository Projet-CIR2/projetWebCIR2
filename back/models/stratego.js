class Stratego {
    constructor(socket) {
        this.socket = socket;
    }

    play(x, y) {
        console.log('play', x, y);
        this.socket.emit('affiche');
    }
}

module.exports = Stratego;
