const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');

// const setting
const DB_CONNECTION = `mongodb+srv://dividegame:${process.env.PASSWORD}@cluster0.0mioh.mongodb.net/<dbname>?retryWrites=true&w=majority`;
const PORT = 5000;

//establish socket.io
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// allow cross-origin requests
app.use(cors());

// soket server
io.on('connection', socket => {
  console.log('socket.io: User connected: ', socket.id);

  const id = socket.handshake.query.id;
  socket.join(id);

  // play game
  socket.on(
    'send-game-message',
    ({ receiver, inputNumber, numFromComp, resultNum }) => {
      socket.to(receiver).emit('receive-game-message', {
        receiver,
        player: id,
        inputNumber,
        numFromComp,
        resultNum,
      });
    }
  );

  // send game invitation
  socket.on('send-invitation', ({ receiver, number }) => {
    socket.to(receiver).emit('receive-invitation', {
      receiver,
      sender: id,
      number,
    });
  });

  // send game acception
  socket.on('accept-invitation', ({ receiver, isAccept }) => {
    socket.to(receiver).emit('accept-gameon', {
      receiver,
      sender: id,
      isAccept,
    });
  });

  // cancel game request
  socket.on('cancel-request', ({ receiver }) => {
    socket.to(receiver).emit('receive-cancel', {
      receiver,
      sender: id,
    });
  });

  socket.on('disconnect', () => {
    console.log('socket.io: User disconnected: ', socket.id);
  });
});

const usersRoute = require('./routes/users');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', usersRoute);

// connect to DB
mongoose.connect(DB_CONNECTION, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.once('open', () => {
  console.log('connected to database');

  // Watching DB update
  const divideGame = mongoose.connection.collection('users').watch();

  divideGame.on('change', change => {
    switch (change.operationType) {
      case 'insert':
        const player = {
          isAvailable: change.fullDocument.isAvailable,
          _id: change.fullDocument._id,
          userId: change.fullDocument.userId,
          userKey: change.fullDocument.userKey,
        };
        console.log('add-newplayer');
        io.emit('add-newplayer', player);
        break;

      case 'update':
        io.emit('update-player-info', {
          _id: change.documentKey._id,
          isAvailable: change.updateDescription.updatedFields.isAvailable,
        });
        break;
    }
  });
});

// start server
server.listen(PORT, () => console.log(`Server now running on port ${PORT}!`));
