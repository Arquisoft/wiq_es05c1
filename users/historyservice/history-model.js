const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    total_correct_answers: {
      type: Number,
      required: true,
    },
    total_failed_answers: {
      type: Number,
      required: true,
    },
    total_games: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
});

const History = mongoose.model('History', historySchema);

module.exports = History