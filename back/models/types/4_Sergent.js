const Pions = require('../Pions');

// objet contenant le Sergent
class Sergent extends Pions {
  constructor(couleur) {
    super(couleur, "Sergent", 4);
    this.init();
  }


  init() {
    this.capacite_de_deplacement.push([[+1, 0]], [[-1, 0]], [[0, -1]], [[0, +1]]);
    this.puissance = 4;
    this.visible = 0;
  }
}

module.exports = Sergent;
