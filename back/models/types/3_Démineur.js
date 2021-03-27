const Pions = require('../Pions');

// objet contenant le Démineur
class Demineur extends Pions {
  constructor(couleur) {
    super(couleur, "Démineur");
    this.init();
  }

  init() {
    this.capacite_de_deplacement.push([[+1, 0]], [[-1, 0]], [[0, -1]], [[0, +1]]);
    this.puissance = 3;
    this.visible = 0;
  }
}

module.exports = Demineur;
