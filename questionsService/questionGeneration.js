const PreguntaWiki = require("./obtenerPreguntasWikidata");
const preguntaWiki = new PreguntaWiki();

const GuardarPregunta = require("./guardarPreguntaBaseDatos");
const guardarPregunta = new GuardarPregunta();

class GenerarPregunta {
    // Método para ejecutar las operaciones
    ejecutarOperaciones() {
        console.log(`Ejecutando operaciones`);
        preguntaWiki.leerYSacarConsultas();
        guardarPregunta.guardarEnBaseDatos(preguntaWiki.obtenerPregunta());
    }
}

module.exports = GenerarPregunta;