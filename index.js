const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mysql = require('mysql');
const fs = require('fs');

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

    if(sessionData.createAccount){
       
        res.sendFile(__dirname + "/front/html/register.html");

    }
    else if(sessionData.connect){
        res.sendFile(__dirname + "/front/html/index.html");
    }
    else if(sessionData.createAccount == false){
        res.sendFile(__dirname + "/front/html/pagelogin.html");
    }

   

    
    
});


app.post('/login',  (req,res) =>{

    const logName = req.body.login;
    const logPassword = req.body.passwrd;

    const errors = validationResult(res);
    if(!errors.isEmpty()){
        console.log("Big oof", errors);
    }
    else{
    
        checkConnection.verifyConnection(req, con, logName, logPassword);
        res.redirect('/');
    }
    
});




io.on('connection', (socket) =>{
    console.log("New connection");

    socket.on('login', () =>{
        console.log(socket.handshake.session.username);
    })

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


