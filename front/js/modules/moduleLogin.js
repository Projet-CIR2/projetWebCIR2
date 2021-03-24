let log = (function () {
    let socket, view;
    function logjoueur() {
      socket.on('connection')
      document.getElementById('connect').textContent=logName;
}
    }

    return {
      initSocket(socket_, view_) {
        socket = socket_;
        view = view_;
        logjoueur();
        }
    }
}) ();
