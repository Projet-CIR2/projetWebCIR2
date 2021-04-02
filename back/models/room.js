
const Stratego = require('./stratego');
const init = require('../modules/initSocket');

class Room{
    constructor(socket, player1_, player2_){
        let player1 = player1_;
        let player2 = player2_;
        // socket.broadcast.to(player1).emit('lanceJeu');
        console.log("Nouvelle partie entre ", player1, " et ", player2 );
        // const game = new Stratego(socket, "j1", "j2");
        // init.initSocket(socket, game)
      
    }
}

module.exports = Room;
