import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box} from "@chakra-ui/react";
import { AnswersBlock } from './AnswersBlock.jsx';
import { EnunciadoBlock } from './EnunciadoBlock.jsx';

export function QuestionArea(){

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
    // Estado para almacenar los datos de la pregunta
  const [questionData, setQuestionData] = useState(null);

    // Función para llamar al servicio y obtener los datos de la pregunta
  const fetchQuestionData = async () => {
      try {
          // Llamada al servicio para obtener los datos de la pregunta (aquí asumiendo que el servicio devuelve un JSON)
          const response = await axios.get(`${apiEndpoint}/question`);
          const data = await response.json();
          setQuestionData(data); // Actualizar el estado con los datos de la pregunta obtenidos del servicio
      } catch (error) {
          console.error('Error fetching question data:', error);
      }
  };

      // Llamar al servicio al cargar el componente (equivalente a componentDidMount)
      useEffect(() => {
        fetchQuestionData();
    }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

    
    const questionJson = {
      "pregunta": "What is the capital of France?",
      "correcta": "Paris",
      "respuestasIncorrecta1": "London",
      "respuestasIncorrecta2": "Berlin",
      "respuestasIncorrecta3": "Madrid"
    }

    const respuestas = [questionJson.correcta,questionJson.respuestasIncorrecta1,questionJson.respuestasIncorrecta2,questionJson.respuestasIncorrecta3];


    return(
        <Box alignContent="center" bg="#0000004d" display="flex" flexDir="column"
        maxH="80vh" maxW="70vW" minH="70vh" minW="60vW">
          {questionJson ? ( // Verificar si se han obtenido los datos de la pregunta
                <>
                    <EnunciadoBlock pregunta={questionJson.pregunta}/> {/* Renderizar el enunciado de la pregunta */}
                    <AnswersBlock respuestas={respuestas}/> {/* Renderizar las respuestas de la pregunta */}
                </>
            ) : (
                <p>Cargando...</p> // Mensaje de carga mientras se obtienen los datos
            )}
        </Box>
    )
}