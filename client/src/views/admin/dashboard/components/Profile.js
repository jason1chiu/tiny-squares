import {
  Avatar,
  Box,
  Flex,
  Text,
  useColorModeValue,
  IconButton,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi"; // Edit icon
import Card from "components/card/card.js";
import React from "react";
import { useAuth } from "contexts/auth.context";
import { useEffect, useState } from "react";
import bImage from "assets/img/rand/b.jpg";
import cImage from "assets/img/rand/c.jpg";
import dImage from "assets/img/rand/d.jpg";
import eImage from "assets/img/rand/e.jpg";
import { motion } from "framer-motion";
import EditProfileModal from "components/modal/EditProfileModal";

const images = [bImage, cImage, dImage, eImage];

function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

const MotionBox = motion(Box);

export default function Profile(props) {
  const { banner, avatar, name, entries, journals } = props;
  let { user, setUser } = useAuth();
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [bgImage, setBgImage] = useState(getRandomImage());

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImage(getRandomImage());
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Card mb={{ base: "0px", lg: "20px" }} align="center">
        <MotionBox
          bgImage={`url(${bgImage})`}
          bgSize="cover"
          borderRadius="16px"
          h="131px"
          w="100%"
          key={bgImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // exit={{ opacity: .2 }}
          transition={{ duration: 1 }}
          position="relative"
          _hover={{ cursor: "pointer" }}
          onClick={onOpen}
        >
          <Box
            position="absolute"
            right="5px"
            top="5px"
            _groupHover={{ opacity: 1 }} // Show on hover
            onClick={onOpen}
          ></Box>
        </MotionBox>
        <Stack
          direction="row"
          spacing={4}
          align="center"
          justifyContent="center"
          role="group" // Create a group to control hover state for children
          mt="-43px"
          mb="10px"
        >
          <Avatar
            h="87px"
            w="87px"
            border="4px solid"
            borderColor={borderColor}
            name={user && user.user ? user.user.username : "Default Name"}
          />
          <Box
            position="absolute"
            right="20px"
            top="15px"
            opacity={0}
            _groupHover={{ opacity: 1 }} // Show on hover
            onClick={onOpen}
          >
            <IconButton
              icon={<FiEdit />}
              color="white"
              size="md"
              aria-label="Edit"
              bgColor="transparent"
              bg="transparent"
              _hover={{ bg: "transparent" }}
            />
          </Box>
        </Stack>
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="xl"
          mt="10px"
        >
          {name}
        </Text>
        <Flex w="max-content" mx="auto" mt="26px">
          <Flex mx="auto" me="60px" align="center" direction="column">
            <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
              {entries}
            </Text>
            <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
              Entries
            </Text>
          </Flex>
          <Flex mx="auto" me="60px" align="center" direction="column">
            <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
              {journals}
            </Text>
            <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
              Journals
            </Text>
          </Flex>
        </Flex>
      </Card>
      <EditProfileModal
        isOpen={isOpen}
        onClose={onClose}
        currentUsername={user && user.user ? user.user.username : ""}
      />
    </>
  );
}
