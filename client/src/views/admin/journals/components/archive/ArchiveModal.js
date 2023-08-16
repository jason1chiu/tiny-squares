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
  Box,
} from "@chakra-ui/react";

const Overlay = () => <ModalOverlay bg="blackAlpha.700" />;

export default function ArchiveModal({ isOpen, onClose, journal, refresh }) {
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
                <Box display="flex" alignItems="center" width="100%">
            <Box display="flex" alignItems="center">
              Archive Journal
            </Box>
            <Box flexGrow={1}></Box>
            <ModalCloseButton />
          </Box>
        </ModalHeader>
        <ModalBody overflowY="auto" maxHeight="70vh">
          {/* You can place the content for the Archive Modal here */}
        </ModalBody>
        <ModalFooter borderTop="1px" borderTopColor="secondaryGray.200">
          <Button
            onClick={() => {
              onClose();
              if (refresh) {
                window.location.reload();
              }
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
