import React from "react";
import {
  Avatar,
  Box,
  Flex,
  Text,
  useColorModeValue,
  IconButton,
  useDisclosure,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi"; // Edit icon
import Card from "components/card/card.js";
import { useAuth } from "contexts/auth.context";
import EditProfileModal from "components/modal/EditProfileModal";
import Badge1 from "assets/img/badge/1.webp";
import Badge2 from "assets/img/badge/2.webp";
import Badge3 from "assets/img/badge/3.webp";
import Badge4 from "assets/img/badge/4.webp";
import Badge5 from "assets/img/badge/5.webp";
import Badge6 from "assets/img/badge/6.webp";
import Badge7 from "assets/img/badge/7.webp";
import premiumBadge from "assets/img/badge/premium.png";
export default function Profile(props) {
  const { avatar, name, cover, entries, journals, friends } = props;
  let { user, setUser } = useAuth();

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getBadge = (entries) => {
    let badge, tooltipText;
    if (entries >= 365) {
      badge = <img src={Badge7} alt="Badge7" width="15px" />;
      tooltipText = "One Year";
    } else if (entries >= 182) {
      badge = <img src={Badge6} alt="Badge6" width="15px" />;
      tooltipText = "Half a Year";
    } else if (entries >= 100) {
      badge = <img src={Badge5} alt="Badge5" width="45px" />;
      tooltipText = "100 Entries";
    } else if (entries >= 50) {
      badge = <img src={Badge4} alt="Badge4" width="45px" />;
      tooltipText = "50 Entries";
    } else if (entries >= 25) {
      badge = <img src={Badge3} alt="Badge3" width="45px" />;
      tooltipText = "25 Entries";
    } else if (entries >= 10) {
      badge = <img src={Badge2} alt="Badge2" width="45px" />;
      tooltipText = "10 Entries";
    } else if (entries >= 1) {
      badge = <img src={Badge1} alt="Badge1" width="45px" />;
      tooltipText = "1 Entry";
    }
    if (!badge) {
      badge = <span></span>;
      tooltipText = "No Badge";
    }

    return { badge, tooltipText };
  };

  const { badge, tooltipText } = getBadge(entries);

  return (
    <>
      <Card mb={{ base: "0px", lg: "20px" }} align="center">
        <Box
          bgImage={`url(${cover})`}
          bgSize="cover"
          borderRadius="16px"
          h="131px"
          w="100%"
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
        </Box>
        <Stack
          direction="row"
          spacing={4}
          align="center"
          justifyContent="center"
          role="group"
          mt="-43px"
          mb="10px"
          position="relative"
        >
          <Flex // New Flex container
            position="relative"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              h="90px"
              w="90px"
              border="4px solid"
              borderColor={borderColor}
              src={user && user.user ? avatar : "Default Name"}
            />
            {user && user.user && user.user.isPremium ? (
              <img 
                src={premiumBadge}
                alt="Premium Badge"
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px", // Adjust this value to position the badge
                  width: "20px",
                  height: "20px",
                  zIndex: "100",
                }}
              />
            ) : null}
          </Flex>
          <Box
            position="absolute"
            right="20px"
            top="15px"
            opacity={0}
            _groupHover={{ opacity: 1 }} // Show on hover
            onClick={onOpen}
          ></Box>
        </Stack>
        <Tooltip label={tooltipText} aria-label={tooltipText}>
          <Text id="badge-step"
            color={textColorPrimary}
            fontWeight="bold"
            fontSize="xl"
            mt="10px"
          >
            {name}
            {badge}
          </Text>
        </Tooltip>

        <Flex
          w="max-content"
          mx="auto"
          mt="26px"
          justify="center"
          align="center"
        >
          
          <Flex mx="30%" align="center" direction="column">
            <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
              {entries}
            </Text>
            <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
              Entries
            </Text>
          </Flex>

          <Flex mx="30%" align="center" direction="column">
            <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
              {journals}
            </Text>
            <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
              Journals
            </Text>
          </Flex>

          <Flex mx="30%" align="center" direction="column">
            <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
              {friends}
            </Text>
            <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
              Friends
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
