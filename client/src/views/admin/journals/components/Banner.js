import React, { useState } from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import NewJournalModal from "views/admin/journals/components/NewJournalModal";
import banner from "assets/img/banner7.png";
import { ADD_JOURNAL } from "utils/mutations";
import { useMutation } from "@apollo/client";
import { GET_JOURNALS, GET_ME, GET_JOURNAL } from "utils/queries";

export default function Banner() {
  let [addJournal] = useMutation(ADD_JOURNAL, {
    refetchQueries: [GET_JOURNALS, GET_JOURNAL, GET_ME],
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const purpleColor = "purple.500";
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddJournal = async (journal) => {
    try {
      await addJournal({ variables: journal });

      closeModal();
    } catch (error) {
      console.error("Error creating journal: ", error);
    }
  };
  return (
    <Flex
      direction='column'
      bgImage={banner}
      bgSize='cover'
      py={{ base: "30px", md: "56px" }}
      px={{ base: "30px", md: "64px" }}
      borderRadius='30px'>
      <Text
        fontSize={{ base: "24px", md: "34px" }}
        color='white'
        mb='14px'
        maxW={{
          base: "100%",
          md: "64%",
          lg: "46%",
          xl: "70%",
          "2xl": "50%",
          "3xl": "42%",
        }}
        fontWeight='700'
        lineHeight={{ base: "32px", md: "42px" }}>
        A Year in Pixels
      </Text>
      <Text
        fontSize='md'
        color='#E3DAFF'
        maxW={{
          base: "100%",
          md: "64%",
          lg: "40%",
          xl: "56%",
          "2xl": "46%",
          "3xl": "34%",
        }}
        fontWeight='500'
        mb='40px'
        lineHeight='28px'>
        Track your moods, habits, and goals. 
      </Text>
      <Button
        w="40%"
        variant="brand"
        color="white"
        fontSize="sm"
        fontWeight="500"
        borderRadius="70px"
        onClick={openModal}
        background={purpleColor}
      >
        Create Journal
      </Button>
      <NewJournalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAddJournal}
      />
    </Flex>
  );
}