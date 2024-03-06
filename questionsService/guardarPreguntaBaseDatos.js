const mongoose = require('mongoose');

class GuardarBaseDatos{

    constructor(finalQuestion, choice, category){
        this.finalQuestion = finalQuestion;
        this.choice = choice;
        this.category = category;
    }

    guardarEnBaseDatos(){      
      console.log("Guardando pregunta en la base de datos");
        // Connect to MongoDB
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/questionsdb';
        mongoose.connect(mongoUri);
  
        //primero deberiamos de guardar la categoria     
        this.guardarCategoria();

        //cerramos la conexion
        mongoose.connection.close();
      }

    guardarCategoria(){
      console.log("Guardando categoria");
      var idCategoria;
  
      Categoria.findOne({ textoPregunta: this.finalQuestion.category })
        .then(categoriaExistente => {
          if (!categoriaExistente) {          
            // Si no existe ya esa categoria la crea
            var nuevaCategoria = new Categoria({
              nombre: this.category,
            });
        
            //Guardamos la nueva pregunta
            nuevaCategoria.save().then(categoriaGuardada => {
              //guardamos el id de la categoria nueva
                idCategoria = categoriaGuardada._id;
            });
          }
  
          else{
            //guardamos el id de la categoria existente
            idCategoria = categoriaExistente._id;
          }
        });
  
        this.guardarPreguntaTipo(idCategoria);
    }

    guardarPreguntaTipo(idCategoria){
      console.log("Guardando pregunta y tipo");
      var idTipo;
      // Comprobar si la pregunta ya existe
      Pregunta.findOne({ textoPregunta: this.finalQuestion.question })
      .then(preguntaExistente => {
        if (!preguntaExistente) {          
          // Si no existe la pregunta, se crea
          var nuevaPregunta = new Pregunta({
            textoPregunta: this.finalQuestion.question,
            respuestaCorrecta: this.finalQuestion.correct,
            categoria: idCategoria
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
                    nuevoTipo.save().then(tipoGuardado => {
                      //guardamos el id del tipo
                      idTipo = tipoGuardado._id;
                    });
                  } 
                  else {
                    // Si el tipo existe, agregar el ID de la nueva pregunta a idPreguntas
                    tipoExistente.idPreguntas.push(preguntaGuardada._id);
                    // Guardar el tipo actualizado
                    tipoExistente.save().then(tipoGuardado => {
                      //guardamos el id del tipo
                      idTipo = tipoGuardado._id;
                    });
                  }            
                });
            });
        }
      });

      this.guardarPrimeraIncorrecta(idTipo);
      this.guardarSegundaIncorrecta(idTipo);
      this.guardarTerceraIncorrecta(idTipo);
    }

    guardarPrimeraIncorrecta(idTipo){
      console.log("Guardando primera incorrecta");
         //comprobar si la primera respuesta existe ya en la base de datos
         Respuesta.findOne({ textoRespuesta: this.finalQuestion.incorrect1 })
         .then(respuestaExistente => {
           if (!respuestaExistente) {          
             // Si no existe ya esa pregunta la crea
             var nuevaRespuesta = new Respuesta({
               textoRespuesta: this.finalQuestion.question,
               tipos: [idTipo]
             });    
   
             //Guardamos la nueva respuesta
             nuevaRespuesta.save();
           }
           else{
             //comprobamos si ya existe el tipo en esa respuesta
             if (!respuestaExistente.tipos.includes(idTipo)) {
               //agregamos el nuevo tipo
               respuestaExistente.tipos.push(idTipo);
   
               respuestaExistente.save();
             }
           }
         });
    }

    guardarSegundaIncorrecta(idTipo){    
      console.log("Guardando segunda incorrecta");   
        //comprobar si la segunda respuesta existe ya en la base de datos
        Respuesta.findOne({ textoRespuesta: this.finalQuestion.incorrect2 })
        .then(respuestaExistente => {
          if (!respuestaExistente) {          
            // Si no existe ya esa pregunta la crea
            var nuevaRespuesta = new Respuesta({
              textoRespuesta: this.finalQuestion.question,
              tipos: [idTipo]
            });    
  
            //Guardamos la nueva respuesta
            nuevaRespuesta.save();
          }
          else{
            //comprobamos si ya existe el tipo en esa respuesta
            if (!respuestaExistente.tipos.includes(idTipo)) {
              //agregamos el nuevo tipo
              respuestaExistente.tipos.push(idTipo);
  
              respuestaExistente.save();
            }
          }
        });
    }

    guardarTerceraIncorrecta(idTipo){
      console.log("Guardando tercera incorrecta");
        //comprobar si la tercera respuesta existe ya en la base de datos
        Respuesta.findOne({ textoRespuesta: this.finalQuestion.incorrect3 })
        .then(respuestaExistente => {
            if (!respuestaExistente) {          
             // Si no existe ya esa pregunta la crea
             var nuevaRespuesta = new Respuesta({
               textoRespuesta: this.finalQuestion.question,
               tipos: [idTipo]
             });    
   
             //Guardamos la nueva respuesta
             nuevaRespuesta.save();
           }
           else{
             //comprobamos si ya existe el tipo en esa respuesta
             if (!respuestaExistente.tipos.includes(idTipo)) {
               //agregamos el nuevo tipo
               respuestaExistente.tipos.push(idTipo);
   
               respuestaExistente.save();
             }
           }
        });
    }

}

module.exports = GuardarBaseDatos;