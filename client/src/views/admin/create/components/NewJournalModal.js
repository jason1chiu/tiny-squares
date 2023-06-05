import { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Select, useToast } from "@chakra-ui/react";

import { useAuth } from "contexts/auth.context";

function NewJournalModal({ isOpen, onClose, onSubmit }) {
  const [journalName, setJournalName] = useState("");
  const [journalCategory, setJournalCategory] = useState("");
  let { categories } = useAuth();
  const toast = useToast();

  const handleInputChange = (event) => {
    setJournalName(event.target.value);
  };

  const handleSelectChange = (event) => {
    setJournalCategory(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit({name: journalName, category: journalCategory});
    toast({
      title: "Journal created.",
      description: "Your journal was successfully created!",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
      colorScheme: "purple"
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered >
      <ModalOverlay />
      <ModalContent width="100vw">
        <ModalHeader>Create a new journal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input value={journalName} onChange={handleInputChange} placeholder="Journal name" />
          <Select value={journalCategory} onChange={handleSelectChange} placeholder='Select option'>
            {categories.map(category =>
              <option value={category}>{category}</option>
            )}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Go
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default NewJournalModal;