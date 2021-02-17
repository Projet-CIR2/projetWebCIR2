// objet contenant l'Espion
class Cavalier extends Pions {
  constructor(couleur, x, y) {
    super(couleur, x, y, "Espion");
    this.init();
  }


  init() {
    this.capacite_de_deplacement.push([[+1, 0]], [[-1, 0]], [[0, -1]], [[0, +1]]);
    this.nombre_en_vie = 1;
    this.puissance = 1;

    this.visible = visible;
    this.nombre_mort = 0;
  }
}