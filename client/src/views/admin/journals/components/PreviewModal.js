// JournalModal.js

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
} from "@chakra-ui/react";
import Overview from "components/shared/calendar/index";

const Overlay = () => (
  <ModalOverlay
    bg="blackAlpha.700"

  />
);

export default function JournalModal({ isOpen, onClose, journal }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl" scrollBehavior="inside">
      <Overlay />
      <ModalContent>
        <ModalHeader>{journal.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Overview />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}