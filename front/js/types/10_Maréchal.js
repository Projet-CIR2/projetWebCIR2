// objet contenant le Maréchal
class Marechal extends Pions {
  constructor(couleur, x, y) {
    super(couleur, x, y, "Maréchal");
    this.init();
  }

  init() {
    this.capacite_de_deplacement.push([[+1, 0]], [[-1, 0]], [[0, -1]], [[0, +1]]);
    this.puissance = 10;
  }
}