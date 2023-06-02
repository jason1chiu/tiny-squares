import React, { useState } from "react";
import { Box, Grid, GridItem, Select, Textarea, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from "@chakra-ui/react";
import Card from "components/card/card";

const PixelGridJournal = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [note, setNote] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCellClick = (color) => {
    setSelectedColor(color);
    onOpen();
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleSave = () => {
    // Save the selectedColor and note
    console.log("Selected Color:", selectedColor);
    console.log("Note:", note);

    onClose();
  };

  return (
    <Card mt={4} mb={4} mx="auto" h="50vh">
      <Box h="100%" w="100%">
        <Grid templateColumns="repeat(12, 1fr)" gap={1} h="100%" w="100%">
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Color and Add Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select value={selectedColor} onChange={handleColorChange} mb={4}>
              <option value="#FF0000">Red</option>
              <option value="#00FF00">Green</option>
              <option value="#0000FF">Blue</option>
            </Select>
            <Textarea value={note} onChange={handleNoteChange} placeholder="Add a note..." />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default PixelGridJournal;