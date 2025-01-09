// Grave.tsx
import React from 'react';
import { Box, Text, Collapse, Image } from '@chakra-ui/react';

const grave = require('./grave.png');
const openGrave = require('./open-grave.png');
const digging = require('./digging.gif');

interface GraveProps {
  id: number;
  isOpen: boolean;
  onToggle: () => void;
  name?: string;
}

const Grave = ({ id, isOpen, onToggle, name }: GraveProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      width="200px"
      p="5"
      borderRadius="md"
      boxShadow="lg"
      cursor="pointer"
      bg="brand.gray.800"
      color="brand.orange"
      _hover={{ bg: "brand.gray.700" }}
      onClick={onToggle}
    >
      {isOpen && name === undefined ? (
        <Image src={digging} alt="Digging" boxSize="50px" />
      ) : (
        <>
          <Image src={isOpen ? openGrave : grave} alt="Grave" boxSize="100px" />
          <Collapse in={isOpen} animateOpacity>
            <Box
              mt="4"
              p="3"
              bg="brand.gray.700"
              borderRadius="md"
              border="1px solid"
              borderColor="brand.orange"
            >
              <Text fontSize="md">Her ligger {name || 'Ukendt'}</Text>
            </Box>
          </Collapse>
        </>
      )}
    </Box>
  );
};

export default Grave;
