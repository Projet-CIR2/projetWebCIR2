let log = (function () {
    let socket;

    function logjoueur() {
        socket.on('Pseudo', pseudo => {
            document.getElementById('connect').textContent=pseudo;
        });
    }

    return {
      initSocket(socket_, view_) {
        socket = socket_;
        logjoueur();
        }
    }
}) ();
