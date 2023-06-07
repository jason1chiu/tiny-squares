import React from "react";
import { useQuery } from "@apollo/client";
import { Box, useDisclosure } from "@chakra-ui/react";
import CellModal from "components/shared/calendar/components/modal/modal";
import { GET_LEGENDS, GET_ME } from "utils/queries";

const Cell = ({ day, month, color, note, onSave, legends, journalId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const legendsQuery = useQuery(GET_LEGENDS, {
    variables: { id: journalId },
  });

  const handleCellClick = () => {
    onOpen();
  };

  const handleSave = (legend, note) => {
    onSave(legend, note);
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
      <CellModal
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleSave}
        initialColor={color}
        initialNote={note}
        legends={legendsQuery.data ? legendsQuery.data.legends : []}
      />
    </>
  );
};

export default Cell;
