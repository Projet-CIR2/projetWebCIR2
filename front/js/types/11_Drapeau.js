// objet contenant le Drapeau
class Drapeau extends Pions {
  constructor(couleur, x, y) {
    super(couleur, x, y, "Drapeau");
    this.init();
  }

  init() {
    this.puissance = 11;
  }
}