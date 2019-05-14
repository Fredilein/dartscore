const express = require('express');
const mongoose = require('mongoose');
const creds = require('../credentials.js');



// Setup DB
mongoose.connect(`mongodb://${creds.DB_USER}:${creds.DB_PASS}@${creds.DB_SERVER}/dartscore`, {useNewUrlParser: true});

mongoose.connection.once('open', () => {
  console.log('connected to db');
});


// Create express app instance:
const app = express();


const server = app.listen(3001, function() {
  console.log('server running on port 3001');
});

const io = require('socket.io')(server);

io.on('connection', function(socket) {
  console.log(socket.id);

  socket.on('SEND_TURNSCORE', function(data) {
    io.emit('TURNSCORE', data);
  });

  socket.on('CLEAR_SCORES', function() {
    io.emit('CLEAR_SCORES');
  });
});
