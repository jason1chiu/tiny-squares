import React, { useState } from "react";
import { Box, Center, useColorModeValue } from "@chakra-ui/react";
import { MdAddCircle } from "react-icons/md";
import Card from "components/card/card";
import NewJournalModal from "views/admin/journals/components/NewJournalModal";
import { useMutation } from "@apollo/client";
import { ADD_JOURNAL } from "utils/mutations";
import { GET_JOURNALS } from "utils/queries";

import { useAuth } from "contexts/auth.context";
import { useQuery } from "@apollo/client";

export default function NewCard() {
  let [addJournal, { error }] = useMutation(ADD_JOURNAL);
  let { user } = useAuth();
  const { data, refetch } = useQuery(GET_JOURNALS);

  const [isModalOpen, setModalOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const iconColor = useColorModeValue("secondaryGray.600", "secondaryGray.600");
  const iconHoverColor = useColorModeValue("brand.500", "white");

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddJournal = async (journal) => {
    try {
      await addJournal({ variables: journal });
      refetch();
      closeModal();
    } catch (error) {
      console.error("Error creating journal: ", error);
    }
  };

  return (
    <Card
      p="20px"
      _hover={{
        boxShadow: "lg",
      }}
      onClick={openModal} // Open the modal when the card is clicked
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
          <MdAddCircle size="150px" />
        </Center>
      </Box>
      <NewJournalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAddJournal}
      />
    </Card>
  );
}