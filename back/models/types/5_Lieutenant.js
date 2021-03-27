const Pions = require('../Pions');

// objet contenant le Lieutenant
class Lieutenant extends Pions {
  constructor(couleur) {
    super(couleur, "Lieutenant");
    this.init();
  }


  init() {
    this.capacite_de_deplacement.push([[+1, 0]], [[-1, 0]], [[0, -1]], [[0, +1]]);
    this.puissance = 5;
    this.visible = 0;
  }
}

module.exports = Lieutenant;
