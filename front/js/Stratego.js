//import("./Pions.js");
//import("./Joueur.js");

class Stratego {
    constructor() {
        this.grid; // tableau de position en 10*10
        this.grid_default;
        this.tour = 0; // nombre pair : joueur 0, nombre impair : joueur 1

        this.joueur_bleu = new Joueur(0);
        this.joueur_rouge = new Joueur(1);

        this.deja_dans_affiche = false;

        this.egalite = false;
        this.deplacement(x_clic, y_clic, x_pos, y_pos);
        this.init_grid();
        this.reset();
        this.peut_placer_ses_pions(joueur, x, y);
        this.win();

        //fonction pour verifier si l'on peut lancer la partie
        this.pret(joueur);
        this.lancer_partie();
    }

    // initialise la taille de la liste grid
    init_grid() {
        this.grid_default = new Array(10);

        for (let i = 0; i < 10; ++i) {
            this.grid_default[i] = new Array(10);
        }
        for (let i = 0; i < 10; ++i) {
            for (let j = 0; j < 10; ++j) {
                this.grid_default[j][i] = undefined;
            }
        }

        //premier lac
        this.grid_default[2][4] = -1;
        this.grid_default[3][4] = -1;
        this.grid_default[3][5] = -1;
        this.grid_default[2][5] = -1;

        //deuxième lac
        this.grid_default[6][4] = -1;
        this.grid_default[7][4] = -1;
        this.grid_default[6][5] = -1;
        this.grid_default[7][5] = -1;

        return this.grid_default;
    }

    // remet à 0 le tableau grid et les variables utiles
    reset() {
        this.grid = this.grid_default;

        // remet à 0 les différentes variables
        this.tour = 0;
        this.fini = undefined;
        this.egalite = false;
    }

    peut_placer_ses_pions(joueur, x, y) {
        if (joueur === this.joueur_rouge) {
            if (y < 4 && this.grid_default[x][y] !== undefined){
            return false;
            }
        }

        else {
            if (y > 5 && this.grid_default[x][y] !== undefined){
                return false;
            }
        }
    }

    // renvoi le joueur
    getCurrentPlayer() {
        return (this.tour % 2); // 0 bleu, 1 rouge
    }

    // renvoi l'etat d'une case
    getCaseState(x, y) {
        // vérifie que les coordonnées sont dans la grille
        if (0 <= x <= 9 && 0 <= y <= 9) {
            return this.grid[y][x];
        }
        // sinon la case n'existe pas
        return false;
    }

    //permet de modifier la grille
    modif_grid(x, y, value) {
        // vérifie que les coordonnées sont dans la grille
        if (0 <= x <= 9 && 0 <= y <= 9) {
            this.grid[y][x] = value;
            return true;
        }
        return false;
    }

    //pas finit a revoir plus serieusement
    ajout_points(joueur){
        if (joueur === this.joueur_rouge){
            if (type === "Espion") {
                joueur.points += 1.0;
            }
            else if (type === "Eclaireur") {
                joueur.points += 2.0;
            }
            else if (type === "Démineur") {
                joueur.points += 3.0;
            }
            else if (type === "Sergent") {
                joueur.points += 4.0;
            }
            else if (type === "Lieutenant") {
                joueur.points += 5.0;
            }
            else if (type === "Capitaine") {
                joueur.points += 6.0;
            }
            else if (type === "Commandant") {
                joueur.points += 7.0;
            }
            else if (type === "Colonel") {
                joueur.points += 8.0;
            }
            else if (type === "Général") {
                joueur.points += 9.0;
            }
            else if (type === "Maréchal") {
                joueur.points += 10.0;
            }
            else if (type === "Bombes") {
                joueur.points += 1.0;
            }
        }
    }

    //regarde si la partie peut etre lancer
    pret(joueur){
        if (joueur.pions_vivant === joueur.pions_en_jeu) {
            joueur.pret = 1;
        }
    }

    lancer_partie(){
        this.pret(this.joueur_bleu);
        this.pret(this.joueur_rouge);

        return this.joueur_bleu.pret === 1 && this.joueur_rouge.pret === 1;

    }






    //probleme eventuel du 2

