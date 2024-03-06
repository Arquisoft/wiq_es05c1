const mongoose = require('mongoose');
class ObtenerPreguntas{

    obtenerPregunta(){
         // Connect to MongoDB
         const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/questionsdb';
         mongoose.connect(mongoUri);
         
         var pregunta;
         var respuestaCorrecta;
         var respuestaIncorrecta1;
         var respuestaIncorrecta2;
         var respuestaIncorrecta3;

         Pregunta.aggregate([
            { $sample: { size: 1 } }
        ]).then(pregunta => {
           var pregunta_id = pregunta._id;
           pregunta = pregunta.textoPregunta;
            Tipo.findOne({ _id: { $in: pregunta.pregunta_id } }).then(tipo => {
             console.log(tipo_id);
             respuestaCorrecta = pregunta.respuestaCorrecta;
             console.log(respuestaCorrecta);
             Respuesta.aggregate([
                { $match: { nombreTipo: tipo._id, texto: { $ne: [respuestaCorrecta, "Ninguna de las anteriores" ]} } },
                { $sample: { size: 3 } }
            
            ]).then(respuestas => {
                console.log(respuestas);
                respuestaIncorrecta1 = respuestas[0].textoRespuesta;
                respuestaIncorrecta2 = respuestas[1].textoRespuesta;
                respuestaIncorrecta3 = respuestas[2].textoRespuesta;
            }).catch(err => {
                console.error(err);
            });
            })
            console.log(pregunta_id);

        }).catch(err => {
            console.error(err);
        });

        return resultado = {
            pregunta: pregunta.textoPregunta,
            correcta: respuestaCorrecta,
            respuestasIncorrecta1:  respuestaIncorrecta1,
            respuestasIncorrecta2:  respuestaIncorrecta2,
            respuestasIncorrecta3:  respuestaIncorrecta3
        };
    }
}