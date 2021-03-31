const Stratego = require('./stratego');
const init = require('../modules/initSocket');

class Room{
    constructor(socket, player1, player2){
        console.log("Nouvelle partie entre ", player1, " et ", player2 );
        // const game = new Stratego(socket, "j1", "j2");
        // init.initSocket(socket, game);
    }
}

module.exports = Room;
