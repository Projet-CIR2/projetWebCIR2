class Stratego {
    constructor(socket) {
        this.socket = socket;
        // this.socket.emit('removePions');
        // this.socket.emit('affichePion', 'espion', 2, 5);
        // this.socket.emit('removePion', 5, 5);

    }

    play(x, y) {
        console.log('play', x, y);
    }

    placer(joueur, x, y, value) {
        console.log('place');
        this.socket.emit('affichePion', 'espion', x, y);
        this.socket.emit('modifNombrePion', value, 10)
    }
}

module.exports = Stratego;
