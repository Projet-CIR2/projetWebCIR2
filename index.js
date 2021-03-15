/* Import npm */

const express = require('express');
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mysql = require("mysql");

const Stratego = require('./back/models/stratego');
const init = require('./back/modules/initSocket');

app.use(express.static(__dirname + '/front/'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/front/html/jeu.html");
});


io.on('connection', (socket) =>{
    console.log("New connection");
    const game = new Stratego(socket);

    init.initSocket(socket, game);

    socket.on('disconnect', () => {
        
    });
});


http.listen(4200, () => {
    console.log("Bijour vous m'entendii ?");
});

// Initialisation de la connexion à la bdd
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "compte"
});
