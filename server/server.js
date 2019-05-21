const express = require('express');
const hapi = require('hapi');
const mongoose = require('mongoose');
const creds = require('../credentials.js');
const Room = require('./models/room');
const Test = require('./models/test');



// Setup DB
mongoose.connect(`mongodb://${creds.DB_USER}:${creds.DB_PASS}@${creds.DB_SERVER}/dartscore`, {useNewUrlParser: true});

mongoose.connection.once('open', () => {
  console.log('connected to db');
});


const server = hapi.server({
  port: 3001,
  host: 'localhost',
  routes: { cors: true }
});

const init = async () => {
  server.route([
    {
      method: 'GET',
      path: '/rooms',
      handler: (req, res) => {
        return Room.find({active: true});
      }
    },
    {
      method: 'POST',
      path: '/rooms',
      handler: (req, res) => {
        const {roomName, playerNames} = req.payload;
        var player = [];
        for (p in playerNames) {
          player.push({ name: playerNames[p], points: [], legs: 0 });
        }
        const room = new Room({
          roomName,
          player,
          activePlayer: 0,
          active: true
        });
        return room.save();
      }
    },
    {
      method: 'POST',
      path:  '/closeroom',
      handler: (req, res) => {
        const {rid} = req.payload;
        console.log("Close room: "+rid)
        return Room.findByIdAndUpdate(rid, {active: false});
      }
    }
  ]);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();


const io = require('socket.io')(server.listener);

io.on('connection', function(socket) {
  console.log("connection: "+socket.id);

  socket.on('INIT', function(data) {
    let rid =  data.roomId;
    Room.findById(rid)
      .then(res => {
        socket.join(rid);
        io.to(rid).emit('STATE_UPDATE', {
          state: res
        });
      })
      .catch(err => {
        io.to(rid).emit('ERROR', {
          err
        });

      });
  });

  socket.on('SEND_TURNSCORE', function(data) {
    let rid = data.roomId;
    socket.join(rid);
    Room.findById(rid)
      .then(res => {
        let active  = res.activePlayer;
        let n = res.player.length; 
        let next = (active + 1) % n;
        let playerNew = nextState(res.player, active, data.turnscore)
        
        Room.findByIdAndUpdate(rid, {player: playerNew, activePlayer: next}, {new: true, useFindAndModify: false})   
          .then(res => {
            io.to(rid).emit('STATE_UPDATE', {
              state: res
            });
          })
          .catch(err => { throw err });
      })
      .catch(err => {
        io.to(rid).emit('ERROR', {
          err
        });
      });

  });

});

function nextState(player, active, turnscore) {
  let newscore = remaining(player[active].points) - turnscore;
  if (newscore < 0) return player;
  else if (newscore == 0) {
    for (p in player) {
      player[p].points = [];
    }
    player[active].legs += 1;
  }
  else {
    player[active].points.push(turnscore);
  }
  return player
}

function remaining(points) {
  var sum = 0;
  for (var i = 0; i < points.length; i++) {
    sum = sum + points[i];
  }
  return 301 - sum
}




// // Create express app instance:
// const app = express();

// // Routes
// app.get('/rooms', function (_, res) {
//   res.send(Test.find());
// });

// app.post('/rooms', function (req, res) {
//   const {roomName, playerNames} = req.params;
//   let n = playerNames.length; 
//   var score = [];
//   var i;
//   for (i=0; i< n; i++) {
//     score.push({ remaining: 301, legs: 0});
//   }
//   const room = new Room({
//     roomName,
//     playerNames,
//     score,
//     activePlayer: 0,
//     active: true
//   });
//   res.send(room.save());
// });


// const server = app.listen(3001, function() {
//   console.log('server running on port 3001');
// });

// const io = require('socket.io')(server);

// io.on('connection', function(socket) {
//   console.log(socket.id);

//   socket.on('SEND_TURNSCORE', function(data) {
//     io.emit('TURNSCORE', data);
//   });

//   socket.on('CLEAR_SCORES', function() {
//     io.emit('CLEAR_SCORES');
//   });
// });
