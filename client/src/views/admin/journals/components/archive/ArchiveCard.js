import React, { useState, useEffect } from "react";
import { Box, Center, useColorModeValue } from "@chakra-ui/react";
import { FaArchive } from "react-icons/fa";
import Card from "components/card/card";
import ArchiveModal from "views/admin/journals/components/archive/ArchiveModal";
import { useMutation } from "@apollo/client";
// import { ARCHIVE_JOURNAL } from "utils/mutations";
import { GET_JOURNALS, GET_ME } from "utils/queries";

import { useAuth } from "contexts/auth.context";
import { useQuery } from "@apollo/client";

export default function Archive() {
    // let [archiveJournal, { error }] = useMutation(ARCHIVE_JOURNAL); 
    const [isModalOpen, setModalOpen] = useState(false);
    const [hover, setHover] = useState(false);
  const iconColor = useColorModeValue("purple.500", "purple.500");
  const iconHoverColor = useColorModeValue("brand.500", "white");

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

//   const handleArchiveJournal = async (journal) => {
//     try {
//       await archiveJournal({ variables: journal }); // Adjust as needed to archive
//       // Refetch or update data as needed here
//       closeModal();
//     } catch (error) {
//       console.error("Error archiving journal: ", error);
//     }
//   };

  return (
    <Card
      p="20px"
      _hover={{
        boxShadow: "lg",
      }}
      onClick={() => {
          openModal(); // Call the openModal function
      }} 
      id="archive-card-step" 
    >

<Box
        h="200px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="md"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        cursor="pointer"
        transition="color 0.2s"
        color={hover ? iconHoverColor : iconColor}
      >
        <Center>
          <FaArchive size="150px" /> {/* Archive icon */}
        </Center>
      </Box> 
      <ArchiveModal
        isOpen={isModalOpen}
        onClose={closeModal}
        // onSubmit={handleArchiveJournal}
      />
    </Card>
  );
}    