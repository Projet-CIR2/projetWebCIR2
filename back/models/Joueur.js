//la classe pour les joueur
class Joueur {
    constructor(couleur, pseudo) {
        this.color = couleur; // 0 bleu, 1 rouge
        this.pseudo = pseudo; // pseudo du joueur
        this.pret = 0; // prêt pour le debut de la parti
        this.points = 0; // points du joueur

        this.pions_vivant = [1, 8, 5, 4, 4, 4, 3, 2, 1, 1, 1, 6];
        this.pions_en_jeu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.pions_mort = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
}

module.exports = Joueur;
