class Stratego {
    constructor() {
        this.play(0, 0);
    }

    play(x, y) {
        console.log('play', x, y);
    }
}

module.exports = Stratego();
