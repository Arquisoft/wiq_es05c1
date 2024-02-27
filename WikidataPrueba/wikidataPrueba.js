class WikiData {
    constructor() {
        this.baseUrl = 'https://www.wikidata.org/w/api.php';
    }

    async searchEntities(searchTerm, language = 'es') {
        try {
            const response = await fetch(`${this.baseUrl}?action=wbsearchentities&search=${searchTerm}&language=${language}&format=json`);
            const data = await response.json();

            // Extraer el QID de la primera entidad en la lista
            const qid = data.search[0].id;

            // Consultar la entidad para obtener más detalles
            const entityResponse = await fetch(`${this.baseUrl}?action=wbgetentities&ids=${qid}&format=json`);
            const entityData = await entityResponse.json();

            // Extraer la capital (P36) de la entidad
            const capitalId = entityData.entities[qid].claims.P36[0].mainsnak.datavalue.value.id;
            const capitalResponse = await fetch(`${this.baseUrl}?action=wbgetentities&ids=${capitalId}&format=json`);
            const capitalData = await capitalResponse.json();
            const capitalLabel = capitalData.entities[capitalId].labels.es.value;

            const idiomaId = entityData.entities[qid].claims.P37[0].mainsnak.datavalue.value.id;
            const idiomaResponse = await fetch(`${this.baseUrl}?action=wbgetentities&ids=${idiomaId}&format=json`);
            const idiomaData = await idiomaResponse.json();
            const idiomaLabel = idiomaData.entities[idiomaId].labels.es.value;
            // Construir una cadena con la información
           

            // Construir una cadena con la información
            const result = `El qid de ${searchTerm} es : ${qid}.La capital de ${searchTerm} es ${capitalLabel} y su idioma es ${idiomaLabel}`;

            return result;
        } catch (error) {
            console.error('Error al obtener datos de Wikidata:', error);
            return 'No se pudo obtener la información.';
        }
    }
}

// Crear una instancia de la clase Wikidata
const wikidata = new WikiData();
wikidata.searchEntities("España").then(result => console.log(result));
