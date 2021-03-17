// objet contenant le Colonel
class Colonel extends Pions {
  constructor(couleur, x, y) {
    super(couleur, x, y, "Colonel");
    this.init();
  }

  init() {
    this.capacite_de_deplacement.push([[+1, 0]], [[-1, 0]], [[0, -1]], [[0, +1]]);
    this.nombre_en_vie = 2;
    this.puissance = 8;
  }
}