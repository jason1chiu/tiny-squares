import React, { useState } from "react";

import { Flex, Link, Text, Button } from "@chakra-ui/react";
import FindFriendModal from "views/admin/friends/components/FindFriendModal";

import banner from "assets/img/banner7.png";
const purpleColor = "purple.500";
export default function Banner() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFriendAdded = (addedFriend) => {
    console.log("Successfully added:", addedFriend);
    // Any additional logic you want after adding a friend can go here.
    closeModal(); // This will close the modal after adding a friend.
  };

  return (
    <Flex
      direction="column"
      bgImage={banner}
      bgSize="cover"
      py={{ base: "30px", md: "56px" }}
      px={{ base: "30px", md: "64px" }}
      borderRadius="30px"
    >
      <Text
        fontSize={{ base: "24px", md: "34px" }}
        color="white"
        mb="14px"
        maxW={{
          base: "100%",
          md: "64%",
          lg: "46%",
          xl: "70%",
          "2xl": "50%",
          "3xl": "42%",
        }}
        fontWeight="700"
        lineHeight={{ base: "32px", md: "42px" }}
      >
        Your Friends
      </Text>
      <Text
        fontSize="md"
        color="#E3DAFF"
        maxW={{
          base: "100%",
          md: "64%",
          lg: "40%",
          xl: "56%",
          "2xl": "46%",
          "3xl": "34%",
        }}
        fontWeight="500"
        mb="40px"
        lineHeight="28px"
      >
        Connect with go getters like you
      </Text>
      <Button
        w="20%"
        variant="brand"
        color="white"
        fontSize="sm"
        fontWeight="500"
        borderRadius="70px"
        onClick={openModal}
        background={purpleColor}
      >
        Find Friends
      </Button>
      <FindFriendModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleFriendAdded} />
    </Flex>
  );
}
