const Joueur = require('./Joueur');
const Espion = require('./types/1_Espion');
const Eclaireur = require('./types/2_Eclaireur');
const Demineur = require('./types/3_Démineur');
const Sergent = require('./types/4_Sergent');
const Lieutenant = require('./types/5_Lieutenant');
const Capitaine = require('./types/6_Capitaine');
const Commandant = require('./types/7_Commandant');
const Colonel = require('./types/8_Colonel');
const General = require('./types/9_Général');
const Marechal = require('./types/10_Maréchal');
const Drapeau = require('./types/11_Drapeau');
const Bombes = require('./types/12_Bombes');

class Stratego {
    constructor(socket_, io_, token, player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        if (this.player1 === this.player2) {
            this.player1 += ' 1';
            this.player2 += ' 2';
        }

        this.socket = socket_;
        this.io = io_;
        this.token = token;

        this.grid = []; // tableau de position en 10*10
        this.grid_default = [];
        this.tour = 0; // nombre pair : joueur 0, nombre impair : joueur 1
        this.fini = false;
        this.date = Date.now();

        this.joueur_bleu = new Joueur(0, this.player1);
        this.joueur_rouge = new Joueur(1, this.player2);

        this.io.to(token).emit('hey', 'je suis dans le jeu');

        this.socket.emit('initJoueur', this.joueur_bleu);
        this.io.to(this.token).emit('initJoueur', this.joueur_rouge);

        this.egalite = false;
        this.init_grid();
        this.reset();
        this.io.to(token).emit('removeAttente');
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
        this.grid_default[4][2] = -1;
        this.grid_default[4][3] = -1;
        this.grid_default[5][3] = -1;
        this.grid_default[5][2] = -1;

        //deuxième lac
        this.grid_default[4][6] = -1;
        this.grid_default[4][7] = -1;
        this.grid_default[5][6] = -1;
        this.grid_default[5][7] = -1;

        return this.grid_default;
    }

    // remet à 0 le tableau grid et les variables utiles
    reset() {
        this.grid = this.grid_default;

        // remet à 0 les différentes variables
        this.tour = 0;
        this.fini = undefined;
        this.egalite = false;

        this.io.to(this.token).emit('removePions');
    }

    peut_placer_ses_pions(joueur, x, y) {
        if (joueur.color === this.joueur_rouge.color) {
            if (y >= 4 || this.grid_default[y][x] === -1) return false;
        } else {
            if (y <= 5 || this.grid_default[y][x] === -1) return false;
        }
        return true;
    }

    // renvoi le joueur
    getCurrentPlayer() {
        return this.tour % 2 === 0 ? this.joueur_bleu : this.joueur_rouge;
    }

    // renvoi l'état d'une case
    getCaseState(x, y) {
        // vérifie que les coordonnées sont dans la grille
        if (0 <= x && x <= 9 && 0 <= y && y <= 9) {
            return this.grid[y][x];
        }
        // sinon la case n'existe pas
        return undefined;
    }

    //permet de modifier la grille
    modif_grid(x, y, value) {
        // vérifie que les coordonnées sont dans la grille
        if (0 <= x && x <= 9 && 0 <= y && y <= 9) {
            this.grid[y][x] = value;

            return true;
        }
        return false;
    }


    //permet de modifier la grille et initialise le pion
    modif_grid_placer(joueur, x, y, value) {
        if (0 <= x <= 9 && 0 <= y <= 9) {
            switch (value) {
                case 1:
                    this.grid[y][x] = new Espion(joueur.color);
                    break;
                case 2:
                    this.grid[y][x] = new Eclaireur(joueur.color);
                    break;
                case 3:
                    this.grid[y][x] = new Demineur(joueur.color);
                    break;
                case 4:
                    this.grid[y][x] = new Sergent(joueur.color);
                    break;
                case 5:
                    this.grid[y][x] = new Lieutenant(joueur.color);
                    break;
                case 6:
                    this.grid[y][x] = new Capitaine(joueur.color);
                    break;
                case 7:
                    this.grid[y][x] = new Commandant(joueur.color);
                    break;
                case 8:
                    this.grid[y][x] = new Colonel(joueur.color);
                    break;
                case 9:
                    this.grid[y][x] = new General(joueur.color);
                    break;
                case 10:
                    this.grid[y][x] = new Marechal(joueur.color);
                    break;
                case 11:
                    this.grid[y][x] = new Drapeau(joueur.color);
                    break;
                case 12:
                    this.grid[y][x] = new Bombes(joueur.color);
                    break;
                default:
                    return false;
            }
            return true;
        }
        return false;
    }


