// objet contenant l'Eclaireur
class Dame extends Pions {
  constructor(couleur, x, y) {
    super(couleur, x, y, "Eclaireur");
    this.init();
  }


  init() {
    this.capacite_de_deplacement.push(
        [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0], [-8, 0], [-9, 0]],
        [[+1, 0], [+2, 0], [+3, 0], [+4, 0], [+5, 0], [+6, 0], [+7, 0], [+8, 0], [+9, 0]],
        [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7], [0, -8], [0, -9]],
        [[0, +1], [0, +2], [0, +3], [0, +4], [0, +5], [0, +6], [0, +7], [0, +8], [0, +9]])
    this.nombre_en_vie = 8;
    this.puissance = 2;
  }
}