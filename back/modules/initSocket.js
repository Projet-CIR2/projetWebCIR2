// module.exports = {
//     initSocket(socket, game) {
//         socket.on('play', (x, y) => {
//             game.play(x, y);
//         });
//         socket.on('move', (x1, y1) => {
//             console.log(x1, y1);
//         });
//     }
// }



let socketModule = (function () {
    // l'objet args correspond aux arguments qui seront appelés par le callBack
    // exemple pour play, args[0] correspond à x et args[1] correspond à y
    // en réalité ça ne sert algorithmiquement pas à grand chose, mais il est la pour plus de lisibilité
    let tabSockets = [
        {id:'play', args:'(x, y)', callBack:'game.play(args[0], args[1])'},
        {id:'move', args:'', callBack:'console.log("move")'}
    ];

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
            for (let unSocket of tabSockets) {
                socket.on(unSocket.id, (...args) => {
                    eval(unSocket.callBack);
                });
            }

            // play(socket, game);
            // move(socket, game);
        }
    }
}) ();

module.exports = socketModule;
