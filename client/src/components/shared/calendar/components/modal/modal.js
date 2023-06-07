import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Select,
  Textarea,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";

const CellModal = ({
  isOpen,
  onClose,
  onSave,
  initialColor,
  initialNote,
  legends,
}) => {
  const [selectedLegend, setSelectedLegend] = useState(legends?.[0]);
  const [selectedNote, setSelectedNote] = useState(initialNote || "");

  // Update state when color or note props change
  useEffect(() => {
    setSelectedLegend(legends?.[0]);
    setSelectedNote(initialNote || "");
  }, [initialColor, initialNote, legends]);

  const handleColorChange = (e) => {
    setSelectedLegend(
      (legends ?? []).find((legend) => legend._id === e.target.value)
    );
  };

  const handleNoteChange = (e) => {
    setSelectedNote(e.target.value);
  };

  const handleSave = () => {
    onSave(selectedLegend, selectedNote);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Color and Add Note</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select
            value={selectedLegend?._id}
            onChange={handleColorChange}
            mb={4}
          >
            {(legends ?? []).map((legend, index) => (
              <option key={index} value={legend._id}>
                {legend.label}
              </option>
            ))}
          </Select>
          <HStack>
            <Box p={4} mb={2} bg={selectedLegend?.color}></Box>
            <Box p={4} mb={2}>{selectedLegend?.label}</Box>
          </HStack>
          <Textarea
            value={selectedNote}
            onChange={handleNoteChange}
            placeholder="Add a note..."
          />
        </ModalBody>
        <ModalFooter>
          <Button
            variant="darkBrand"
            color="white"
            fontSize="sm"
            fontWeight="500"
            borderRadius="70px"
            mr={3}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CellModal;
