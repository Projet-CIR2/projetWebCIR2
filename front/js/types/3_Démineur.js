// objet contenant le Démineur
class Fou extends Pions {
  constructor(couleur, x, y) {
    super(couleur, x, y, "Démineur");
    this.init();
  }

  init() {
    this.capacite_de_deplacement.push([[+1, 0]], [[-1, 0]], [[0, -1]], [[0, +1]]);
    this.nombre_en_vie = 5;
    this.puissance = 3;
  }
}