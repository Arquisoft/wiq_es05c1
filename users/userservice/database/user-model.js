const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
});

const Usuario = mongoose.model('Usuario', userSchema, 'Usuario');

module.exports = Usuario