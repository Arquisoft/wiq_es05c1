class ObtenerPreguntaWikiData {
    
    constructor(language = 'es') {
        this.language = language;

        //obtenemos las labels de lo que queremos obtener (lo que esta en la select que queremos buscar)
        this.labels;       

        //obtenemos la información mas general de la pregunta (por ejemplo país)
        this.question;
        //obtenemos el "tipo" de la pregunta (por ejemplo capital)
        this.type;
        //obtenemos la categoría de la pregunta (por ejemplo geografia)
        this.category;
        //obtenemos las 4 posibles respuestas
        this.answers;

        //para guardar toda la información relativa a las preguntas
        this.finalQuestion;
        
    }
    
    /*
        Leemos el archivo .xml que tenemos con todas las consultas disponibles
        Posteriormente se elige una consulta al azar
        Se obtiene la consulta y la información que necesitamos para posteriores métodos
    */
    leerYSacarConsultas() {
        //abrimos el xml con las preguntas
        const xhr = new XMLHttpRequest();
        xhr.open('GET', "preguntas.xml", true);
    
        xhr.onload = () => {
          if (xhr.status === 200) {
            const xmlString = xhr.responseText;
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
            
            //obtenemos todas las consultas disponibles
            var preguntas = xmlDoc.getElementsByTagName('pregunta');
    
            //cogemos una consulta de forma aleatoria
            var pregunta = preguntas[Math.floor(Math.random() * preguntas.length)];
            //obtenemos la informacion relativa a la pregunta
            this.question = pregunta.getAttribute('question');
            this.type = pregunta.getAttribute('type');
            this.category = pregunta.getAttribute('category');

            //obtenemos la consulta que vamos a realizar
            var query = pregunta.getElementsByTagName('query')[0].textContent;

            //obtenemos los datos que estan en la select de la consulta para posteriormente obtener la informacion del binding.result
            var consultaParte = query.match(/SELECT(.*?)WHERE/s)[1].trim();
                
            // Dividir la parte de la consulta por los símbolos '?' para obtener las labels 
            this.labels = consultaParte.split('?').map(part => part.trim()).filter(part => part !== '');

            //obtenemos todas las entradas de wikidata para esa query
            this.obtenerEntidadesConsulta(query);
            
          } else {
            console.error('Error al cargar el archivo:', xhr.statusText);
          }
        };
    
        xhr.onerror = () => {
          console.error('Error de red al cargar el archivo.');
        };
    
        xhr.send();
      }

    /*
      Hace una llamada a la API para poder obtener la información relativa a la consulta
      Si la llamada tiene exito se llama a otro metodo para procesar la información
    */
    obtenerEntidadesConsulta(consulta){               
        const apiUrl = 'https://query.wikidata.org/sparql';
        
        $.ajax({
            url: apiUrl,
            data: {
                query: consulta,
                format: 'json'
            },
            dataType: 'json',
            success: this.obtenerInformacionParaPregunta.bind(this),
            error: function(error) {
                console.log('Error:', error);
            }
        });
    }

    /*
      Obtenemos 4 entidades aleatorias de los datos devueltos por la consulta que hemos realizado
    */
    obtenerInformacionParaPregunta(data){
        //obtenemos el label y el resultado de todas las entidades
        if(data && data.results && data.results.bindings.length > 0){
            var entidades = data.results.bindings.map(binding => {
                return {
                    //obtenemos el label de la "pregunta" (ejemplo country)
                    label: this.obtenerValorPropiedad(binding, this.labels[1]),
                    //obtenemos el label de la "respuesta" (ejemplo capital)
                    result: this.obtenerValorPropiedad(binding, this.labels[2])
                };
            });

            //obtenemos 4 índices aleatorios únicos
            var indicesAleatorios = [];
            while(indicesAleatorios.length < 4){
                var indiceAleatorio = Math.floor(Math.random() * entidades.length);
                if(!indicesAleatorios.includes(indiceAleatorio)){
                    indicesAleatorios.push(indiceAleatorio);
                }
            }

            //obtenemos las 4 entidades aleatorias que vamos a utilizar para generar la pregunta
            this.answers = indicesAleatorios.map(indice => entidades[indice]);

            this.generarTextoPregunta();
        } 
    }    

    /*
      obtenemos el valor que queremos de la entidad
    */
    obtenerValorPropiedad(binding, propertyName) {
      //si tiene la 
        if (binding && binding.hasOwnProperty(propertyName)) {
            return binding[propertyName].value;
        } else {
            return "Ninguna de las anteriores"; 
        }
    }

    /*
      generamos la pregunta con la información que hemos obtenido  
    */
    generarTextoPregunta(){
        const xhr = new XMLHttpRequest();
        xhr.open('GET', "esqueletoPreguntas.xml", true);
    
        xhr.onload = () => {
          if (xhr.status === 200) {
            const xmlString = xhr.responseText;
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
            
            //obtiene todos los esqueletos de las preguntas
            var textoPregunta = xmlDoc.querySelector('pregunta[question="' + this.question + '"][type="' + this.type +'"]').textContent;
    
            //comprobamos que el resultado es valido para hacer la pregunta (que no sea QXXXXX)
            var preguntaCorrecta = this.answers.find(entidad => {
              return !entidad.label.startsWith('Q') && /\d/.test(entidad.label);
            });

            if(preguntaCorrecta){
              //rellenamos el esqueleto de la pregunta con los datos de la entidad
              var pregunta = preguntaCorrecta.label;
              var respuestaCorrecta = preguntaCorrecta.result;
              var consulta = textoPregunta.replace('{RELLENAR}', pregunta);

              generarPregunta(consulta, respuestaCorrecta);

                       
            } 
          }
        };    
        xhr.send();
    }

    /* 
      generamos un json con la info necesaria de la pregunta para poder guardarla en la base de datos
    */
    generarPregunta(consulta, respuestaCorrecta){
      var respuestasIncorrectas = [];
      var num = 0;
      //añadimos el resto de respuestas
      for(var i = 0; i < this.answers.length; i++){
        if(this.answers[i].result !== respuestaCorrecta){
          respuestasIncorrectas[num] = this.answers[i].label;
          num++;
        }
      }

      //guardamos la pregunta para añadirla a la base de datos
      this.finalQuestion = {
        question: consulta,
        correct: respuestaCorrecta,
        incorrect1: respuestasIncorrectas[0],
        incorrect2: respuestasIncorrectas[1],
        incorrect3: respuestasIncorrectas[2]
      }   
    }   

    obtenerPregunta(){
      return finalQuestion;
    }
}

module.exports = ObtenerPreguntaWikiData;