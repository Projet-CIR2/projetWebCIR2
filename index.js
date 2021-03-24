const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mysql = require('mysql');
const fs = require('fs');

const Stratego = require('./back/models/stratego');
const init = require('./back/modules/initSocket');

const sharedsession = require("express-socket.io-session");
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const { verifyConnection } = require('./back/connection/checkConnection');
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
const checkConnection = require("./back/connection/checkConnection");


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
    let sessionData = req.session;
    res.sendFile(__dirname + "/front/html/index.html");
   
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
    let sessionData = req.session;
    res.sendFile(__dirname + "/front/html/signup.html");

    
});



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
                socket.emit('Pseudo', logName);
                res.redirect('/');
            }
        });    
    
    }
    
});

app.post('/signup', (req,res) =>{

    const values = {
        logName = req.body.pseudo,
        logPassword = req.body.passwrd,
        Victory=0,
        Defeat=0,
        adressmail= req.body.adrmail,
        firstName = req.body.fName,
        lastName = req.body.lName,
    }

    let sql = "INSERT INTO session SET ?";  
        con.query(sql, values, (err, result) => {
            if (err) throw err;
            console.log("One Session inserted");
        });
});




io.on('connection', (socket) =>{
    console.log("New connection");
    const game = new Stratego(socket);

    socket.on('login', () =>{
        console.log(socket.handshake.session.username);
    })

    init.initSocket(socket, game);

    socket.on('disconnect', () => {
        console.log("Deconnection");
    });
});


http.listen(4200, () => {
    console.log("Bijour vous m'entendii ?")
});

// Initialisation de la connexion à la bdd
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "compte"
});

// Block d'accès à la BDD

con.connect(err=>{
    if (err) throw err;
    else console.log('Connexion reussie !');
})


