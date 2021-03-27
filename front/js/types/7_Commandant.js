// objet contenant le Commandant
class Commandant extends Pions {
  constructor(couleur) {
    super(couleur, "Commandant");
    this.init();
  }

  init() {
    this.capacite_de_deplacement.push([[+1, 0]], [[-1, 0]], [[0, -1]], [[0, +1]]);
    this.puissance = 7;
  }
}