// objet contenant le Drapeau
class Drapeau extends Pions {
  constructor(couleur, x, y) {
    super(couleur, x, y, "Drapeau");
    this.init();
  }

  init() {
    this.nombre_en_vie = 1;
    this.puissance = 11;
  }
}