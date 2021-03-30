const Pions = require('../Pions');

// objet contenant l'Eclaireur
class Eclaireur extends Pions {
  constructor(couleur) {
    super(couleur, "Eclaireur", 2);
    this.init();
  }


  init() {
    this.capacite_de_deplacement.push(
        [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0], [-8, 0], [-9, 0]],
        [[+1, 0], [+2, 0], [+3, 0], [+4, 0], [+5, 0], [+6, 0], [+7, 0], [+8, 0], [+9, 0]],
        [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7], [0, -8], [0, -9]],
        [[0, +1], [0, +2], [0, +3], [0, +4], [0, +5], [0, +6], [0, +7], [0, +8], [0, +9]])
    this.puissance = 2;
    this.visible = 0;
  }
}

module.exports = Eclaireur;
