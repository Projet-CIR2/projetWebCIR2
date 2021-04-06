//la classe pour les joueur
class Joueur {
    constructor(couleur, pseudo) {
        this.color = couleur; // 0 bleu, 1 rouge
        this.pseudo = pseudo; // pseudo du joueur
        this.pret = 0; // prêt pour le debut de la parti
        this.points = 0; // points du joueur

        this.pions_vivant = [1, 8, 5, 4, 4, 4, 3, 2, 1, 1, 1, 6];//pions que le joueur a en debut de partie
        this.pions_en_jeu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//tableau pour connaitre le nombre de pions qu'il a posé sur le plateau
        this.pions_mort = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//le nombre de pions morts
    }
}

module.exports = Joueur;
