// objet contenant l'Espion
class Espion extends Pions {
  constructor(couleur, x, y) {
    super(couleur, x, y, "Espion");
    this.init();
    this.un_mort();
  }

  un_mort(){
    this.nombre_en_vie -= 1;
    this.nombre_mort += 1;
  }

  init() {
    this.capacite_de_deplacement.push([[+1, 0]], [[-1, 0]], [[0, -1]], [[0, +1]]);
    this.nombre_en_vie = 1;
    this.puissance = 1;
  }
}