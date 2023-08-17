import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import Card from "components/card/card";
import Badge1 from "assets/img/badge/1.webp";
import Badge2 from "assets/img/badge/2.webp";
import Badge3 from "assets/img/badge/3.webp";
import Badge4 from "assets/img/badge/4.webp";
import Badge5 from "assets/img/badge/5.webp";
import Badge6 from "assets/img/badge/6.webp";
import Badge7 from "assets/img/badge/7.webp";
import { useQuery } from "@apollo/client";
import { GET_USER } from "utils/queries";

export default function FriendTable({ friends }) {
  function FriendTableRow({ friend }) {
    const { data, loading, error } = useQuery(GET_USER, {
      variables: { username: friend.username },
    });
    console.log(data);

    if (loading)
      return (
        <Tr>
          <Td colSpan={4}>Loading...</Td>
        </Tr>
      );
    if (error)
      return (
        <Tr>
          <Td colSpan={4}>Error fetching data for {friend.username}</Td>
        </Tr>
      );

    const totalEntries = data.user.journals.reduce(
      (sum, journal) => sum + journal.entries.length,
      0
    );

    return (
      <Tr>
        <Td>{data.user.username}</Td>
        <Td>{renderBadgeImage(totalEntries)}</Td>
        <Td>{data.user.journals.length}</Td>
        <Td>{totalEntries}</Td>
      </Tr>
    );
  }
  // Function to determine which badge to display based on the total number of entries
  function renderBadgeImage(totalEntries) {
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

  return (
    <Card
      p={{ base: "10px", md: "20px", xl: "30px" }}
      boxShadow="lg"
      borderRadius="20px"
    >
      <Box overflowX="auto">
        <Table variant="simple" size="md" colorScheme="purple">
          <Thead>
            <Tr>
              <Th color="secondaryGray.500">Username</Th>
              <Th color="secondaryGray.500">Badge</Th>
              <Th color="secondaryGray.500">Journals</Th>
              <Th color="secondaryGray.500">Entries</Th>
            </Tr>
          </Thead>
          <Tbody>
            {friends.map((friend) => (
              <FriendTableRow key={friend.username} friend={friend} />
            ))}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}
