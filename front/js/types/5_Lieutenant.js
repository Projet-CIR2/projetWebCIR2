// objet contenant le Lieutenant
class Lieutenant extends Pions {
  constructor(couleur, x, y) {
    super(couleur, x, y, "Lieutenant");
    this.init();
  }


  init() {
    this.capacite_de_deplacement.push([[+1, 0]], [[-1, 0]], [[0, -1]], [[0, +1]]);
    this.nombre_en_vie = 4;
    this.puissance = 5;
  }
}