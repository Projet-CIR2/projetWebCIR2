const Pions = require('../Pions');

// objet contenant l'Espion
class Espion extends Pions {
  constructor(couleur) {
    super(couleur, "Espion", 1);
    this.init();
  }

  init() {
    this.capacite_de_deplacement.push([[+1, 0]], [[-1, 0]], [[0, -1]], [[0, +1]]);
    this.puissance = 1;
    this.visible = 0;
  }
}

module.exports = Espion;
