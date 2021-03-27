const Joueur = require('./Joueur');
const Espion = require('./types/1_Espion');
const Eclaireur = require('./types/2_Eclaireur');
const Demineur = require('./types/3_Démineur');
const Sergent = require('./types/4_Sergent');
const Lieunenant = require('./types/5_Lieutenant');
const Capitaine = require('./types/6_Capitaine');
const Commandant = require('./types/7_Commandant');
const Colonel = require('./types/8_Colonel');
const General = require('./types/9_Général');
const Marechal = require('./types/10_Maréchal');
const Drapeau = require('./types/11_Drapeau');
const Bombes = require('./types/12_Bombes');

class Stratego {
    constructor(socket) {
        this.socket = socket;
        this.socket.emit('removePions');
        // this.socket.emit('affichePion', 'espion', 2, 5);
        // this.socket.emit('removePion', 5, 5);
        this.socket.emit('Pseudo', 'Michel');
    }

    play(x, y) {
        console.log('play', x, y);
    }

    placer(joueur, x, y, value) {
        console.log('place');
        this.socket.emit('affichePion', 'espion', x, y);
        this.socket.emit('modifNombrePion', value, 9)
    }

    //regarde si la partie peut etre lancer
    pret(joueur){
        if (joueur.pions_vivant === joueur.pions_en_jeu) {
            joueur.pret = 1;
        }
    }
}

module.exports = Stratego;
