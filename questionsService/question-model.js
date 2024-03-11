const mongoose = require('mongoose');

//preguntas
const preguntaSchema = new mongoose.Schema({
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
  nombre: {
    type: String,
    required: true
  }
});

const Categoria = mongoose.model('Categoria', categoriaSchema);

//Respuesta
const respuestaSchema = new mongoose.Schema({
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

