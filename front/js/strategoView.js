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

        for (let j = 0; j < 10; ++j) {
            for (let i = 0; i < 10; ++i) {
                currentDiv.rows[j].cells[i].addEventListener('click', () => {
                    if (this.debut.enJeu) socket.emit('play', i, j);
                    else {
                        if (this.debut.click && this.debut.value !== -1) {
                            socket.emit('placePion', this.joueur_courant, i, j, this.debut.value);
                            document.getElementById('tabAjout').rows[Math.trunc(this.debut.value / 5)].cells[this.debut.value % 5].removeAttribute('style');
                            this.debut.click = false;
                            this.debut.value = -1;
                        }
                        else {
                            currentDiv.rows[j].cells[i].setAttribute('style', 'background:green');
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
        // const that = this;
        // let tabPiece

        console.log("Ajout", currentDiv);
        for (let i = 0; i < 12; ++i) {
            console.log("ajout", Math.trunc(i / 5), i % 5);
            currentDiv.rows[Math.trunc(i / 5)].cells[i % 5].addEventListener('click', () => {
                console.log("Click ajout", Math.trunc(i / 5), i % 5);
                if (this.debut.click && this.debut.case !== [-1, -1]) {
                    socket.emit('placePion', this.joueur_courant, this.debut.case[0], this.debut.case[1], i);
                    console.log(currentDiv);
                    document.getElementById('plateau').rows[this.debut.case[1]].cells[this.debut.case[0]].removeAttribute('style');
                    this.debut.click = false;
                    this.debut.case = [-1, -1];
                }
                else {
                    currentDiv.rows[Math.trunc(i / 5)].cells[i % 5].setAttribute('style', 'background:green');
                    this.debut.click = true;
                    this.debut.value = i;
                }

            });
        }
    }

    clickEvent(x, y) {
        console.log('click en :', x, y);
        socket.emit('play', x, y);
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
