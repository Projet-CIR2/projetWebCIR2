class StrategoView {
    constructor() {
        this.createListenersTab();
        this.createListenersAjouts();
        this.joueur_courant = 0;
        this.debut = {
            "enJeu": false,
            "click": false,
            "value": -1,
            "case": [-1, -1]
        };
    }

    createListenersTab() {
        let currentDiv = document.getElementById('plateau');
        let currentTab;

        for (let j = 0; j < 10; ++j) {
            for (let i = 0; i < 10; ++i) {
                currentDiv.rows[j].cells[i].addEventListener('click', () => {
                    if (this.debut.enJeu) socket.emit('play', i, j);
                    else {
                        // si un click a déjà été fais
                        if (this.debut.click) {
                            // si le click précédent était sur la tab ajout
                            if (this.debut.value !== -1) {
                                currentTab = currentDiv.rows[j].cells[i];
                                if (currentTab.firstChild !== null) currentTab.removeChild(currentTab.firstChild);

                                socket.emit('placePion', this.joueur_courant, i, j, this.debut.value + 1);
                                document.getElementById('tabAjout').rows[Math.trunc(this.debut.value / 5)].cells[this.debut.value % 5].removeAttribute('style');
                                this.debut.click = false;
                                this.debut.value = -1;
                            }
                            // sinon c'est qu'on click deux fois de suite sur la grille de jeu
                            else {
                                currentTab = currentDiv.rows[j].cells[i];
                                // si on click deux fois sur 2 cases différentes
                                if (!currentTab.hasAttribute('style')) {
                                    document.getElementById('plateau').rows[this.debut.case[1]].cells[this.debut.case[0]].removeAttribute('style');
                                    currentTab.setAttribute('style', 'background:green');
                                    this.debut.case = [i, j];
                                }
                                // si on click deux fois sur la même case
                                else {
                                    currentTab.removeAttribute('style');
                                    this.debut.click = false;
                                    this.debut.case = [-1, -1];

                                    // on supprime le pion sur cette case
                                    if (currentTab.firstChild !== null) currentTab.removeChild(currentTab.firstChild);
                                }
                            }
                        }
                        // on affiche la case clické en vert
                        else {
                            currentTab = currentDiv.rows[j].cells[i];
                            currentTab.setAttribute('style', 'background:green');
                            this.debut.click = true;
                            this.debut.case = [i, j];
                        }
                    }
                });
            }
        }
    }

    createListenersAjouts() {
        let currentDiv = document.getElementById('tabAjout');
        let currentTab;

        for (let i = 0; i < 12; ++i) {
            currentDiv.rows[Math.trunc(i / 5)].cells[i % 5].addEventListener('click', () => {
                // si on a déjà clické sur une case (grille jeu ou tab ajout
                if (this.debut.click) {
                    // si on a cliqué avant sur la grille du jeu
                    if (this.debut.case.every(element => element !== -1)) {
                        currentTab = document.getElementById('plateau').rows[this.debut.case[1]].cells[this.debut.case[0]];

                        // permet de remplacer le pion précédent
                        if (currentTab.firstChild !== null) currentTab.removeChild(currentTab.firstChild);

                        socket.emit('placePion', this.joueur_courant, this.debut.case[0], this.debut.case[1], i + 1);
                        currentTab.removeAttribute('style');
                        this.debut.click = false;
                        this.debut.case = [-1, -1];
                    }
                    else {
                        currentTab = currentDiv.rows[Math.trunc(i / 5)].cells[i % 5];

                        // cas où on click deux fois de suite sur deux cases de tab ajout différentes
                        if (!currentTab.hasAttribute('style')) {
                            document.getElementById('tabAjout').rows[Math.trunc(this.debut.value / 5)].cells[this.debut.value % 5].removeAttribute('style');
                            currentTab.setAttribute('style', 'background:green');
                            this.debut.value = i;
                        }
                        // cas où on click deux fois de suite sur la même case
                        else {
                            currentTab.removeAttribute('style');
                            this.debut.click = false;
                            this.debut.value = -1;
                        }
                    }
                }
                // si aucun click n'a déjà été réalisé, on passe la couleur en vert
                else {
                    currentDiv.rows[Math.trunc(i / 5)].cells[i % 5].setAttribute('style', 'background:green');
                    this.debut.click = true;
                    this.debut.value = i;
                }

            });
        }
    }

    modifNombrePion(numPion, value) {
        let currentP = document.getElementsByClassName('nb_piece')[numPion - 1];
        currentP.innerText = currentP.innerText.replace(currentP.innerText[1], value);
    }

    // initialise le joueur à qui appartient le visuel
    initJoueur(joueur) {
        this.joueur_courant = joueur;
    }

    // affiche le pion de type type à la position x y
    affichePion(type, x, y) {
        let tab = document.getElementById('plateau');

        let img = document.createElement('img');
        tab.rows[y].cells[x].appendChild(img);
        img.setAttribute('class', 'piece');
        img.setAttribute('alt', type + this.joueur_courant.color ? ' rouge' : ' bleu');
        img.setAttribute('src', '../assets/' + (this.joueur_courant.color ? 'rouge' : 'bleu') + '/' + type.toLowerCase() + '.png');
    }

    removePion(x, y) {
        let tab = document.getElementById('plateau');

        if (tab.rows[x].cells[y].firstChild !== null) tab.rows[x].cells[y].removeChild(tab.rows[x].cells[y].firstChild);
    }

    // enlève tous les pions
    removePions() {
        let tab = document.getElementById('plateau');

        for (let j = 0; j < 10; j++) {
            for (let i = 0; i < 10; i++) {
                if (tab.rows[i].cells[j].firstChild !== null) {
                    tab.rows[i].cells[j].removeChild(tab.rows[i].cells[j].firstChild);
                }
            }
        }
    }


}
