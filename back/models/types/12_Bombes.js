const Pions = require('../Pions');

// objet contenant la Bombe
class Bombe extends Pions {
  constructor(couleur) {
    super(couleur, "Bombe");
    this.init();
  }

  init() {
    this.puissance = 12;
    this.visible = 0;
  }
}

module.exports = Bombe;
