let main = function () {
    let view = new StrategoView();
    socketModule.initSocket(socket, view);

    // let game = new Stratego();
    // testUnitaire(game);
};

let testUnitaire = function (game) {
    console.log(game.peut_placer_ses_pions(game.joueur_noir, 0, 0));
    console.log(game.peut_placer_ses_pions(game.joueur_noir, 9, 9));
    console.log(game.peut_placer_ses_pions(game.joueur_blanc, 0, 0));
    console.log(game.peut_placer_ses_pions(game.joueur_blanc, 9, 9));
};
