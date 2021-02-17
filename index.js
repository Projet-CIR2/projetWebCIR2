const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const Stratego = require('./back/models/stratego');

app.use(express.static(__dirname + '/front/'));

app.get('/', (req, res) => {

});
