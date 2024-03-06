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
    total_punctuation: {
      type: Number,
      required: true,
    },
    total_time: {
      type: TimeStamp,
      required: true,
    },
    user: {
      type: User,
      required: true,
    },
});

const History = mongoose.model('History', historySchema, 'History');

module.exports = History