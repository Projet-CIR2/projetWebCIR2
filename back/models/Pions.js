// parent de tous les pions
class Pions {
  constructor(couleur, type, value) {
    this.color = couleur;  // 0 blanc, 1 noir
    this.type = type; // type du pion
    this.value = value; // valeur du pion de 1 à 12
    this.puissance = 0; //puissance de la piece
    this.visible = 0; //la piece est-elle visible pour le joueur adverse, 0 non 1 oui
    this.capacite_de_deplacement = []; // liste des positions où peut se déplacer le pion autour de lui même
  }
}

module.exports = Pions;
