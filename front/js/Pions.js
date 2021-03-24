// parent de tous les pions
class Pions {
  constructor(couleur, x, y, type) {
    this.color = couleur;  // 0 blanc, 1 noir
    this.x = x; // position x du pion
    this.y = y; // position y du pion
    this.type = type; // type du pion
    this.puissance = 0; //puissance de la piece
    this.visible = 0; //la piece est-elle visible pour le joueur adverse
    this.capacite_de_deplacement = []; // liste des positions où peut se déplacer le pion autour de lui même
  }

  get_pion_type() {
    return this.type;
  }
}