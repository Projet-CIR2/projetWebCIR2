/* Import npm */

const express = require('express');
const app = express()
const http = require("express-session")({
    
})

// Initialisation de la connexion à la bdd

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "compte"
});