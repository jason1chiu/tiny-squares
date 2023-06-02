import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Select, Textarea, useDisclosure } from "@chakra-ui/react";

const CellModal = ({ isOpen, onClose, onSave }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [note, setNote] = useState("");

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleSave = () => {
    onSave(selectedColor, note);
  };

  return (
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
  );
};

export default CellModal;