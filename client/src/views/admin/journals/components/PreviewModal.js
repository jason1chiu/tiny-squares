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

const Overlay = () => <ModalOverlay bg="blackAlpha.700" />;

export default function JournalModal({ isOpen, onClose, journal }) {
  const titleColor = useColorModeValue("navy.700", "white");
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="xl"
      scrollBehavior="inside"
    >
      <Overlay />
      <ModalContent>
        <ModalHeader
          color={titleColor}
          borderBottom="1px"
          borderBottomColor="secondaryGray.200"
        >
          {journal.name}{" "}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Overview journal_id={journal._id} />
        </ModalBody>
        <ModalFooter borderTop="1px" borderTopColor="secondaryGray.200">
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
