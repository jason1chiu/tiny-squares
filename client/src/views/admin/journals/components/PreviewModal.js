// JournalModal.js

import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
// Import the Calendar and Legend components
import Overview from "views/admin/calendar/index";

const Overlay = () => (
  <ModalOverlay
    bg='blackAlpha.300'
    backdropFilter='blur(10px) hue-rotate(90deg)'
  />
)

export default function JournalModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl" scrollBehavior='inside'>
      <Overlay />
      <ModalContent>
        <ModalHeader>Journal Details</ModalHeader>
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