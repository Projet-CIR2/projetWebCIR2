// objet contenant le Commandant
class Tour extends Pions {
  constructor(couleur, x, y) {
    super(couleur, x, y, "Commandant");
    this.init();
  }

  init() {
    this.capacite_de_deplacement.push([[+1, 0]], [[-1, 0]], [[0, -1]], [[0, +1]]);
    this.nombre_en_vie = 3;
    this.puissance = 7;
  }
}