import React from 'react';
import { Box, Flex, Text, Link } from '@chakra-ui/react';

const MainMenu = () => {
  return (
    <Box bgGradient="linear(to-t, #08313A, #107869)" color="white" py="4">
      <Flex justify="space-between" align="center" maxW="md" mx="auto">
        <Text fontSize="xl" fontWeight="bold">Main Menu</Text>
        <Flex>
          <Link
            href="#"
            mr="4"
            textDecoration="none"
            _hover={{ textDecoration: 'underline' }}
          >
            Home
          </Link>
          <Link
            href="#"
            mr="4"
            textDecoration="none"
            _hover={{ textDecoration: 'underline' }}
          >
            About
          </Link>
          <Link
            href="#"
            mr="4"
            textDecoration="none"
            _hover={{ textDecoration: 'underline' }}
          >
            Contact
          </Link>
          <Link
            href="#"
            mr="4"
            textDecoration="none"
            _hover={{ textDecoration: 'underline' }}
          >
            Profile
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default MainMenu;