class StrategoView {
    constructor() {
        // stocke le joueur courant
        this.joueur_courant = 0;
        // variables liés au jeu
        this.varJeu = {
            "enJeu": false, // stocke si l'on est en jeu
            "jeuFini": false, // dis si le jeu est terminé
            "pret": false, // précise si le joueur a finis de placer ses pions
            "click": false, // précise si un click a déjà eu lieu ou pas
            "value": -1, // précise la valeur du pion posé
            "case": [-1, -1]  // stocke la position où a eu lieu le premier click
        };
        // permet de sauter une fonction en cas de problème
        this.sauter = false;

        this.initTab(); // initialise le tableau
        this.createListenersTab(); // ajoute les listeners sur la grille de jeu
        this.createListenersAjouts(); // ajoute les listeners sur la grille de placement des pions
        // ajoute les listeners sur la grille de placement des pions pour afficher leurs caractéristiques
        this.listenersDescription();
    }

    // initialise le joueur à qui appartient le visuel
    initJoueur(joueur) {
        if (this.joueur_courant === 0) {
            this.joueur_courant = joueur;
            this.affichePlayer(joueur);

            // initialise la grille de placement des pions en fonction de la couleur de joueur_courant
            this.initAjout();

            // dé commenter pour réaliser des tests sur la partie sans avoir à placer les pions
            this.initDebug();
        }
    }

    // place les pions automatiquement au début de la partie
    initDebug() {
        let compteur = 0;
        let tabPions = this.joueur_courant.pions_vivant;
        let min, max;

        if (this.joueur_courant.color) {
            min = 0;
            max = 4;
        }
        else {
            min = 6;
            max = 10;
        }

        for (let j = min; j < max; ++j) {
            for (let i = 0; i < 10; ++i) {
                if (tabPions[compteur] === 0) compteur++;
                socket.emit('placePion', this.joueur_courant, i, j, compteur + 1);
                tabPions[compteur]--;
            }
        }
    }

