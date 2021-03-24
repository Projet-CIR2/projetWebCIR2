// objet contenant la Bombe
class Bombe extends Pions {
  constructor(couleur, x, y) {
    super(couleur, x, y, "Bombe");
    this.init();
  }

  init() {
    this.puissance = 12;
  }
}