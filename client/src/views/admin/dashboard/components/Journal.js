import {
  Box,
  Flex,
  Image,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion"; // <-- import here
import PreviewModal from "views/admin/journals/components/PreviewModal";
import React from "react";

const MotionBox = motion(Box); // <-- define here

export default function Journal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { title, ranking, link, image, journal, ...rest } = props;

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const bg = useColorModeValue("white", "navy.700");

  return (
    <>
      <MotionBox
        bg={bg}
        {...rest}
        p="14px"
        borderRadius="7px"
        onClick={onOpen}
        cursor="pointer"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 500 }}
      >
        <Flex align="center" direction={{ base: "column", md: "row" }}>
          <Image
            h="80px"
            w="80px"
            src={image}
            borderRadius="8px"
            me="20px"
            objectFit="cover"
          />
          <Box mt={{ base: "10px", md: "0" }}>
            <Text
              color={textColorPrimary}
              fontWeight="500"
              fontSize="md"
              mb="4px"
            >
              {title}
            </Text>
            <Text
              fontWeight="500"
              color={textColorSecondary}
              fontSize="sm"
              me="4px"
            >
              Journal # {ranking}
            </Text>
          </Box>
        </Flex>
      </MotionBox>
      <PreviewModal isOpen={isOpen} onClose={onClose} journal={journal} />
    </>
  );
}
