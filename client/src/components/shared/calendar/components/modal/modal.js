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
} from "@chakra-ui/react";

const CellModal = ({
  isOpen,
  onClose,
  onSave,
  initialColor,
  initialNote,
  legends,
}) => {
  const [selecteLegend, setSelectedLegend] = useState(legends?.[0]);
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
    onSave(selecteLegend, selectedNote);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Color and Add Note</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select
            value={selecteLegend?._id}
            onChange={handleColorChange}
            mb={4}
          >
            {(legends ?? []).map((legend, index) => (
              <option key={index} value={legend._id}>
                {legend.color} {legend.label}
              </option>
            ))}
          </Select>
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
