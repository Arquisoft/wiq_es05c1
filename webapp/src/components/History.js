import React, { useState } from 'react';
import { Box} from "@chakra-ui/react";
import { HistoryArea } from './HistoryArea';

function History(userName) {
  return (
    <>
      <Box minH="100vh" minW="100vw" 
      bgGradient="linear(to-t, #08313A, #107869)"
      display="flex" justifyContent="center" alignItems="center">
        <HistoryArea userName={userName}/>
      </Box>
    </>
  );
   
  
}

export default History;