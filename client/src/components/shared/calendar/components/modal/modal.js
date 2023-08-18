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
  Textarea,
  Menu,
  useColorModeValue,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

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

  useEffect(() => {
    setSelectedLegend(legends?.[0]);
    setSelectedNote(initialNote || "");
  }, [initialColor, initialNote, legends]);

  const handleNoteChange = (e) => {
    setSelectedNote(e.target.value);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    onSave(selectedLegend, selectedNote);
  };

  const titleColor = useColorModeValue("navy.700", "white");
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          color={titleColor}
          borderBottom="1px"
          borderBottomColor="secondaryGray.200"
        >
          Log your Day
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={5} pt={4}>
            <Box width="100%">
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  <HStack spacing={7} align="center">
                    <Box
                      boxSize="2rem"
                      style={{
                        backgroundImage: `
                      linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%), linear-gradient(225deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%),
                      linear-gradient(${selectedLegend?.color}, ${selectedLegend?.color})`,
                        backgroundSize: "100% 100%, 100% 100%, auto",
                        backgroundPosition: "0",
                        backdropFilter: "blur(10px)",
                        boxShadow: "5px 5px 10px rgba(0,0,0,0.3)",
                        borderRadius: "7px",
                      }}
                    />
                    <Box>{selectedLegend?.label}</Box>
                  </HStack>
                </MenuButton>
                <MenuList>
                  {(legends ?? []).map((legend, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => setSelectedLegend(legend)}
                      minH="48px"
                    >
                      <HStack spacing={2} align="center">
                        <Box
                          boxSize="2rem"
                          style={{
                            backgroundImage: `
                          linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%), linear-gradient(225deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%),
                          linear-gradient(${legend.color}, ${legend.color})`,
                            backgroundSize: "100% 100%, 100% 100%, auto",
                            backgroundPosition: "0",
                            backdropFilter: "blur(10px)",
                            boxShadow: "5px 5px 10px rgba(0,0,0,0.3)",
                            borderRadius: "7px",
                          }}
                        />
                        <Box>{legend.label}</Box>
                      </HStack>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Box>
            <Textarea
              value={selectedNote}
              onChange={handleNoteChange}
              placeholder="What happened?"
            />
          </VStack>
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