    //placer les pions en debut de partie
    placer(joueur, x, y, value) {
        if (this.peut_placer_ses_pions(joueur, x, y)) {
            this.modif_grid_placer(joueur, x, y, value);

            this.io.to(this.token).emit('affichePion', this.getCaseState(x, y).type, x, y, joueur, value, this.getCaseState(x, y).visible);

            let somme = 0;
            if (joueur.color === this.joueur_rouge.color) {
                this.joueur_rouge.pions_en_jeu[value - 1] += 1;
                this.joueur_rouge.pions_en_jeu.forEach(element => somme += element);
            } else {
                this.joueur_bleu.pions_en_jeu[value - 1] += 1;
                this.joueur_bleu.pions_en_jeu.forEach(element => somme += element);
            }

            if (!(this.joueur_bleu.pret && this.joueur_rouge.pret)) this.io.to(this.token).emit('modifNbPret', joueur, somme);
        }
    }

    //enleve un pion du plateau
    enlever(joueur, x, y) {
        let value = this.getCaseState(x, y).value;

        this.enlevePion(joueur, value);
        this.modif_grid(x, y, undefined);

        this.io.to(this.token).emit('removePion', joueur, x, y);
    }

    enlevePion(joueur, value) {
        let somme = 0;
        let joueurCourant = joueur.color ? this.joueur_rouge : this.joueur_bleu;
        joueurCourant.pions_en_jeu[value - 1] -= 1;
        joueurCourant.pions_en_jeu.forEach(element => somme += element);
        let nbPion = joueurCourant.pions_vivant[value - 1] - joueurCourant.pions_en_jeu[value - 1];

        if (!(this.joueur_bleu.pret && this.joueur_rouge.pret)) {
            this.io.to(this.token).emit('modifNombrePion', joueur, value - 1, nbPion);
            this.io.to(this.token).emit('modifNbPret', joueur, somme);
        }
    }

    //regarde si la partie peut etre lancer
    pret(joueur) {
        for (let i = 0; i < joueur.pions_vivant.length; i++) {
            if (joueur.pions_vivant[i] !== joueur.pions_en_jeu[i]) {
                joueur.pret = 0;
                return;
            }
        }
        joueur.pret = 1;
    }

    lancerPartie() {
        this.pret(this.joueur_bleu);
        this.pret(this.joueur_rouge);

        if (this.joueur_bleu.pret && this.joueur_rouge.pret) {
            this.io.to(this.token).emit('joueursPrets');
            this.io.to(this.token).emit('affichePlayer', this.getCurrentPlayer());
        }

        return this.joueur_bleu.pret && this.joueur_rouge.pret;
    }


    //va enlever la piece du tableau en vie et la rajouter dans le tableau mort
    un_mort(joueur, value) {
        if (joueur === this.joueur_rouge) {
            this.joueur_rouge.pions_vivant[value - 1] -= 1;
            this.joueur_rouge.pions_mort[value - 1] += 1;
        } else {
            this.joueur_bleu.pions_vivant[value - 1] -= 1;
            this.joueur_bleu.pions_mort[value - 1] += 1;
        }
    }

    //fonction un_mort mais inversé
    un_mort_inverse(joueur, value) {
        if (joueur === this.joueur_rouge) {
            this.joueur_bleu.pions_vivant[value - 1] -= 1;
            this.joueur_bleu.pions_mort[value - 1] += 1;
        } else {
            this.joueur_rouge.pions_vivant[value - 1] -= 1;
            this.joueur_rouge.pions_mort[value - 1] += 1;
        }
    }


    //problème éventuel du 2

