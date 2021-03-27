class StrategoView {
    constructor() {
        this.createListenersTab();
        this.createListenersAjouts();
        this.listenersDescription();
        this.joueur_courant = 0;
        this.debut = {
            "enJeu": false,
            "click": false,
            "value": -1,
            "case": [-1, -1]
        };
        this.affichePlayer(this.joueur_courant);
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
                                if ((this.joueur_courant && j < 4) || (j > 5 && !this.joueur_courant)) {
                                    currentTab = currentDiv.rows[j].cells[i];

                                    socket.emit('placePion', this.joueur_courant, i, j, this.debut.value + 1);
                                    document.getElementById('tabAjout').rows[Math.trunc(this.debut.value / 5)].cells[this.debut.value % 5].removeAttribute('style');
                                    this.debut.click = false;
                                    this.debut.value = -1;
                                }
                            }
                            // sinon c'est qu'on click deux fois de suite sur la grille de jeu
                            else {
                                currentTab = currentDiv.rows[j].cells[i];
                                // si on click deux fois sur 2 cases différentes
                                if (!currentTab.hasAttribute('style')) {
                                    if ((this.joueur_courant && j < 4) || (j > 5 && !this.joueur_courant)) {
                                        document.getElementById('plateau').rows[this.debut.case[1]].cells[this.debut.case[0]].removeAttribute('style');
                                        currentTab.setAttribute('style', 'background:green');
                                        this.debut.case = [i, j];
                                    }
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
                            // if (!(currentTab.firstChild != null && currentTab.firstChild.getAttribute('src') === '../assets/volcan.png')) {
                            if ((this.joueur_courant && j < 4) || (j > 5 && !this.joueur_courant)) {
                                currentTab.setAttribute('style', 'background:green');
                                this.debut.click = true;
                                this.debut.case = [i, j];
                            }

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
                // si on a déjà clické sur une case (grille jeu ou tab ajout)
                if (this.debut.click) {
                    // si on a cliqué avant sur la grille du jeu
                    if (this.debut.case.every(element => element !== -1)) {
                        currentTab = document.getElementById('plateau').rows[this.debut.case[1]].cells[this.debut.case[0]];

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

        let currentButton = document.getElementById('bouton_placement');
        currentButton.addEventListener('click', () => {
            socket.emit('pret', this.joueur_courant);
        });
    }

    modifNombrePion(numPion, value) {
        let currentP = document.getElementsByClassName('nb_piece')[numPion - 1];
        currentP.innerText = currentP.innerText.replace(currentP.innerText[1], value);
    }

    listenersDescription(){
      let currentDiv = document.getElementById('tabAjout');
      let currentDescription = document.getElementById('description');
      for (let i = 0; i < 12; ++i) {
        currentDiv.rows[Math.trunc(i / 5)].cells[i % 5].addEventListener('mouseover', () => {
          switch (i) {
            case 0:
              currentDescription.textContent = "je suis le un" ;
              break;
            case 1:
              currentDescription.textContent = "je suis le deux" ;
              break;
            case 2:
              currentDescription.textContent =  "je suis le trois" ;
              break;
            case 3:
              currentDescription.textContent =  "je suis le quatre" ;
              break;
            case 4:
              currentDescription.textContent =  "je suis le cinq" ;
              break;
            case 5:
              currentDescription.textContent =  "je suis le six" ;
              break;
            case 6:
              currentDescription.textContent =  "je suis le sept" ;
              break;
            case 7:
              currentDescription.textContent =  "je suis le huit" ;
              break;
            case 8:
              currentDescription.textContent =  "je suis le neuf" ;
              break;
            case 9:
              currentDescription.textContent =  "je suis le dix" ;
              break;
            case 10:
              currentDescription.textContent =  "je suis le onze" ;
              break;
            case 11:
              currentDescription.textContent =  "je suis le douze" ;
              break;
          }
        });
      }
    }

    // initialise le joueur à qui appartient le visuel
    initJoueur(joueur) {
        this.joueur_courant = joueur;
    }


    affichePlayer(joueur) {
        let currentP = document.getElementById('joueurQuiJoue');
        if (this.debut.enJeu) currentP.textContent = 'Au tour du joueur ' + (this.joueur_courant.color ? 'rouge' : 'bleu');
        else currentP.textContent = "Vous pouvez placer vos pions";
    }

    // affiche le pion de type type à la position x y
    affichePion(type, x, y) {
        let tab = document.getElementById('plateau');

        if (tab.rows[y].cells[x].firstChild !== null) this.removePion(x, y);

        let img = document.createElement('img');
        tab.rows[y].cells[x].appendChild(img);
        img.setAttribute('class', 'piece');
        img.setAttribute('alt', type + this.joueur_courant.color ? ' rouge' : ' bleu');
        img.setAttribute('src', '../assets/' + (this.joueur_courant.color ? 'rouge' : 'bleu') + '/' + type.toLowerCase() + '.png');
    }

    removePion(x, y) {
        let tab = document.getElementById('plateau');
        let cell = tab.rows[y].cells[x];
        if (cell.firstChild !== null) cell.removeChild(cell.firstChild);
    }

    // enlève tous les pions
    removePions() {
        let tab = document.getElementById('plateau');

        for (let j = 0; j < 10; j++) {
            for (let i = 0; i < 10; i++) {
                if (tab.rows[i].cells[j].firstChild !== null) {
                    if (tab.rows[i].cells[j].firstChild.getAttribute('src') !== '../assets/volcan.png') tab.rows[i].cells[j].removeChild(tab.rows[i].cells[j].firstChild);
                }
            }
        }
    }

    removeTabAjout() {
        document.getElementById('cadre').remove();
    }
}
