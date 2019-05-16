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
        return Room.find();
      }
    },
    {
      method: 'POST',
      path: '/rooms',
      handler: (req, res) => {
        const {roomName, playerNames} = req.payload;
        var player = [];
        for (p in playerNames) {
          player.push({ name: playerNames[p], remaining: 301, legs: 0 });
        }
        const room = new Room({
          roomName,
          player,
          activePlayer: 0,
          active: true
        });
        return room.save();
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
    console.log("score received: "+JSON.stringify(data));
    let rid = data.roomId;
    socket.join(rid);
    Room.findById(rid)
      .then(res => {
        let active  = res.activePlayer;
        let n = res.player.length; 
        let next = (active + 1) % n;
        let playerNew = nextState(res.player, active, data.turnscore)

        Room.findByIdAndUpdate(rid, {player: playerNew, activePlayer: next}, {new: true})
          .then(res => {
            console.log("sent new state: "+JSON.stringify(res));
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
  let newscore = player[active].remaining - turnscore;
  if (newscore < 0) return player;
  else if (newscore == 0) {
    for (p in player) {
      player[p].remaining = 301;
      if (p == active) {
        player[p].legs += 1;
      }
    }
  }
  else {
    player[active].remaining -= turnscore;
  }
  return player
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
