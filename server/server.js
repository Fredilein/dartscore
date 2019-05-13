const express = require('express');

// Create express app instance:
const app = express();

const server = app.listen(3001, function() {
  console.log('server running on port 3001');
});

const io = require('socket.io')(server);

io.on('connection', function(socket) {
  console.log(socket.id);

  socket.on('SEND_TURNSCORE', function(data) {
    io.emit('TURNSCORE', data)
  });

  socket.on('CLEAR_SCORES', function() {
    io.emit('CLEAR_SCORES')
  });
});
