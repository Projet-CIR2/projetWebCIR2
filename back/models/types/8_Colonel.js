const Pions = require('../Pions');

// objet contenant le Colonel
class Colonel extends Pions {
  constructor(couleur) {
    super(couleur, "Colonel", 8);
    this.init();
  }

  init() {
    this.capacite_de_deplacement.push([[+1, 0]], [[-1, 0]], [[0, -1]], [[0, +1]]);
    this.puissance = 8;
    this.visible = 0;
  }
}

module.exports = Colonel;
