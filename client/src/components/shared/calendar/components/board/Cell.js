import React from "react";
import { useQuery } from "@apollo/client";
import { Box, useDisclosure } from "@chakra-ui/react";
import CellModal from "components/shared/calendar/components/modal/modal";
import { GET_LEGENDS } from "utils/queries";

const Cell = ({ journalEntriesMap, day, month, onSave, journalId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const legendsQuery = useQuery(GET_LEGENDS, {
    variables: { id: journalId },
  });

  const handleCellClick = () => {
    onOpen();
  };

  const currentDate = new Date(2023, month, day);

  const handleSave = (legend, note) => {
    onSave(legend, note, currentDate);
    onClose();
  };

  const currentCellValue = journalEntriesMap[currentDate.getTime()];

  return (
    <>
      <Box
        bg={currentCellValue?.legend?.color}
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
        initialColor={currentCellValue?.legend?.color}
        initialNote={currentCellValue?.note}
        legends={legendsQuery?.data?.legends ?? []}
      />
    </>
  );
};

export default Cell;
