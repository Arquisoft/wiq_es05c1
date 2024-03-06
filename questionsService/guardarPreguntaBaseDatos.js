const mongoose = require('mongoose');

class GuardarBaseDatos{

    constructor(finalQuestion, choice, category){
        this.finalQuestion = finalQuestion;
        this.choice = choice;
        this.category = category;
    }

    guardarEnBaseDatos(){      
        // Connect to MongoDB
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/questionsdb';
        mongoose.connect(mongoUri);
  
        //guardamos la pregunta y el tipo
        this.guardarPreguntaTipo();

        //guardamos las preguntas incorrectas
        this.guardarPrimeraIncorrecta();
        this.guardarSegundaIncorrecta();
        this.guardarTerceraIncorrecta();

        //guardamos la categoria     
        this.guardarCategoria();

        //cerramos la conexion
        mongoose.connection.close();
      }

    guardarPreguntaTipo(){
        // Comprobar si la pregunta ya existe
        Pregunta.findOne({ textoPregunta: this.finalQuestion.question })
        .then(preguntaExistente => {
          if (!preguntaExistente) {          
            // Si no existe la pregunta, se crea
            var nuevaPregunta = new Pregunta({
              textoPregunta: this.finalQuestion.question,
              respuestaCorrecta: this.finalQuestion.correct,
              categoria: this.categoria
            });
  
            // Guardar la nueva pregunta
            nuevaPregunta.save()
              .then(preguntaGuardada => {
  
                // Comprobar si existe el tipo de la pregunta y asociarlo
                Tipos.findOne({ nombreTipo: this.choice })
                  .then(tipoExistente => {
                    if (!tipoExistente) {          
                      // Si no existe el tipo, se crea
                      var nuevoTipo = new Tipos({
                        idPreguntas: [preguntaGuardada._id],
                        nombreTipo: this.choice
                      });
                      
                      // Guardar el nuevo tipo
                      nuevoTipo.save();
                    } else {
                      // Si el tipo existe, agregar el ID de la nueva pregunta a idPreguntas
                      tipoExistente.idPreguntas.push(preguntaGuardada._id);
                      // Guardar el tipo actualizado
                      tipoExistente.save();
                    }            
                  });
              });
          }
        });
    }

    guardarPrimeraIncorrecta(){
         //comprobar si la primera respuesta existe ya en la base de datos
         Respuesta.findOne({ textoRespuesta: this.finalQuestion.incorrect1 })
         .then(respuestaExistente => {
           if (!respuestaExistente) {          
             // Si no existe ya esa pregunta la crea
             var nuevaRespuesta = new Respuesta({
               textoRespuesta: this.finalQuestion.question,
               tipos: [this.choice]
             });    
   
             //Guardamos la nueva respuesta
             nuevaRespuesta.save();
           }
           else{
             //comprobamos si ya existe el tipo en esa respuesta
             if (!respuestaExistente.tipos.includes(this.choice)) {
               //agragamos el nuevo tipo
               respuestaExistente.tipos.push(this.choice);
   
               respuestaExistente.save();
             }
           }
         });
    }

    guardarSegundaIncorrecta(){       
        //comprobar si la segunda respuesta existe ya en la base de datos
        Respuesta.findOne({ textoRespuesta: this.finalQuestion.incorrect2 })
        .then(respuestaExistente => {
          if (!respuestaExistente) {          
            // Si no existe ya esa pregunta la crea
            var nuevaRespuesta = new Respuesta({
              textoRespuesta: this.finalQuestion.question,
              tipos: [this.choice]
            });    
  
            //Guardamos la nueva respuesta
            nuevaRespuesta.save();
          }
          else{
            //comprobamos si ya existe el tipo en esa respuesta
            if (!respuestaExistente.tipos.includes(this.choice)) {
              //agragamos el nuevo tipo
              respuestaExistente.tipos.push(this.choice);
  
              respuestaExistente.save();
            }
          }
        });
    }

    guardarTerceraIncorrecta(){
        //comprobar si la tercera respuesta existe ya en la base de datos
        Respuesta.findOne({ textoRespuesta: this.finalQuestion.incorrect3 })
        .then(respuestaExistente => {
            if (!respuestaExistente) {          
             // Si no existe ya esa pregunta la crea
             var nuevaRespuesta = new Respuesta({
               textoRespuesta: this.finalQuestion.question,
               tipos: [this.choice]
             });    
   
             //Guardamos la nueva respuesta
             nuevaRespuesta.save();
           }
           else{
             //comprobamos si ya existe el tipo en esa respuesta
             if (!respuestaExistente.tipos.includes(this.choice)) {
               //agragamos el nuevo tipo
               respuestaExistente.tipos.push(this.choice);
   
               respuestaExistente.save();
             }
           }
        });
    }

    guardarCategoria(){
        Categoria.findOne({ textoPregunta: this.finalQuestion.question })
        .then(categoriaExistente => {
          if (!categoriaExistente) {          
            // Si no existe ya esa pregunta la crea
            var nuevaCategoria = new Categoria({
              nombre: this.category,
            });
      
            //Guardamos la nueva pregunta
            nuevaCategoria.save();
          }
        });
    }
}

module.exports = GuardarBaseDatos;