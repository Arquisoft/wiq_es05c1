import { Box } from "@chakra-ui/react";
import { AnswerButton } from './AnswerButton.jsx';

export function AnswersBlock({ respuestas }){

    const correcta = respuestas[0];
    //Ordenar random
    //Intercambiar el primer elemento con otro elemento aleatorio del array
    const indiceAleatorio = Math.floor(Math.random() * (respuestas.length - 1));
    const save = respuestas[0];
    respuestas[0] = respuestas[indiceAleatorio];
    respuestas[indiceAleatorio] = save;

    console.log(correcta);

    return(
        <Box display="grid" flex="1" gridTemplateColumns="repeat(2,1fr)" 
        gridColumnGap="2em" padding="4em" alignItems="center">
            <AnswerButton text={respuestas[0]} colorFondo={"#A06AB4"}/>
            <AnswerButton text={respuestas[1]} colorFondo={"#B5EECB"}/>
            <AnswerButton text={respuestas[2]} colorFondo={"#FFD743"}/>
            <AnswerButton text={respuestas[3]} colorFondo={"#D773A2"}/>
        </Box>
    )
}