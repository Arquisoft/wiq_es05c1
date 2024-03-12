import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import { AnswerButton } from './AnswerButton.jsx';

export function AnswersBlock({ respuestas, correcta }){

    const [respuestasAleatorizadas, setRespuestasAleatorizadas] = useState([]);

    let respuestasCopy = respuestas;

    useEffect(() => {
        //Baraja con algoritmo de Fisher-Yates
        for (let i = respuestasCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [respuestasCopy[i], respuestasCopy[j]] = [respuestasCopy[j], respuestasCopy[i]];
        }

        setRespuestasAleatorizadas(respuestasCopy);
    }, [respuestasCopy]);

    const handleButtonClick = (respuesta) => {
        if (respuesta === correcta) {
            alert("¡Respuesta correcta!");
        } else {
            alert("Respuesta incorrecta.");
        }
        console.log("owimawe");
    };

    return (
        <Box display="grid" flex="1" gridTemplateColumns="repeat(2,1fr)" gridColumnGap="2em" padding="4em" alignItems="center">
            {respuestasAleatorizadas.map((respuesta, index) => (
                <AnswerButton key={index} text={respuesta} colorFondo={"#A06AB4"} onClick={() => handleButtonClick(respuesta)} />
            ))}
        </Box>
    );
}