    // initialise le tableau
    initTab() {
        let currentDiv = document.getElementById('plateau');
        let tr, td, img;

        for (let j = 0; j < 10; ++j) {
            tr = document.createElement('tr');
            for (let i = 0; i < 10; ++i) {
                td = document.createElement('td');

                // si l'on est sur l'emplacement des lacs, on ajoute des pions lacs
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

    // permet de changer la couleur des pions de la grille de placement
    // par défaut les pions sont affichés en bleu, on les passe en rouge
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

    // ajoute les listeners sur la grille de jeu
    createListenersTab() {
        let currentDiv = document.getElementById('plateau');
        let currentTab, currentCell;

        for (let j = 0; j < 10; ++j) {
            for (let i = 0; i < 10; ++i) {
                currentDiv.rows[j].cells[i].addEventListener('click', () => {
                    // on vérifie que le jeu n'est pas finis
                    if (!this.varJeu.jeuFini) {
                        // si l'on est en jeu, sinon c'est qu'on place les pions
                        if (this.varJeu.enJeu) {
                            // on supprime les cases affichés en vert ou en rouge
                            this.removeCasesJouables();
                            // si un clic a déjà eu lieu sur une case
                            if (this.varJeu.case.every(element => element !== -1)) {
                                currentCell = currentDiv.rows[j].cells[i].firstChild;
                                // si le pion appartient au joueur, son attribut alt est égal à sa force
                                if (currentCell !== null && 0 < Number(currentCell.getAttribute('alt'))) {
                                    // stocke la position du click et affiche les positions de déplacement du pion
                                    this.varJeu.case = [i, j];
                                    socket.emit('affiche', this.joueur_courant, i, j);
                                } else {
                                    // sinon c'est qu'il y a un déplacement
                                    socket.emit('deplacement', i, j, this.varJeu.case[0], this.varJeu.case[1]);
                                    this.removeCasesJouables();

                                    this.varJeu.case = [-1, -1];
                                }
                            } else {
                                // premier click -> on vérifie que la case cliqué appartient au joueur
                                currentCell = currentDiv.rows[j].cells[i].firstChild;
                                // si le pion appartient au joueur, son attribut alt est égal à sa force
                                if (currentCell !== null && 0 < Number(currentCell.getAttribute('alt'))) {
                                    // stocke la position du click et affiche les positions de déplacement du pion
                                    this.varJeu.case = [i, j];
                                    socket.emit('affiche', this.joueur_courant, i, j);
                                }

                            }
                        // on place les pions si le joueur n'est pas prêt
                        } else if (!this.varJeu.pret) {
                            // si un click a déjà été fais
                            if (this.varJeu.click) {
                                // si le click précédent était sur la tab ajout
                                if (this.varJeu.value !== -1) {
                                    currentCell = document.getElementsByClassName('nom_piece')[this.varJeu.value];
                                    if (((this.joueur_courant.color && j < 4) || (j > 5 && !this.joueur_courant.color)) && currentCell.textContent[1] !== '0') {
                                        currentTab = currentDiv.rows[j].cells[i];

                                        socket.emit('placePion', this.joueur_courant, i, j, this.varJeu.value + 1);
                                        document.getElementById('tabAjout').rows[Math.trunc(this.varJeu.value / 5)].cells[this.varJeu.value % 5].removeAttribute('style');
                                        this.modifNombrePion(this.joueur_courant, this.varJeu.value, Number(currentCell.textContent[1]) - 1)
                                        this.varJeu.click = false;
                                        this.varJeu.value = -1;
                                    }
                                }
                                // sinon c'est qu'on click deux fois de suite sur la grille de jeu
                                else {
                                    currentTab = currentDiv.rows[j].cells[i];
                                    // si on click deux fois sur 2 cases différentes
                                    if (!currentTab.hasAttribute('style')) {
                                        if ((this.joueur_courant.color && j < 4) || (j > 5 && !this.joueur_courant.color)) {
                                            document.getElementById('plateau').rows[this.varJeu.case[1]].cells[this.varJeu.case[0]].removeAttribute('style');
                                            currentTab.setAttribute('style', 'background:green');
                                            this.varJeu.case = [i, j];
                                        }
                                    }
                                    // si on click deux fois sur la même case
                                    else {
                                        currentTab.removeAttribute('style');
                                        this.varJeu.click = false;
                                        this.varJeu.case = [-1, -1];
                                        this.sauter = true;

                                        // on supprime le pion sur cette case
                                        if (currentTab.firstChild !== null) socket.emit('enlever', this.joueur_courant, i, j);
                                    }
                                }
                            }
                            // on affiche la case cliqué en vert
                            else {
                                currentTab = currentDiv.rows[j].cells[i];
                                // if (!(currentTab.firstChild != null && currentTab.firstChild.getAttribute('src') === '../assets/volcan.png')) {
                                if ((this.joueur_courant.color && j < 4) || (j > 5 && !this.joueur_courant.color)) {
                                    currentTab.setAttribute('style', 'background:green');
                                    this.varJeu.click = true;
                                    this.varJeu.case = [i, j];
                                }

                            }
                        }
                    }
                });
            }
        }
    }

    // ajoute les listeners sur la grille de placement des pions
    createListenersAjouts() {
        let currentDiv = document.getElementById('tabAjout');
        let currentTab, currentCell;

        for (let i = 0; i < 12; ++i) {
            currentDiv.rows[Math.trunc(i / 5)].cells[i % 5].addEventListener('click', () => {
                // si on a déjà cliqué sur une case (grille jeu ou tab ajout)
                if (this.varJeu.click) {
                    // si on a cliqué avant sur la grille du jeu
                    if (this.varJeu.case.every(element => element !== -1)) {
                        currentCell = document.getElementsByClassName('nom_piece')[i];
                        if (currentCell.textContent[1] !== '0') {

                            currentTab = document.getElementById('plateau').rows[this.varJeu.case[1]].cells[this.varJeu.case[0]];

                            socket.emit('placePion', this.joueur_courant, this.varJeu.case[0], this.varJeu.case[1], i + 1);
                            currentTab.removeAttribute('style');
                            this.varJeu.click = false;
                            this.varJeu.case = [-1, -1];
                            this.modifNombrePion(this.joueur_courant, i, Number(currentCell.textContent[1]) - 1)
                        }
                    } else {
                        currentTab = currentDiv.rows[Math.trunc(i / 5)].cells[i % 5];

                        // cas où on click deux fois de suite sur deux cases de tab ajout différentes
                        if (!currentTab.hasAttribute('style')) {
                            document.getElementById('tabAjout').rows[Math.trunc(this.varJeu.value / 5)].cells[this.varJeu.value % 5].removeAttribute('style');
                            currentTab.setAttribute('style', 'background: green');
                            this.varJeu.value = i;
                        }
                        // cas où on click deux fois de suite sur la même case
                        else {
                            currentTab.removeAttribute('style');
                            this.varJeu.click = false;
                            this.varJeu.value = -1;
                        }
                    }
                }
                // si aucun click n'a déjà été réalisé, on passe la couleur en vert
                else {
                    currentCell = document.getElementsByClassName('nom_piece')[i];
                    if (currentCell.textContent[1] !== '0') {
                        currentDiv.rows[Math.trunc(i / 5)].cells[i % 5].setAttribute('style', 'background: green');
                        this.varJeu.click = true;
                        this.varJeu.value = i;
                    }
                }
            });
        }

        let currentButton = document.getElementById('bouton_placement');
        currentButton.addEventListener('click', () => {
            let currentLabel = document.getElementById('compteur');

            if (currentLabel.textContent === '40') {
                socket.emit('lancerPartie');
                this.varJeu.pret = true;
                this.affichePlayer(this.joueur_courant);
            } else console.log('pas pret');
        });
    }

    // ajoute les listeners sur la grille de placement des pions pour afficher leurs caractéristiques
    listenersDescription() {
        let currentDiv = document.getElementById('tabAjout');
        let currentDescription = document.getElementById('description');
        let currentValeur = document.getElementById('valeur');
        for (let i = 0; i < 12; ++i) {
            currentDiv.rows[Math.trunc(i / 5)].cells[i % 5].addEventListener('mouseover', () => {
                switch (i) {
                    case 0:
                        currentDescription.textContent = "L'espion se déplace d'une case dans n'importe quelle direction.";
                        currentValeur.textContent = "L'espion est l'unité la plus faible, un de force. Mais si elle attaque le maréchal en premier, le maréchal meurt.";
                        break;
                    case 1:
                        currentDescription.textContent = "L'éclaireur est l'unité la plus rapide, elle peut se déplacer en ligne droite autant de case qu'elle veut. L'éclaireur peut se déplacer dans n'importe quelle direction.";
                        currentValeur.textContent = "L'éclaireur a une force de 2.";
                        break;
                    case 2:
                        currentDescription.textContent = "Le démineur est l'unité qui permet de détruire les bombes, elle se déplace d'une case dans n'importe quelle direction.";
                        currentValeur.textContent = "Le démineur a une force de 3.";
                        break;
                    case 3:
                        currentDescription.textContent = "Le sergent est une unité qui peut se déplacer d'une case dans n'importe quelle direction.";
                        currentValeur.textContent = "Le démineur a une force de 4.";
                        break;
                    case 4:
                        currentDescription.textContent = "Le lieutenant est une unité qui peut se déplacer d'une case dans n'importe quelle direction.";
                        currentValeur.textContent = "Le démineur a une force de 5.";
                        break;
                    case 5:
                        currentDescription.textContent = "Le capitaine est une unité qui peut se déplacer d'une case dans n'importe quelle direction.";
                        currentValeur.textContent = "Le démineur a une force de 6.";
                        break;
                    case 6:
                        currentDescription.textContent = "Le commandant est une unité qui peut se déplacer d'une case dans n'importe quelle direction.";
                        currentValeur.textContent = "Le démineur a une force de 7.";
                        break;
                    case 7:
                        currentDescription.textContent = "Le colonel est une unité qui peut se déplacer d'une case dans n'importe quelle direction.";
                        currentValeur.textContent = "Le démineur a une force de 8.";
                        break;
                    case 8:
                        currentDescription.textContent = "Le general est une unité qui peut se déplacer d'une case dans n'importe quelle direction.";
                        currentValeur.textContent = "Le démineur a une force de 9.";
                        break;
                    case 9:
                        currentDescription.textContent = "Le maréchal est une unité qui peut se déplacer d'une case dans n'importe quelle direction.";
                        currentValeur.textContent = "Le démineur a une force de 10.";
                        break;
                    case 10:
                        currentDescription.textContent = "Le drapeau est le pion à protéger, il ne peut pas ce déplacer.";
                        currentValeur.textContent = "Si le drapeau se fait attaquer par n'importe qu'elle unité la partie est perdue.";
                        break;
                    case 11:
                        currentDescription.textContent = "La bombe ne se déplace pas mais elle est une très bonne unité de défense.";
                        currentValeur.textContent = "La bombe détruit n'importe qu'elle unité sauf le démineur.";
                        break;
                }
            });
        }
    }

    // modifie le nombre sur le pion de la grille de placement lors du placement des pions
    modifNombrePion(joueur, numPion, value) {
        if (joueur.color === this.joueur_courant.color) {
            let currentP = document.getElementsByClassName('nom_piece')[numPion];
            // on remplace le nombre présent à la deuxième position par le nombre choisi
            currentP.innerText = currentP.innerText.replace(currentP.innerText[1], value);
        }
    }

    // modifie le nombre sur le total de pions posés
    modifNbPret(joueur, value) {
        if (joueur.color === this.joueur_courant.color) {
            let currentLabel = document.getElementById('compteur');
            currentLabel.textContent = value;

            // si l'on est égal à 40 on active le bouton prêt
            if (value === 40) {
                let currentButton = document.getElementById('bouton_placement');
                currentButton.removeAttribute('disabled');
                currentButton.setAttribute('enabled', '');
            }
        }
    }

    // affiche à qui est le tour dans le cas où on est en partie,
    // sinon qu'on peut jouer ou que tout est bon en attendant l'autre joueur
    // si la partie est finis, affiche les informations liés à la fin du jeu
    affichePlayer(joueur, texte) {
        let currentP = document.getElementById('joueurQuiJoue');
        // si texte différent de undefined, c'est que l'on est à la fin de la partie
        // et que texte contient les informations de fin de la partie
        if (texte === undefined) {
            if (this.varJeu.enJeu) currentP.textContent = 'Au tour du joueur ' + joueur.pseudo;
            else if (this.varJeu.pret) currentP.textContent = 'En attente du joueur adverse';
            else currentP.textContent = 'Vous pouvez placer vos pions';
        }
        else {
            if (texte.lastIndexOf('égalité') !== -1) currentP.textContent = texte;
            else currentP.innerHTML = 'Le joueur ' + joueur.pseudo + ' a gagné ! <br>' + texte;
        }
    }

    // affiche le pion de type type à la position x y
    affichePion(type, x, y, joueur, value, visible) {
        let tab = document.getElementById('plateau');
        let currentCell = tab.rows[y].cells[x];

        if (Number(currentCell.getAttribute('alt')) !== value) {
            if (currentCell.firstChild !== null) this.removePion(joueur, x, y);

            let img = document.createElement('img');
            currentCell.appendChild(img);
            img.setAttribute('class', 'piece');

            // si le pion posé appartient au joueur qui joue
            if (joueur.color === this.joueur_courant.color) {
                img.setAttribute('alt', value);
                img.setAttribute('src', '../assets/' + (this.joueur_courant.color ? 'rouge' : 'bleu') + '/' + type.toLowerCase() + '.png');
            } else {
                // sinon si le pion est visible on affiche le pion
                // sinon on affiche un dos
                if (visible) {
                    img.setAttribute('alt', type + (!this.joueur_courant.color ? ' rouge' : ' bleu'));
                    img.setAttribute('src', '../assets/' + (!this.joueur_courant.color ? 'rouge' : 'bleu') + '/' + type.toLowerCase() + '.png');
                } else {
                    img.setAttribute('alt', 'dos' + (!this.joueur_courant.color ? ' rouge' : ' bleu'));
                    img.setAttribute('src', '../assets/' + (!this.joueur_courant.color ? 'rouge' : 'bleu') + '/' + 'dos.png');
                }
            }
        }
    }

    // permet de supprimer un pion
    removePion(joueur, x, y) {
        let tab = document.getElementById('plateau');
        let cell = tab.rows[y].cells[x];
        if (cell.firstChild !== null) {
            // si l'on place les pions, il faut supprimer le pion dans la grid
            if (!this.sauter && !this.varJeu.enJeu) {
                if (joueur.color === this.joueur_courant.color) {
                    socket.emit('enlevePion', this.joueur_courant, Number(cell.firstChild.getAttribute('alt')));
                }
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
                currentCell = tab.rows[i].cells[j].firstChild;
                if (currentCell !== null) {
                    if (currentCell.getAttribute('src') !== '../assets/volcan.png') currentCell.firstChild.remove();
                }
            }
        }
    }

    // supprime la table de placement des pions au début de la partie
    removeTabAjout() {
        let currentDiv = document.getElementById('cadre');
        if (currentDiv != null) currentDiv.remove();

        currentDiv = document.getElementById('description');
        if (currentDiv != null) currentDiv.remove();

        currentDiv = document.getElementById('valeur');
        if (currentDiv != null) currentDiv.remove();
    }

    // supprime la page d'attente lorsque deux joueurs sont mis en lien
    removeAttente() {
        let currentDiv = document.getElementById('attente');
        currentDiv.remove();
    }

    // lorsque les deux joueurs ont finis de placer leurs pions
    joueursPrets() {
        this.removeTabAjout();
        this.removeCasesJouables();

        this.varJeu = {
            "enJeu": true,
            "pret": false,
            "click": false,
            "value": -1,
            "case": [-1, -1]
        };
        this.sauter = false;
    }

    // affiche les cases sur lesquelles le pion peut se placer
    afficheCasesJouables(joueur, listDeplacement) {
        if (joueur.color === this.joueur_courant.color) {
            let currentTab = document.getElementById('plateau');
            let x, y, currentCell;

            for ([x, y] of listDeplacement) {
                currentCell = currentTab.rows[y].cells[x];

                // si il y a un pion sur la case, on met la case en rouge
                // pour indiquer que le pion peut manger cette case
                if (currentCell.firstChild !== null) currentCell.setAttribute('style', 'background: red');
                else currentCell.setAttribute('style', 'background: green');
            }
        }
    }

    // supprime les cases affichées
    removeCasesJouables() {
        let currentTab = document.getElementById('plateau');

        for (let j = 0; j < 10; ++j) {
            for (let i = 0; i < 10; ++i) {
                if (currentTab.rows[j].cells[i].getAttribute('style') !== null) currentTab.rows[j].cells[i].removeAttribute('style');
            }
        }
    }

    // à a fin du jeu, dis que le jeu est fini puis affiche les informations liés à la fin
    finDuJeu(joueur, texte) {
        this.varJeu.jeuFini = true;
        this.affichePlayer(joueur, texte);
    }

    // envoi à la fin du jeu les résultats de la partie pour stockage dans la bdd
    sendWin(token, winner, looser, score) {
        if (this.joueur_courant.color) socket.emit('endGame', token, winner, looser, score);
    }
}
