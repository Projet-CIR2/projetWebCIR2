const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mysql = require('mysql');
const fs = require('fs');
const randtoken = require('rand-token');


let logName = undefined;
let socketBkp;


let waitingQueue = [];
let rooms = [];

let countPlayer = 0;
let playerSockets = [];
let users = [];

const sharedsession = require("express-socket.io-session");
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const session = require('express-session')({
    secret: "30cm",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 5*60*60*1000,
        secure: false,
    }

});

/* Import libs */
const matchmaking = require("./back/matchmaking");
const room = require("./back/models/room")
const Stratego = require('./back/models/stratego');
const init = require('./back/modules/initSocket');

/* config */
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false});
/* init express */
app.use(express.static(__dirname + '/front/'));
app.use(urlencodedParser);
app.use(session);


io.use(sharedsession(session, {
    autoSave: true
}));

//*** CODE ***//
app.get('/', (req,res) => {
    logName = req.session.logName;
    res.sendFile(__dirname + "/front/html/index.html");

    // if(users.find(element => element.id === req.session.id) === undefined){
    //     users.push(new user(req.session));
    // }
    
 

});

app.get('/login.html', (req,res) =>{
    let sessionData = req.session;

    res.sendFile(__dirname + "/front/html/login.html");
    if (sessionData.errIdentifiants){
        req.session.errIdentifiants = false;
        //alert("Username ou Mot de passe incorrect");
    }
});

app.get('/signup.html', (req,res) =>{
    res.sendFile(__dirname + "/front/html/signup.html");
});


app.get('/attente.html', (req,res) =>{
    // let sessionData = req.session;
    // let token;
    //
    // if(req.session.inQueue == undefined){
    //     req.session.inQueue = true;
    //     req.session.save();
    //     waitingQueue.push(req.session.id);
    //     // waitingQueue.push(socketBkp.id);
    //     console.log('id', socketBkp.id, req.session.id);
    //     console.log(waitingQueue);
    //     // socketBkp.join('attente');
    //
    //     // ioBkp.in('attente').emit('coucou');
    // }

    res.sendFile(__dirname + "/front/html/attente.html");
});

app.get('/jeu.html', (req, res) => {
    let sessionData = req.session;
    let token;

    if(req.session.inQueue == undefined){
        req.session.inQueue = true;
        req.session.save();
        waitingQueue.push(req.session.id);
        // waitingQueue.push(socketBkp.id);
        // console.log('id', socketBkp.id, req.session.id);
        // console.log(waitingQueue);
        // socketBkp.join('attente');

        // ioBkp.in('attente').emit('coucou');
    }

    res.sendFile(__dirname + "/front/html/jeu.html")
})


app.post('/login',  (req,res) =>{

    const logName = req.body.login;
    const logPassword = req.body.passwrd;

    const errors = validationResult(res);
    if(!errors.isEmpty()){
        console.log("Big oof", errors);
    }
    else{

        let sql = 'SELECT *FROM session WHERE Pseudo = \'' + logName + '\' AND Mdp = \'' + logPassword + '\'';
        con.query(sql, (err, result) => {

            console.log(result);
            //pas connecté
            if (result[0] == undefined) {
                console.log(result[0], "azerty");
                req.session.connect = false;
                req.session.errIdentifiants = true;
                req.session.save();
            }
            //connecté
            else{
                console.log(result[0]);
                req.session.logName = logName;
                req.session.logPassword = logPassword;
                req.session.connect = true;
                req.session.save();
                res.send('ok');
            }
        });
    }
});

app.post('/signup', (req,res) =>{

    const values = {
        Pseudo : req.body.pseudo,
        Mdp : req.body.passwrd,
        Victoire :0,
        defaite :0,
        Nom : req.body.fName,
        Prenom : req.body.lName,
    }

    let sql = "INSERT INTO session SET ?";
        con.query(sql, values, (err, result) => {
            if (err) throw err;
            console.log("One Session inserted");
        });

    res.send('ok');
});


app.post('/deconnection', (req,res) =>{
    req.session.logName = undefined;
    req.session.save();
    res.redirect('/');
});



io.on('connection', (socket) =>{
    console.log("New connection");
    socketBkp = socket;
    // socket.join('attente');
    // socket.emit()
    io.to(socket.id).emit("hey", "I just met you");
    // io.in('attente').emit('coucou');
    // const game = new Stratego(socket, "j1", "j2");

    countPlayer ++;
    playerSockets.push(socket);

    socket.on('login', () =>{
        console.log(socket.handshake.session.username);
    });

    socket.on('pseudo', () => {
        if (logName !== undefined) socket.emit('Pseudo', logName);
    });

    socket.on('changeRoom', (idRoom) => {
        socket.join(idRoom);
    });

    socket.on('deconnexion', () => {
        logName = undefined;
    });

    socket.on('disconnect', () =>{
        console.log("deconnected");
        countPlayer--;
        for(let i =0;i< playerSockets.length; i++){
            if (socket.id === playerSockets[i].id){
                playerSockets.splice(i, 1);
            }
        }
    });

    // init.initSocket(socket, game);

    changeRoom(socket);
});

function changeRoom(socket) {
    let token, game;
    while(waitingQueue.length >= 2){
        token = randtoken.generate(16);

        io.to(playerSockets[playerSockets.length - 1].id).emit('hey', token);
        playerSockets[playerSockets.length - 1].join(token);
        // playerSockets.pop();
        console.log('playerSocket[0]', playerSockets.length - 1);
        io.to(playerSockets[playerSockets.length - 2].id).emit('hey', token + 'coucou');
        playerSockets[playerSockets.length - 2].join(token);
        // playerSockets.pop();

        socket.to(token).emit('hey', 'je suis content');
        // io.to('attente').emit('hey', token + 'coucou');

        // io.to(token).emit('lanceJeu');
        game = new Stratego(socket, io, token, matchmaking.getPlayerName(waitingQueue[0]), matchmaking.getPlayerName(waitingQueue[1]));
        console.log(playerSockets.length);
        init.initSocket(playerSockets[playerSockets.length - 1], game);
        playerSockets.pop();
        init.initSocket(playerSockets[playerSockets.length - 1], game);
        playerSockets.pop();
        // rooms.push(new room(socketBkp, io, token, matchmaking.getPlayerName(waitingQueue[0]), matchmaking.getPlayerName(waitingQueue[1])));
        rooms.push(game);
        waitingQueue.shift(); waitingQueue.shift();
        console.log(rooms);
    }
}

http.listen(4200, () => {
    console.log("Bijour vous m'entendii ?")
});

// Initialisation de la connexion à la bdd
const con = mysql.createConnection({
    host: "nicob.space",
    user: "projetCIR2",
    password: "Web2021",
    database: "compte"
});

// Block d'accès à la BDD

con.connect(err=>{
    if (err) throw err;
    else console.log('Connexion reussie !');
});

/************* Matchmaking **************/

