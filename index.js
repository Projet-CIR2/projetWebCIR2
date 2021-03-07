const express = require('express');
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mysql = require('mysql');



/* Import libs */


/* config */

/* init express */
app.use(express.static(__dirname + '/front/'));

// congi socket io


//*** CODE ***//
app.get('/', (req,res) => {

  
    res.sendFile(__dirname + "/front/html/pagelogin.html");
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

let sql = "INSERT INTO session (Pseudo, Mdp, Victoire, Defaite) VALUES('Admin', 'Admin', 3, 1)";
con.query(sql, (err, result) => {
    if (err) throw err;
    console.log("One Session inserted");
    console.log(result);
});