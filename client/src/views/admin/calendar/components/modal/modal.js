import React, { useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Select, Textarea, useDisclosure } from "@chakra-ui/react";

const CellModal = ({ isOpen, onClose, onSave, color, note }) => {
  const [selectedColor, setSelectedColor] = useState(color || "");
  const [selectedNote, setSelectedNote] = useState(note || "");

  // Update state when color or note props change
  useEffect(() => {
    setSelectedColor(color || "");
    setSelectedNote(note || "");
  }, [color, note]);

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleNoteChange = (e) => {
    setSelectedNote(e.target.value);
  };

  const handleSave = () => {
    onSave(selectedColor, selectedNote);
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