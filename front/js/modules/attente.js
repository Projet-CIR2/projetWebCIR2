let socketModule = (function () {
    function lanceJeu(socket) {
        socket.on('lanceJeu', () => {
            document.location.href="jeu"
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

    function hey(socket) {
        socket.on('hey', (text) => {
            console.log(text);
        })
    }

    return {
        initSocket(socket) {
            console.log('hola !');
            lanceJeu(socket);
            changeRoom(socket);
            coucou(socket);
            hey(socket);
        }
    }
})();
