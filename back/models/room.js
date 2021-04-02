const Stratego = require('./stratego');
const init = require('../modules/initSocket');

class Room {
    constructor(socket, io_, token, player1_, player2_){
        this.player1 = player1_;
        this.player2 = player2_;
        this.io = io_;
        if (this.player1 === this.player2) {
            this.player1 += ' 1';
            this.player2 += ' 2';
        }
        this.io.to(token).emit('hey', 'je suis dans room');
        // const game = new Stratego(socket, io_, token, this.player1, this.player2);
        init.initSocket(socket, game);
    }
}

module.exports = Room;
