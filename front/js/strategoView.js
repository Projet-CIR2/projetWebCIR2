class StrategoView {
    constructor() {
        this.createListeners();
    }

    createListeners() {
        let currentDiv = document.getElementById('plateau');

        for (let i = 0; i < 10; ++i) {
            for (let j = 0; j < 10; ++j) {
                currentDiv.rows[i].cells[j].addEventListener('click', () => {
                    socket.emit('play', i, j);
                });
            }
        }
    }

    clickEvent(x, y) {
        console.log('click en :', x, y);
        socket.emit('play', x, y);
    }

    affichePion() {
        console.log("J'affiche les pions");
    }
}