    // affiche lors du clic sur une case les cases possibles et les pions qui peuvent être pris
    affiche(joueur, x_pos, y_pos) {
        let list_deplacement = [];

        if (joueur.color === this.getCurrentPlayer().color && !this.egalite && !this.fini) {
            // récupère la case
            let pion = this.getCaseState(x_pos, y_pos);
            let case_tmp;
            let capa_copie;

            // vérifie que la case cliqué contient un pion
            if (pion !== undefined && pion.color === this.getCurrentPlayer().color) {
                capa_copie = pion.capacite_de_deplacement;
                // parcours la liste des possibilités de déplacements du pions
                for (let list_capa of capa_copie) {
                    for (let capa of list_capa) {
                        // vérifie que les coordonnées sont dans le tableau
                        if (0 <= (capa[0] + x_pos) && (capa[0] + x_pos) <= 9 && 0 <= (capa[1] + y_pos) && (capa[1] + y_pos) <= 9) {
                            // récupère la case de la position
                            case_tmp = this.getCaseState(capa[0] + x_pos, capa[1] + y_pos);
                            // console.log(case_tmp);
                            if (case_tmp === undefined) { // si la case est vide, alors on peut se déplacer dessus
                                list_deplacement.push([capa[0] + x_pos, capa[1] + y_pos]);
                            } else if (case_tmp === -1) { //si la case est un lac, alors il bloque cette direction
                                break;
                            } else if (case_tmp.color !== pion.color) { // sinon on vérifie que c'est un pion ennemi
                                list_deplacement.push([capa[0] + x_pos, capa[1] + y_pos]);
                                break;
                            } else { // sinon c'est un pion allié, on ne peut pas le manger et il bloque cette direction
                                break;
                            }
                        }
                    }
                }
            }
            this.io.to(this.token).emit('afficheCasesJouables', this.getCurrentPlayer(), list_deplacement);
        }
        return list_deplacement;
    }


    // déplace le pion et vérifie si un pion est mangé
    // clic position d'arrivé, pos position de départ
    deplacement(x_clic, y_clic, x_pos, y_pos) {
        //vérifie que la partie n'est pas fini
        if (!this.egalite && !this.fini) {

            // récupère la case
            let pion1 = this.getCaseState(x_pos, y_pos);
            let joueur = this.getCurrentPlayer();
            let case_mange;

            // on vérifie que la case de départ n'est pas vide
            if (pion1 !== undefined) {
                // on récupère les endroits où le pion peut se déplacer
                let list_capa = this.affiche(this.getCurrentPlayer(), x_pos, y_pos);

                // on parcours le tableau des positions possibles pour le pion de départ
                for (let pos_tmp of list_capa) {
                    // on vérifie que la case cliqué appartient à la liste des positions de déplacement
                    if (pos_tmp.join() === [x_clic, y_clic].join()) {

                        case_mange = this.getCaseState(x_clic, y_clic);
                        // si la case sur laquelle on veut aller est un pion
                        if (case_mange !== undefined) {

                            pion1.visible = 1;
                            case_mange.visible = 1;

                            //d'abord on vérifie que la partie n'est pas gagné
                            if (case_mange.puissance === 11) {
                                this.win(joueur); //faire la win
                                this.io.to(this.token).emit('affichePion', pion1.type, x_clic, y_clic, joueur, pion1.value, pion1.visible);
                                this.io.to(this.token).emit('removePion', joueur, x_pos, y_pos);
                                return;
                            }

                                //puis si le général est mangé par l'espion ou
                                //puis si une bombe a été détruite ou
                            //si pion est plus puisant que l'adversaire
                            else if ((pion1.puissance === 1 && case_mange.puissance === 10) || (pion1.puissance === 3 && case_mange.puissance === 12) || (pion1.puissance > case_mange.puissance)) {

                                this.un_mort_inverse(joueur, case_mange.puissance);//pion adverse detruit

                                this.modif_grid(x_clic, y_clic, pion1);
                                this.io.to(this.token).emit('affichePion', pion1.type, x_clic, y_clic, joueur, pion1.value, pion1.visible);

                                this.modif_grid(x_pos, y_pos, undefined);
                                this.io.to(this.token).emit('removePion', joueur, x_pos, y_pos);
                            }

                            //si pion est moins puisant que l'adversaire
                            else if (pion1.puissance < case_mange.puissance) {

                                this.un_mort(joueur, case_mange.puissance);//mon pion detruit

                                this.modif_grid(x_pos, y_pos, undefined);
                                this.io.to(this.token).emit('removePion', joueur, x_pos, y_pos);

                                this.io.to(this.token).emit('affichePion', case_mange.type, x_clic, y_clic, (joueur.color) ? this.joueur_bleu : this.joueur_rouge, case_mange.value, case_mange.visible);
                            }

                            //si les puissances sont les même
                            else if (pion1.puissance === case_mange.puissance) {

                                this.un_mort_inverse(joueur, case_mange.puissance);//pion adverse detruit
                                this.un_mort(joueur, case_mange.puissance);//mon pion detruit

                                this.modif_grid(x_clic, y_clic, undefined);
                                this.io.to(this.token).emit('removePion', joueur, x_clic, y_clic);

                                this.modif_grid(x_pos, y_pos, undefined);
                                this.io.to(this.token).emit('removePion', joueur, x_pos, y_pos);
                            }

                        } else {
                            this.modif_grid(x_clic, y_clic, pion1);
                            this.io.to(this.token).emit('affichePion', pion1.type, x_clic, y_clic, joueur, pion1.value, pion1.visible);

                            this.modif_grid(x_pos, y_pos, undefined);
                            this.io.to(this.token).emit('removePion', joueur, x_pos, y_pos);
                        }

                        if (!this.is_egalite()) {
                            this.tour++;
                            this.io.to(this.token).emit('affichePlayer', this.getCurrentPlayer());

                            this.deplacement_impossible();
                        }
                        this.io.to(this.token).emit('removeCasesJouables');

                        return true;
                    }
                }
            }
            return false;
        }
    }


