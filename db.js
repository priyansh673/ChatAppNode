const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const URL = process.env.MONGODB_LOCAL_URL;


const connectDB = () => {
mongoose.connect(URL);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB connected successfully.');
  });
  
db.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
  });
  
db.on('disconnected', () => {
    console.log('MongoDB disconnected.');
  });

}

module.exports = connectDB;