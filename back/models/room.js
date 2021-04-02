const Stratego = require('./stratego');
const init = require('../modules/initSocket');

class Room{
    constructor(socket, io, token, player1_, player2_){
        let player1 = player1_;
        let player2 = player2_;
        if (player1 === player2) {
            player1 += ' 1';
            player2 += ' 2';
        }
        io.to(token).emit('hey', 'je suis dans room');
        // const game = new Stratego(socket, "j1", "j2");
        // init.initSocket(socket, game)
      
    }
}

module.exports = Room;
