const mongoose = require('mongoose');
const User = require('../user-model');

const gameSchema = new mongoose.Schema({
    correct_answers: {
      type: Number,
      required: true,
    },
    failed_answers: {
      type: Number,
      required: true,
    },
    punctuation: {
      type: Number,
      required: true,
    },
    time: {
      type: TimeStamp,
      required: true,
    },
    user: {
      type: User,
      required: true,
    },
});

const Game = mongoose.model('Game', gameSchema, 'Game');

module.exports = Game