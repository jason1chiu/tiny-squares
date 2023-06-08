import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import Overview from "components/shared/calendar/index";

const Overlay = () => (
  <ModalOverlay
    bg="blackAlpha.700"

  />
);

export default function JournalModal({ isOpen, onClose, journal }) {
  const titleColor = useColorModeValue("navy.700", "white");
  return (
    <Modal  isOpen={isOpen} onClose={onClose} isCentered size="xl" scrollBehavior="inside">
      <Overlay />
      <ModalContent>
        <ModalHeader color={titleColor}>{journal.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Overview journal_id={journal._id}/>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}