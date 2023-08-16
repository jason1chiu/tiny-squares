import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
  Link,
  IconButton,
} from "@chakra-ui/react";
import { MdHelpOutline } from "react-icons/md";
import Joyride, { CallBackProps, STATUS } from "react-joyride";
import FriendTable from "views/admin/friends/components/FriendTable";
import Banner from "views/admin/friends/components/Banner";

import P2 from "assets/img/jp.png";
import { useQuery } from "@apollo/client";

// import NewFriendCard from "views/admin/friends/components/NewFriendCard";
// import { tutorialStyles } from "theme/components/tutorial";

export default function FriendPage() {
  const textColor = useColorModeValue("secondaryGray.500", "white");
  const titleColor = useColorModeValue("brand.700", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");

  const [runTutorial, setRunTutorial] = useState(false);
  const navbarIcon = useColorModeValue("gray.400", "white");

  const tutorialSteps = [
    {
      target: "#new-card-step",
      content: "Create a new journal by clicking the + button",
    },
    {
      target: "#journal-card-step",
      content:
        "Your Journals will appear here. Click the view button to update your journal.",
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRunTutorial(false);
    }
  };
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        >
          <Banner />

          <Flex direction="column">
            <Flex
              // mt="45px"
              mb="20px"
              justifyContent="space-between"
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}
            ></Flex>
            <Flex
              mt="45px"
              mb="20px"
              justifyContent="space-between"
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}
            >
              <Text
                color={titleColor}
                fontSize="2xl"
                ms="24px"
                fontWeight="700"
              >
                Your Friends
              </Text>
            </Flex>
            <FriendTable />
          </Flex>
        </Flex>
      </Grid>
    </Box>
  );
}
