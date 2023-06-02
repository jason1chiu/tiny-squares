import React from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import CellModal from "views/admin/calendar/components/modal/modal";

const Cell = ({ day, month, color, note, onSave, legends }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCellClick = () => {
    onOpen();
  };

  const handleSave = (color, note) => {
    onSave(color, note);
    onClose();
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
      ></Box>
      <CellModal isOpen={isOpen} onClose={onClose} onSave={handleSave} legends={legends} />
    </>
  );
};

export default Cell;