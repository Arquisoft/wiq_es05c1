
class GenerarPregunta {

    constructor() {
        this.obtenerPreguntaW = new ObtenerPreguntaWikiData();
        this.baseDatos = new GuardarBaseDatos();
    }

    // Método para ejecutar las operaciones
    ejecutarOperaciones() {
        this.obtenerPreguntaW.leerYSacarConsultas();
        this.baseDatos.guardarEnBaseDatos(this.obtenerPreguntaW.obtenerPregunta());
    }
}

module.exports = GenerarPregunta;