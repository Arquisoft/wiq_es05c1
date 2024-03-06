const mongoose = require('mongoose');

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://mongodb:27017/questionsdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

//preguntas
const preguntaSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,    
    textoPregunta: {
        type: String,
        required: true
    },
    respuestaCorrecta: {
    type: String,
        required: true
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    }
    });

const Pregunta = mongoose.model('Pregunta', preguntaSchema);

//categoria
const categoriaSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: {
    type: String,
    required: true
  }
});

const Categoria = mongoose.model('Categoria', categoriaSchema);

//Respuesta
const respuestaSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  textoRespuesta: {
    type: String,
    required: true
  },
  tipos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tipos'
  }]
});
const Respuesta = mongoose.model('Respuesta', respuestaSchema);

//Tipos
const tiposSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  idPreguntas: [{
    type: String,
    required: true
  }],
  nombreTipo: {
    type: String,
    required: true
  }
});

// Definir el modelo de respuesta
const Tipos = mongoose.model('Tipos', tiposSchema);