    //vérifie si le joueur donner a encore des pions a déplacer
    deplacement_impossible() {
        for (let i = 0; i < 10; ++i) {
            for (let j = 0; j < 10; ++j) {
                if (this.getCaseState(j, i) !== undefined && this.getCaseState(j, i).color === this.getCurrentPlayer().color){
                    if (this.affiche(j, i) !== undefined){
                        return false;
                    }
                }
            }
        }
        this.tour += 1;
        return this.is_egalite();
    }


    //calcule les points des joueur a la fin de partie
    points_joueur() {
        this.joueur_bleu.points = 0;
        this.joueur_rouge.points = 0;

        let temps_ecoule = (Date.now() - this.date) / 60000;

        for (let i = 0; i < 12; i++) {
            this.joueur_bleu.points += this.joueur_rouge.pions_mort[i] * (i + 1);
            this.joueur_rouge.points += this.joueur_bleu.pions_mort[i] * (i + 1);
        }
        this.joueur_bleu.points += (temps_ecoule / Math.pow(temps_ecoule, 2)) * 1000;
        this.joueur_rouge.points += (temps_ecoule / Math.pow(temps_ecoule, 2)) * 1000;

        this.joueur_bleu.points = Math.round(this.joueur_bleu.points);
        this.joueur_rouge.points = Math.round(this.joueur_rouge.points);
    }

    //vérifie que les deux joueurs ne peuvent plus jouer et fin de partie si c'est le cas
    is_egalite() {
        for(let i = 0; i < 10; ++i) {
            for (let j = 0; j < 10; ++j) {
                if (this.affiche(i, j) !== undefined) {
                    return false;
                }
            }
        }

        this.points_joueur();
        this.egalite = true;

        // lance affichage win
        let texte;
        if (this.joueur_rouge.points === this.joueur_bleu.points) texte = 'Il y a une égalité parfaite entre les deux joueurs avec ' + this.joueur_bleu.points + ' points chacun !'
        else texte = 'Avec ' + this.joueur_bleu.points + ' points pour ' + this.joueur_bleu.pseudo + ' et ' + this.joueur_rouge.points + ' points pour ' + this.joueur_rouge.pseudo + '<br> Les deux joueurs ne peuvent plus bouger';
        this.io.to(this.token).emit('finDuJeu', this.getWinner(), texte);

        return true;
    }


    win(joueur) {
        this.points_joueur();
        joueur.points += 75;
        this.fini = true;

        let texte = 'Avec ' + this.joueur_bleu.points + ' points pour ' + this.joueur_bleu.pseudo + ' et ' + this.joueur_rouge.points + ' points pour ' + this.joueur_rouge.pseudo;
        texte += '<br><br> Le drapeau de ' + (joueur.color ? this.joueur_bleu.pseudo : this.joueur_rouge.pseudo) + ' a été capturé par ' + joueur.pseudo;
        this.io.to(this.token).emit('finDuJeu', this.getWinner(), texte);
    }


    // retourne le joueur gagnant
    getWinner() {
        // le gagnant est le dernier joueur à avoir joué
        return this.joueur_rouge.points > this.joueur_bleu.points ? this.joueur_rouge : this.joueur_bleu;
    }
}

module.exports = Stratego;
