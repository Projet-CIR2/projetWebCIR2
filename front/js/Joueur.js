//la classe pour les joueur
class Joueur {
    constructor(couleur) {
        this.color = couleur; // 0 blanc, 1 noir
        this.points = 0; //nombre de points
        this.pret = 0; //pret pour le debut de la parti

        this.pions_vivant = [1,8,5,4,4,4,3,2,1,1,1,6];
        this.pions_en_jeu = [];
        this.pions_mort = [];
    }
}