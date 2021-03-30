class StrategoView {
    constructor() {
        this.joueur_courant = 0;
        this.debut = {
            "enJeu": false,
            "pret": false,
            "click": false,
            "value": -1,
            "case": [-1, -1]
        };
        this.sauter = false;

        this.initTab();
        this.createListenersTab();
        this.createListenersAjouts();
        this.listenersDescription();
    }

    initTab() {
        let currentDiv = document.getElementById('plateau');
        let tr, td, img;

        for (let j = 0; j < 10; ++j) {
            tr = document.createElement('tr');
            for (let i = 0; i < 10; ++i) {
                td = document.createElement('td');

                if (((2 <= i && i <= 3) || (6 <= i && i <= 7)) && (4 <= j && j <= 5)) {
                    img = document.createElement('img');
                    img.setAttribute('class', 'piece');
                    img.setAttribute('src', '../assets/volcan.png');
                    img.setAttribute('alt', 'volcan');

                    td.appendChild(img)
                }

                tr.appendChild(td);
            }
            currentDiv.appendChild(tr);
        }
    }

    initAjout() {
        let tabImg = document.getElementsByClassName('piece');
        let src;

        if (this.joueur_courant.color) {
            for (let currentImg of tabImg) {
                if (currentImg.getAttribute('alt') !== 'volcan') {
                    src = currentImg.getAttribute('src');
                    src = src.replace('bleu', 'rouge');
                    currentImg.setAttribute('src', src);
                }
            }
        }
    }

    createListenersTab() {
        let currentDiv = document.getElementById('plateau');
        let currentTab, currentCell;

        for (let j = 0; j < 10; ++j) {
            for (let i = 0; i < 10; ++i) {
                currentDiv.rows[j].cells[i].addEventListener('click', () => {
                    if (this.debut.enJeu) socket.emit('play', i, j);
                    else if (!this.debut.pret) {
                        // si un click a déjà été fais
                        if (this.debut.click) {
                            // si le click précédent était sur la tab ajout
                            if (this.debut.value !== -1) {
                                currentCell = document.getElementsByClassName('nb_piece')[this.debut.value];
                                if (((this.joueur_courant.color && j < 4) || (j > 5 && !this.joueur_courant.color)) && currentCell.textContent[1] !== '0') {
                                    currentTab = currentDiv.rows[j].cells[i];

                                    socket.emit('placePion', this.joueur_courant, i, j, this.debut.value + 1);
                                    document.getElementById('tabAjout').rows[Math.trunc(this.debut.value / 5)].cells[this.debut.value % 5].removeAttribute('style');
                                    this.modifNombrePion(this.debut.value, Number(currentCell.textContent[1]) - 1)
                                    this.debut.click = false;
                                    this.debut.value = -1;
                                }
                            }
                            // sinon c'est qu'on click deux fois de suite sur la grille de jeu
                            else {
                                currentTab = currentDiv.rows[j].cells[i];
                                // si on click deux fois sur 2 cases différentes
                                if (!currentTab.hasAttribute('style')) {
                                    if ((this.joueur_courant.color && j < 4) || (j > 5 && !this.joueur_courant.color)) {
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
                                    this.sauter = true;

                                    // on supprime le pion sur cette case
                                    if (currentTab.firstChild !== null) socket.emit('enlever', this.joueur_courant, i, j);
                                }
                            }
                        }
                        // on affiche la case clické en vert
                        else {
                            currentTab = currentDiv.rows[j].cells[i];
                            // if (!(currentTab.firstChild != null && currentTab.firstChild.getAttribute('src') === '../assets/volcan.png')) {
                            if ((this.joueur_courant.color && j < 4) || (j > 5 && !this.joueur_courant.color)) {
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
        let currentTab, currentCell;

        for (let i = 0; i < 12; ++i) {
            currentDiv.rows[Math.trunc(i / 5)].cells[i % 5].addEventListener('click', () => {
                // si on a déjà clické sur une case (grille jeu ou tab ajout)
                if (this.debut.click) {
                    // si on a cliqué avant sur la grille du jeu
                    if (this.debut.case.every(element => element !== -1)) {
                        currentCell = document.getElementsByClassName('nb_piece')[i];
                        if (currentCell.textContent[1] !== '0') {

                            currentTab = document.getElementById('plateau').rows[this.debut.case[1]].cells[this.debut.case[0]];

                            socket.emit('placePion', this.joueur_courant, this.debut.case[0], this.debut.case[1], i + 1);
                            currentTab.removeAttribute('style');
                            this.debut.click = false;
                            this.debut.case = [-1, -1];
                            this.modifNombrePion(i, Number(currentCell.textContent[1]) - 1)
                        }
                    } else {
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
                    currentCell = document.getElementsByClassName('nb_piece')[i];
                    if (currentCell.textContent[1] !== '0') {
                        currentDiv.rows[Math.trunc(i / 5)].cells[i % 5].setAttribute('style', 'background:green');
                        this.debut.click = true;
                        this.debut.value = i;
                    }
                }
            });
        }

        let currentButton = document.getElementById('bouton_placement');
        currentButton.addEventListener('click', () => {
            let currentLabel = document.getElementById('compteur');

            if (currentLabel.textContent === '40') {
                socket.emit('lancerPartie');
                this.debut.pret = true;
                this.affichePlayer(this.joueur_courant);
            } else console.log('pas pret');
        });
    }

    modifNombrePion(numPion, value) {
        let currentP = document.getElementsByClassName('nb_piece')[numPion];
        currentP.innerText = currentP.innerText.replace(currentP.innerText[1], value);
    }

    modifNbPret(value) {
        let currentLabel = document.getElementById('compteur');
        currentLabel.textContent = value;

        if (value === 40) {
            let currentButton = document.getElementById('bouton_placement');
            currentButton.removeAttribute('disabled');
            currentButton.setAttribute('enabled', '');
        }
    }

    listenersDescription() {
        let currentDiv = document.getElementById('tabAjout');
        let currentDescription = document.getElementById('description');
        for (let i = 0; i < 12; ++i) {
            currentDiv.rows[Math.trunc(i / 5)].cells[i % 5].addEventListener('mouseover', () => {
                switch (i) {
                    case 0:
                        currentDescription.textContent = "je suis le un";
                        break;
                    case 1:
                        currentDescription.textContent = "je suis le deux";
                        break;
                    case 2:
                        currentDescription.textContent = "je suis le trois";
                        break;
                    case 3:
                        currentDescription.textContent = "je suis le quatre";
                        break;
                    case 4:
                        currentDescription.textContent = "je suis le cinq";
                        break;
                    case 5:
                        currentDescription.textContent = "je suis le six";
                        break;
                    case 6:
                        currentDescription.textContent = "je suis le sept";
                        break;
                    case 7:
                        currentDescription.textContent = "je suis le huit";
                        break;
                    case 8:
                        currentDescription.textContent = "je suis le neuf";
                        break;
                    case 9:
                        currentDescription.textContent = "je suis le dix";
                        break;
                    case 10:
                        currentDescription.textContent = "je suis le onze";
                        break;
                    case 11:
                        currentDescription.textContent = "je suis le douze";
                        break;
                }
            });
        }
    }

    // initialise le joueur à qui appartient le visuel
    initJoueur(joueur) {
        this.joueur_courant = joueur;
        this.affichePlayer(joueur);

        this.initAjout();
    }

    // affiche à qui est le tour dans le cas où on est en partie, sinon qu'on peut jouer ou que tout est bon
    // en attendant l'autre joueur
    affichePlayer(joueur) {
        let currentP = document.getElementById('joueurQuiJoue');
        if (this.debut.enJeu) currentP.textContent = 'Au tour du joueur ' + (joueur.color ? 'rouge' : 'bleu');
        else if (this.debut.pret) currentP.textContent = "En attente du joueur adverse";
        else currentP.textContent = "Vous pouvez placer vos pions";
    }

    // affiche le pion de type type à la position x y
    affichePion(type, x, y, joueur, value) {
        let tab = document.getElementById('plateau');
        let currentCell = tab.rows[y].cells[x];

        if (Number(currentCell.getAttribute('alt')) !== value) {
            if (currentCell.firstChild !== null) this.removePion(x, y);

            let img = document.createElement('img');
            currentCell.appendChild(img);
            img.setAttribute('class', 'piece');
            if (joueur.color === this.joueur_courant.color) {
                img.setAttribute('alt', value);
                img.setAttribute('src', '../assets/' + (this.joueur_courant.color ? 'rouge' : 'bleu') + '/' + type.toLowerCase() + '.png');
            } else {
                img.setAttribute('alt', 'dos' + (this.joueur_courant.color ? ' rouge' : ' bleu'));
                img.setAttribute('src', '../assets/' + (this.joueur_courant.color ? 'rouge' : 'bleu') + '/' + 'dos.png');
            }
        }
    }

    removePion(x, y) {
        let tab = document.getElementById('plateau');
        let cell = tab.rows[y].cells[x];
        if (cell.firstChild !== null) {
            if (!this.sauter) {
                socket.emit('enlevePion', this.joueur_courant, Number(cell.firstChild.getAttribute('alt')));
            } else this.sauter = false;

            cell.removeChild(cell.firstChild);
        }
    }

    // enlève tous les pions
    removePions() {
        let tab = document.getElementById('plateau');
        let currentCell;

        for (let j = 0; j < 10; j++) {
            for (let i = 0; i < 10; i++) {
                currentCell = tab.rows[i].cells[j];
                if (currentCell.firstChild !== null) {
                    if (currentCell.firstChild.getAttribute('src') !== '../assets/volcan.png') currentCell.firstChild.remove();
                }
            }
        }
    }

    removeTabAjout() {
        let currentDiv = document.getElementById('cadre');
        if (currentDiv != null) currentDiv.remove();

        currentDiv = document.getElementById('description');
        if (currentDiv != null) currentDiv.remove();
    }
}
