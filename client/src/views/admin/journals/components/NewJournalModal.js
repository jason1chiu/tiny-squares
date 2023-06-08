import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Select,
  useToast,
  useColorModeValue
} from "@chakra-ui/react";

import { useQuery } from "@apollo/client";

import { GET_JOURNALS } from "utils/queries";

import { useAuth } from "contexts/auth.context";

export default function NewJournalModal({ isOpen, onClose, onSubmit }) {
  const [journalName, setJournalName] = useState("");
  const bColor = useColorModeValue("secondaryGray.600", "white");
  const tColor = useColorModeValue("brand.800", "white");
  const { data } = useQuery(GET_JOURNALS);

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
    if (data?.journals?.length >= 3) {
      onSubmit({ name: journalName, category: journalCategory });
    } else {
      onSubmit({ name: journalName, category: journalCategory });
      toast({
        title: "Journal created.",
        description: "Your journal was successfully created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
        colorScheme: "purple",
      });
    }

    setJournalName("");
    setJournalCategory("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent width="100vw">
        <ModalHeader color={tColor}>Create a new journal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
          variant="auth"
            value={journalName}
            onChange={handleInputChange}
            placeholder="Journal name"
          />
          <Select
          color = {bColor}
          variant="auth"
            value={journalCategory}
            onChange={handleSelectChange}
            placeholder="Select option"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="purple" mr={3} onClick={handleSubmit}>
            Go
          </Button>
          <Button color={tColor} variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
