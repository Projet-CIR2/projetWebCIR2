const Pions = require('../Pions');

// objet contenant le Général
class General extends Pions {
  constructor(couleur) {
    super(couleur, "Général", 9);
    this.init();
  }

  init() {
    this.capacite_de_deplacement.push([[+1, 0]], [[-1, 0]], [[0, -1]], [[0, +1]]);
    this.puissance = 9;
    this.visible = 0;
  }
}

module.exports = General;
