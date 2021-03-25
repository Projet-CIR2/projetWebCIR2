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
    }

    createListenersTab() {
        let currentDiv = document.getElementById('plateau');
        let currentTab;

        for (let j = 0; j < 10; ++j) {
            for (let i = 0; i < 10; ++i) {
                currentDiv.rows[j].cells[i].addEventListener('click', () => {
                    if (this.debut.enJeu) socket.emit('play', i, j);
                    else {
                        if (this.debut.click) {
                            if (this.debut.value !== -1) {
                                socket.emit('placePion', this.joueur_courant, i, j, this.debut.value);
                                document.getElementById('tabAjout').rows[Math.trunc(this.debut.value / 5)].cells[this.debut.value % 5].removeAttribute('style');
                                this.debut.click = false;
                                this.debut.value = -1;
                            }
                            else {
                                currentTab = currentDiv.rows[j].cells[i];
                                currentTab.removeAttribute('style');
                                this.debut.click = false;
                                this.debut.case = [-1, -1];
                            }
                        }
                        else {
                            console.log("je suis la");
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
        let currentTab;

        for (let i = 0; i < 12; ++i) {
            currentDiv.rows[Math.trunc(i / 5)].cells[i % 5].addEventListener('click', () => {
                if (this.debut.click) {
                    if (this.debut.case !== [-1, -1]) {
                        socket.emit('placePion', this.joueur_courant, this.debut.case[0], this.debut.case[1], i);
                        document.getElementById('plateau').rows[this.debut.case[1]].cells[this.debut.case[0]].removeAttribute('style');
                        this.debut.click = false;
                        this.debut.case = [-1, -1];
                    }
                    else {
                        console.log("alerte !");
                        currentTab = currentDiv.rows[Math.trunc(i / 5)].cells[i % 5];
                        currentTab.removeAttribute('style');
                        this.debut.click = false;
                        this.debut.case = [-1, -1];

                        console.log(currentTab);

                        if (currentTab.firstChild !== null) {
                            currentTab.removeChild(currentTab.firstChild);
                        }
                    }
                }
                else {
                    currentDiv.rows[Math.trunc(i / 5)].cells[i % 5].setAttribute('style', 'background:green');
                    this.debut.click = true;
                    this.debut.value = i;
                    this.debut.case = [-1, -1];

                }

            });
        }
    }

    listenersDescription(){
      let currentDiv = document.getElementById('tabAjout');
      let currentDescription = document.getElementById('description');
      for (let i = 0; i < 12; ++i) {
        console.log("coucou");
        currentDiv.rows[Math.trunc(i / 5)].cells[i % 5].addEventListener('mouseover', () => {
          console.log("focus");
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
