class StrategoView {
    constructor() {
        this.createListeners();
    }

    createListeners() {
        let currentDiv = document.getElementById('plateau');
        console.log(currentDiv);
        // currentDiv.addEventListener('click', () => {
        //     this.clickEvent(0, 0);
        // });
        for (let i = 0; i < 10; ++i) {
            for (let j = 0; j < 10; ++j) {
                currentDiv.rows[i].cells[j].addEventListener('click', () => {
                    this.clickEvent(i, j);
                });
            }
        }
    }

    clickEvent(x, y) {
        console.log('click en :', x, y);
        socket.emit('play', x, y);
    }
}
