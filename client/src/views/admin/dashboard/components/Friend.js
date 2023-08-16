import React from "react";
import { Avatar, Flex, Text, Badge, useColorModeValue } from "@chakra-ui/react";
import { GET_USER } from "utils/queries";
import { useQuery } from "@apollo/client";

export default function Friend({ friend }) {
  const {data, loading} = useQuery(GET_USER, {
    variables: { username: friend.username },
  });

  console.log(data);

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
        {friend.badge}
      </Badge>
    </Flex>
  );
}