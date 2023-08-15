import React from "react";
import { Text, useColorModeValue, Tooltip, Link } from "@chakra-ui/react";
import Card from "components/card/card.js";
import Friend from "views/admin/dashboard/components/Friend.js"; 

export default function Friends({ friends }) {
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const secondaryTextColor = useColorModeValue("secondaryGray.300", "secondaryGray.600");
  
    // Replace with the actual link to the Friends tab when you have it
    const friendsTabLink = "/path/to/friends/tab";
  
    return (
      <Card mb={{ base: "0px", lg: "20px" }} align="center">
        <Tooltip label="View all" fontSize="md">
          <Link
            href={friendsTabLink} // Set the link here
            color={textColorPrimary}
            fontWeight="bold"
            fontSize="2xl"
            mt="10px"
            mb="4px"
            _hover={{ color: "gray.500" }}
          >
            Friends
          </Link>
        </Tooltip>
        {friends && friends.length > 0 ? (
          friends.map((friend, index) => (
            <Friend friend={friend} key={index} />
          ))
        ) : (
          <Text color={secondaryTextColor} fontSize="md" fontWeight="500" textAlign="center">
            You have no friends
          </Text>
        )}
      </Card>
    );
  }