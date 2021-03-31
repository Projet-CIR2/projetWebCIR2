let log = (function () {
    let socket;

    function logjoueur() {
        socket.on('Pseudo', pseudo => {
          let currentDiv = document.getElementById("connect");
          currentDiv.textContent=pseudo + " | ";
          let deco = document.createElement('a');
          deco.setAttribute('href',"#");
          deco.setAttribute('id',"deconnection");
          deco.setAttribute('title',"Coucou c'est moi");

          deco.textContent="se deconnecter";
          currentDiv.appendChild(deco);
        });
    }

    return {
      initSocket(socket_) {
        socket = socket_;
        logjoueur();
        }
    }
}) ();
