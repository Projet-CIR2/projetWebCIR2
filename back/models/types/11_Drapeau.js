const Pions = require('../Pions');

// objet contenant le Drapeau
class Drapeau extends Pions {
  constructor(couleur) {
    super(couleur, "Drapeau");
    this.init();
  }

  init() {
    this.puissance = 11;
    this.visible = 0;
  }
}

module.exports = Drapeau;
