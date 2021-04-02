let socketModule = (function () {
    function lanceJeu(socket) {
        socket.on('lanceJeu', () => {
            window.history.pushState("", "", '/jeu');
        })
    }

    function changeRoom(socket) {
        socket.on('changeRoom', (idRoom) => {
            socket.emit('changeRoom', idRoom);
        })
    }

    function coucou(socket) {
        socket.on('coucou', () => {
            console.log('coucou');
        })
    }

    return {
        initSocket(socket) {
            console.log('hola !');
            lanceJeu(socket);
            changeRoom(socket);
            coucou(socket);
        }
    }
}) ();
