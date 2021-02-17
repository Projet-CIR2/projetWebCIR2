/* Import npm */

const express = require('express');
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mysql = require('mysql');
app.use(express.static(__dirname + '/front/'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/front/html/index.html");
});

io.on('connection', (socket) =>{
    console.log("New connection");

    socket.on('disconnect', () => {
        
    });
});


http.listen(4200, () => {
    console.log("Bijour vous m'entendii ?")
});



const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "compte"
});