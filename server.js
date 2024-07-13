const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const moment = require('moment');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();
const server = http.createServer(app);


const db = require('./db');
db();

const Message = require('./models/message');
app.use(cors());

app.use(express.json());


app.use(express.static('public'));

const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE'],
  }
});

app.set('io', io);

const messageRoutes = require('./routes/messageRoutes');
app.use('/', messageRoutes);
  

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', async (data) => {
    const newMessage = new Message({
      sender: data.sender,
      content: data.content,
      timestamp: moment().toDate(),
    });

    await newMessage.save();


    io.emit('message', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


const PORT = process.env.PORT || 2000;


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
