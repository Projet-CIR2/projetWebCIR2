// objet contenant le Capitaine
class Capitaine extends Pions {
  constructor(couleur, x, y) {
    super(couleur, x, y, "Capitaine");
    this.init();
  }

  init() {
    this.capacite_de_deplacement.push([[+1, 0]], [[-1, 0]], [[0, -1]], [[0, +1]]);
    this.puissance = 6;
  }
}