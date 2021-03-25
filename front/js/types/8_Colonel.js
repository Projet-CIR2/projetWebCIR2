// objet contenant le Colonel
class Colonel extends Pions {
  constructor(couleur) {
    super(couleur, "Colonel");
    this.init();
  }

  init() {
    this.capacite_de_deplacement.push([[+1, 0]], [[-1, 0]], [[0, -1]], [[0, +1]]);
    this.puissance = 8;
  }
}