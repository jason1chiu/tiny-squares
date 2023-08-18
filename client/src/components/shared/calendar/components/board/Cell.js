import React from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import CellModal from "components/shared/calendar/components/modal/modal";

const MotionBox = motion(Box);

const Cell = ({ journalEntriesMap, day, month, onSave, legends }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCellClick = () => {
    onOpen();
  };

  const currentDate = new Date(2023, month, day);

  const handleSave = (legend, note) => {
    onSave(legend, note, currentDate);
    onClose();
  };

  const currentCellValue =
    currentDate.getMonth() === month
      ? journalEntriesMap[currentDate.getTime()]
      : null;

  const cellColor = currentCellValue?.legend?.color || "rgba(255,255,255,0.1)";

  return (
    <>
      <MotionBox
        h="100%"
        w="100%"
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="md"
        cursor="pointer"
        onClick={handleCellClick}
        whileHover={{ scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 500 }}
        style={{
          backgroundImage: `
          linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%), linear-gradient(225deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%),
            linear-gradient(${cellColor}, ${cellColor})`,
          backgroundSize: "100% 100%, 100% 100%, auto",
          backgroundPosition: "0",
          backdropFilter: "blur(10px)",
          boxShadow: "10px 10px 15px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      ></MotionBox>
      <CellModal
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleSave}
        initialColor={currentCellValue?.legend?.color}
        initialNote={currentCellValue?.note}
        legends={legends} // Use the legends prop
      />
    </>
  );
};

export default Cell;