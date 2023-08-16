import React from "react";
import { Avatar, Flex, Text, Badge, useColorModeValue } from "@chakra-ui/react";
import { GET_USER } from "utils/queries";
import { useQuery } from "@apollo/client";
import Badge1 from "assets/img/badge/1.webp";
import Badge2 from "assets/img/badge/2.webp";
import Badge3 from "assets/img/badge/3.webp";
import Badge4 from "assets/img/badge/4.webp";
import Badge5 from "assets/img/badge/5.webp";
import Badge6 from "assets/img/badge/6.webp";
import Badge7 from "assets/img/badge/7.webp";

export default function Friend({ friend }) {
  const { data, loading } = useQuery(GET_USER, {
    variables: { username: friend.username },
  });

  // Function to determine which badge to display based on the total number of entries
  function renderBadgeImage(data) {
    if (!data) return null;

    const totalEntries = data.user.journals.reduce(
      (sum, journal) => sum + journal.entries.length,
      0
    );

    if (totalEntries >= 365) {
      return <img src={Badge7} alt="Badge7" width="15px" />;
    } else if (totalEntries >= 182) {
      return <img src={Badge6} alt="Badge6" width="15px" />;
    } else if (totalEntries >= 100) {
      return <img src={Badge5} alt="Badge5" width="45px" />;
    } else if (totalEntries >= 50) {
      return <img src={Badge4} alt="Badge4" width="45px" />;
    } else if (totalEntries >= 25) {
      return <img src={Badge3} alt="Badge3" width="45px" />;
    } else if (totalEntries >= 10) {
      return <img src={Badge2} alt="Badge2" width="45px" />;
    } else if (totalEntries >= 1) {
      return <img src={Badge1} alt="Badge1" width="45px" />;
    } else {
      return "No Badge";
    }
  }

  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Flex justifyContent="center" alignItems="center" w="100%">
      <Avatar h="34px" w="34px" src={friend.avatar} me="14px" />
      <Flex direction="column" align="start" me="auto">
        <Text color={textColor} fontSize="md" me="6px" fontWeight="700">
          {friend.username}
        </Text>
      </Flex>
      <Badge ms="auto" colorScheme={friend.badgeColor} fontSize="sm">
        {renderBadgeImage(data)}
      </Badge>
    </Flex>
  );
}
