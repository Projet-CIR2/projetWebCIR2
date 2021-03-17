// objet contenant la Bombe
class Bombe extends Pions {
  constructor(couleur, x, y) {
    super(couleur, x, y, "Bombe");
    this.init();
  }

  init() {
    this.nombre_en_vie = 6;
    this.puissance = 12;
  }
}