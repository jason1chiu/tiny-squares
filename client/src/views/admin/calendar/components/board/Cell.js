import React from "react";
import { Box, useDisclosure, Text } from "@chakra-ui/react";
import CellModal from "views/admin/calendar/components/modal/modal";

const Cell = ({ day, month, color, note, onSave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCellClick = () => {
    onOpen();
  };

  return (
    <>
      <Box
        bg={color}
        h="100%"
        w="100%"
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="md"
        cursor="pointer"
        onClick={handleCellClick}
      >
        <Text textAlign="center" fontSize="sm">{`${day}/${month}`}</Text>
      </Box>

      <CellModal 
        isOpen={isOpen} 
        onClose={onClose} 
        color={color} 
        note={note} 
        onSave={onSave} 
      />
    </>
  );
};

export default Cell;