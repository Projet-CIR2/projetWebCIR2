// objet contenant le Général
class General extends Pions {
  constructor(couleur) {
    super(couleur, "Général");
    this.init();
  }

  init() {
    this.capacite_de_deplacement.push([[+1, 0]], [[-1, 0]], [[0, -1]], [[0, +1]]);
    this.puissance = 9;
  }
}