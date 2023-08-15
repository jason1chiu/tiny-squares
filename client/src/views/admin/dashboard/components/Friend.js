import React from "react";
import { Avatar, Flex, Text, Badge, useColorModeValue } from "@chakra-ui/react";

export default function Friend({ friend }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Flex justifyContent="center" alignItems="center" w="100%">
      <Avatar h="34px" w="34px" src={friend.avatar} me="14px" />
      <Flex direction="column" align="start" me="auto">
        <Text color={textColor} fontSize="md" me="6px" fontWeight="700">
          {friend.name}
        </Text>
      </Flex>
      <Badge ms="auto" colorScheme={friend.badgeColor} fontSize="sm">
        {friend.badge}
      </Badge>
    </Flex>
  );
}