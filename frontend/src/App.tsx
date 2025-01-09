// App.tsx
import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Flex,
  Button,
  ButtonGroup,
  extendTheme, Heading,
} from "@chakra-ui/react";
import Grave from "./Components/Grave";
import axios from 'axios';

const halloweenTheme = extendTheme({
  colors: {
    brand: {
      black: "#000000",
      orange: "#FF7518",
      purple: "#800080",
      gray: {
        700: "#2D3748",
        800: "#1A202C",
        900: "#171923",
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: "brand.black",
        color: "brand.orange",
      },
    },
  },
});

const TOTAL_GRAVES = 50000;
const GRAVES_PER_PAGE = 25;

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

export const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openGraves, setOpenGraves] = useState<Set<number>>(new Set());
  const [graveNames, setGraveNames] = useState<Map<number, string>>(new Map());

  const totalPages = Math.ceil(TOTAL_GRAVES / GRAVES_PER_PAGE);

  const graveIds = Array.from({ length: TOTAL_GRAVES }, (_, i) => i + 1);

  const indexOfLastGrave = currentPage * GRAVES_PER_PAGE;
  const indexOfFirstGrave = indexOfLastGrave - GRAVES_PER_PAGE;
  const currentGraves = graveIds.slice(indexOfFirstGrave, indexOfLastGrave);

  const handlePageChange = (page: number) => {
    const newPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(newPage);
  };

  const toggleGrave = (id: number) => {
    setOpenGraves((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const fetchGraveName = async (id: number) => {
    if (graveNames.has(id)) {
      // Name already cached
      return;
    }
    try {
      const response = await axios.get<{ name: string }>(process.env.REACT_APP_BACKEND_IP+`/grave/${id}`);
      await delay(2500);
      setGraveNames((prev) => new Map(prev).set(id, response.data.name));
    } catch (error) {
      console.error(`Error fetching the name for grave ${id}:`, error);
      setGraveNames((prev) => new Map(prev).set(id, 'Ukendt'));
    }
  };

  return (
    <ChakraProvider theme={halloweenTheme}>
      <Box textAlign="center" fontSize="xl" minH="100vh" p={5}>
        <Heading fontSize="3xl" mb={5} color="brand.orange">
          🕸️ Kirkegård 🕷️
        </Heading>
        <Heading fontSize={'sm'}>Page: {currentPage}</Heading>
        <br />

        <Flex
          flexWrap="wrap"
          justifyContent="center"
          gap={6}
          mb={10}
        >
          {currentGraves.map((id) => (
            <Grave
              key={id}
              id={id}
              isOpen={openGraves.has(id)}
              onToggle={() => {
                toggleGrave(id);
                fetchGraveName(id);
              }}
              name={graveNames.get(id)}
            />
          ))}
        </Flex>

        {/* Pagination Controls */}
        <Flex justify="center" mt={5}>
          <ButtonGroup spacing={4}>
            <Button
              onClick={() => handlePageChange(currentPage - 2)}
              isDisabled={currentPage <= 2}
              colorScheme="brand.orange"
              _hover={{ bg: "brand.purple" }}
            >
              Previous 2
            </Button>
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
              colorScheme="brand.orange"
              _hover={{ bg: "brand.purple" }}
            >
              Previous
            </Button>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={currentPage === totalPages}
              colorScheme="brand.orange"
              _hover={{ bg: "brand.purple" }}
            >
              Next
            </Button>
            <Button
              onClick={() => handlePageChange(currentPage + 5)}
              isDisabled={currentPage + 5 > totalPages}
              colorScheme="brand.orange"
              _hover={{ bg: "brand.purple" }}
            >
              Next 5
            </Button>
            <Button
              onClick={() => handlePageChange(totalPages)}
              isDisabled={currentPage === totalPages}
              colorScheme="brand.orange"
              _hover={{ bg: "brand.purple" }}
            >
              Last
            </Button>
          </ButtonGroup>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default App;
