import React, { useState, useEffect } from "react";
import { Box, Center, useColorModeValue } from "@chakra-ui/react";
import { MdAddCircle } from "react-icons/md";
import Card from "components/card/card";

import { useMutation } from "@apollo/client";

import { GET_ME } from "utils/queries";

import { useAuth } from "contexts/auth.context";
import { useQuery } from "@apollo/client";

import FindFriendModal from "views/admin/friends/components/FindFriendModal";

export default function NewFriendCard() {
  let { user } = useAuth();

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

      <FindFriendModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={() => console.log("click")}
      />
    </Card>
  );
}
