import React, { useState } from 'react';
import { Box} from "@chakra-ui/react";
import { QuestionArea } from './QuestionArea';

function Game() {
  return (
    <>
      <Box minH="100vh" minW="100vw" 
      bgGradient="linear(to-t, #08313A, #107869)"
      display="flex" justifyContent="center" alignItems="center">
        <QuestionArea/>
      </Box>
    </>
  );
   
  
}

export default Game;
