import React, { useState, useEffect } from "react";
import { Box, Center, useColorModeValue } from "@chakra-ui/react";
import { MdAddCircle } from "react-icons/md";
import Card from "components/card/card";
import NewJournalModal from "views/admin/journals/components/NewJournalModal";
import { useMutation } from "@apollo/client";
import { ADD_JOURNAL } from "utils/mutations";
import { GET_JOURNALS, GET_ME, GET_JOURNAL } from "utils/queries";

import { useAuth } from "contexts/auth.context";
import { useQuery } from "@apollo/client";

export default function NewCard() {
  let [addJournal] = useMutation(ADD_JOURNAL, {
    refetchQueries: [GET_JOURNALS, GET_JOURNAL, GET_ME],
  });

  const [journalLimitReached, setJournalLimitReached] = useState(false);

  let { user } = useAuth();
  const { data, refetch } = useQuery(GET_JOURNALS);
  const { data: meData, refetch: meRefetch } = useQuery(GET_ME); 

  const [isModalOpen, setModalOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const iconColor = useColorModeValue("purple.500", "purple.500");
  const iconHoverColor = useColorModeValue("brand.500", "white");

    // Update journal limit state based on user's journal count
    useEffect(() => {
      if (meData && meData.me && meData.me.journals.length >= 3) {
        setJournalLimitReached(true);
      } else {
        setJournalLimitReached(false);
      }
    }, [meData]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddJournal = async (journal) => {
    try {
      await addJournal({ variables: journal });
      refetch(); // refetch journal data
      meRefetch(); // refetch user data to prevent additional journals unless premium
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
      onClick={() => {
          openModal(); // Call the openModal function
      }} 
      id="new-card-step" 
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