import React, { useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Select, Textarea, useDisclosure } from "@chakra-ui/react";

const CellModal = ({ isOpen, onClose, onSave, initialColor, initialNote, legends }) => {
  const [selectedColor, setSelectedColor] = useState(initialColor || "");
  const [selectedNote, setSelectedNote] = useState(initialNote || "");

  // Update state when color or note props change
  useEffect(() => {
    setSelectedColor(initialColor || "");
    setSelectedNote(initialNote || "");
  }, [initialColor, initialNote]);

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
            {legends.map((legend, index) => (
              <option key={index} value={legend.color}>{legend.label}</option>
            ))}
          </Select>
          <Textarea value={selectedNote} onChange={handleNoteChange} placeholder="Add a note..." />
        </ModalBody>
        <ModalFooter>
          <Button variant='darkBrand'
                color='white'
                fontSize='sm'
                fontWeight='500'
                borderRadius='70px' mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CellModal;