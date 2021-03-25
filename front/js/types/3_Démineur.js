// objet contenant le Démineur
class Demineur extends Pions {
  constructor(couleur) {
    super(couleur, "Démineur");
    this.init();
  }

  init() {
    this.capacite_de_deplacement.push([[+1, 0]], [[-1, 0]], [[0, -1]], [[0, +1]]);
    this.puissance = 3;
  }
}