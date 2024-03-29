const Pions = require('../Pions');

// objet contenant le Capitaine
class Capitaine extends Pions {
  constructor(couleur) {
    super(couleur, "Capitaine", 6);
    this.init();
  }

  init() {
    this.capacite_de_deplacement.push([[+1, 0]], [[-1, 0]], [[0, -1]], [[0, +1]]);
    this.puissance = 6;
    this.visible = 0;
  }
}

module.exports = Capitaine;