    // affiche lors du clic sur une case les cases possibles et les pions qui peuvent être pris
    affiche(x_pos, y_pos) {
        // récupère la case
        let pion = this.getCaseState(x_pos, y_pos);
        let case_tmp;
        let list_deplacement = [];
        let capa_copie;

        // vérifie que la case cliqué contient un pion
        if (pion !== undefined && pion.color === this.getCurrentPlayer() && !this.isFinished()) {
            capa_copie = pion.capacite_de_deplacement;

            // parcours la liste des possibilités de déplacements du pions
            for (let list_capa of capa_copie) {
                for (let capa of list_capa) {

                    // vérifie que les coordonnées sont dans le tableau
                    if (0 < (capa[0] + pion.x) < 9 && 0 < (capa[1] + pion.y) < 9) {
                        // récupère la case de la position                      pk capa[1]???????
                        case_tmp = this.getCaseState(capa[0] + pion.x, capa[1] + pion.y);

                        //le 2 devrais poser probleme
                        if (case_tmp === undefined) { // si la case est vide, alors on peut se déplacer dessus
                            list_deplacement.push([capa[0] + pion.x, capa[1] + pion.y]);
                        } else if (case_tmp.color !== pion.color) { // sinon on vérifie que c'est un pion ennemi
                            list_deplacement.push([capa[0] + pion.x, capa[1] + pion.y]);
                            break;
                        } else if (case_tmp === -1) { //si la case est un lac, alors il bloque cette direction
                            break;
                        } else { // sinon c'est un pion allié, on ne peut pas le manger et il bloque cette direction
                            break;
                        }
                    }
                }
            }
        }


        return list_deplacement;
    }








    // déplace le pion et vérifie si un pion est mangé
    deplacement(x_clic, y_clic, x_pos, y_pos) {
        // récupère la case
        let pion = this.getCaseState(x_pos, y_pos);

        // on vérifie que la case de départ n'est pas vide
        if (pion !== undefined) {
            // on récupère les endroits où le pion peut se déplacer
            let list_capa = this.affiche(pion.x, pion.y);

            // on parcours le tableau des positions possibles pour le pion de départ
            for (let pos_tmp of list_capa) {
                // on vérifie que la case cliqué appartient à la liste des positions de déplacement
                if (pos_tmp.join() === [x_clic, y_clic].join()) {

                    let case_mange = this.getCaseState(x_clic, y_clic);
                    // si la case sur laquelle on veut aller est un pion
                    if (case_mange !== undefined) {

                        let pion1 = pion.get_pion_type();
                        let pion2 = case_mange.get_pion_type();

                        //d'abord on vérifie que la partie n'est pas gagné
                        if (pion2.puissance === 11){
                            win(joueur); //faire la win
                        }

                        //puis si le général est mangé par l'espion
                        else if (pion1.puissance === 1 && pion2.puissance === 10){
                            pion2.un_mort();

                            pion1.x = x_clic;
                            pion1.y = y_clic;
                            this.modif_grid(x_clic, y_clic, pion);
                            this.modif_grid(x_pos, y_pos, undefined);
                        }

                        //puis si la bombe a été detruite
                        else if (pion1.puissance === 3 && pion2.puissance === 12){
                            pion2.un_mort();

                            pion1.x = x_clic;
                            pion1.y = y_clic;
                            this.modif_grid(x_clic, y_clic, pion);
                            this.modif_grid(x_pos, y_pos, undefined);
                        }

                        //si les puissances sont les même
                        else if (pion1.puissance === pion2.puissance ){
                            pion1.un_mort();
                            pion2.un_mort();

                            this.modif_grid(x_clic, y_clic, undefined);
                            this.modif_grid(x_pos, y_pos, undefined);
                        }

                        //si pion est plus puisant que l'adversaire
                        else if (pion1.puissance >= pion2.puissance){
                            pion2.un_mort();

                            pion1.x = x_clic;
                            pion1.y = y_clic;
                            this.modif_grid(x_clic, y_clic, pion);
                            this.modif_grid(x_pos, y_pos, undefined);
                        }

                        //si pion est moins puisant que l'adversaire
                        else if (pion1.puissance <= pion2.puissance){
                            pion1.un_mort();

                            this.modif_grid(x_clic, y_clic, undefined);
                        }
                    }
                    return true;
                }
            }
        }
        return false;
    }










    // détermine s'il y a un gagnant ou non
    isFinished() {
        // this.fini permet de savoir si l'on a déjà effectué la boucle ou non
        if (this.fini == undefined) {
            this.fini = false;
            // cas où l'un des rois est mat
            if (this.isMat(0)[0] || this.isMat(1)[0]) {
                this.fini = true;
                return true;
            }
            // cas où il ne reste que les deux rois sur le terrain, il y a égalité
            if (this.pions_manges.length == 30) {
                this.fini = true;
                this.egalite = true;
                return true;
            }
            // si un des rois a été mangé, alors le jeu est fini
            for (let pion of this.pions_manges) {
                if (pion[0].type == "Roi") {
                    this.fini = true;
                    return true;
                }
            }
        }
        return this.fini;
    }

    // retourne le joueur gagnant
    getWinner() {
        // le gagnant est le dernier joueur à avoir joué
        return this.getCurrentPlayer();
    }
}
