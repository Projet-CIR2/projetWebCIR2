// objet contenant la Bombe
class Bombe extends Pions {
  constructor(couleur) {
    super(couleur, "Bombe");
    this.init();
  }

  init() {
    this.puissance = 12;
  }
}