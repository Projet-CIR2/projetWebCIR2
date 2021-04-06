let disp = (function () {
    let socket;

    function display() {
        socket.on('Display', table => {

            let tbody = document.getElementById("leaderBoard");
           
            table.sort((a,b) => b.Score - a.Score);
            
            table.forEach(el => {

                let rowTR = document.createElement("tr");
                let row = [el.Pseudo, el.Score, el.Victoire, el.Defaite];

                row.forEach(cell => {
                    let cellTH = document.createElement("th");
                    cellTH.textContent = cell;
                    rowTR.appendChild(cellTH);
                });

                tbody.appendChild(rowTR);    
                
            });

            
            
   
        });
    }

    return {
        initSocket(socket_) {
            socket = socket_;
            socket.emit('board');
            display();
        }
    }
})();
