const express = require('express');
const Message = require('../models/message')
const router = express.Router();

router.get('/messages', async (req, res) => {
    const messages = await Message.find().sort('timestamp');
    res.json(messages);
});


router.delete('/messages', async (req, res) => {
  try {
    await Message.deleteMany({});
    const io = req.app.get('io');
    io.emit('clearMessages'); 
    res.status(200).send('All messages deleted.');
  } catch (error) {
    console.error('Error deleting messages:', error);
    res.status(500).send('Error deleting messages.');
  }
});

module.exports = router;