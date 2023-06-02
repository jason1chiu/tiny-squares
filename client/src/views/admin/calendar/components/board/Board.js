import React, { useState } from "react";
import { Box, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import Card from "components/card/card";
import CellModal from "views/admin/calendar/components/modal/modal";

const PixelGridJournal = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [note, setNote] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCellClick = (color) => {
    setSelectedColor(color);
    onOpen();
  };

  const handleSave = (color, note) => {
    setSelectedColor(color);
    setNote(note);
    onClose();
  };

  return (
    <Card mt={4} mb={6} mx="auto" h="80vh">
      <Box h="100%" w="100%">
        <Grid templateColumns="repeat(12, 1fr)" gap={0} h="100%" w="100%">
          {Array.from({ length: 31 }, (_, rowIndex) => (
            Array.from({ length: 12 }, (_, colIndex) => (
              <GridItem key={`${rowIndex}-${colIndex}`}>
                <Box
                  bg={selectedColor}
                  h="100%"
                  w="100%"
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => handleCellClick("#FF0000")}
                />
              </GridItem>
            ))
          ))}
        </Grid>
      </Box>

      <CellModal isOpen={isOpen} onClose={onClose} onSave={handleSave} />
    </Card>
  );
};

export default PixelGridJournal;