import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from "@chakra-ui/react";
import Card from "components/card/card";

const FriendTable = ({ friends }) => {
    return (
        <Card
          p={{ base: "10px", md: "20px", xl: "30px" }}
          boxShadow="lg"
          borderRadius="20px"
        >
            <Box overflowX="auto">
        <Table variant="simple" size="md" colorScheme="purple">
          <Thead>
            <Tr >
              <Th color="secondaryGray.500">Username</Th>
              <Th color="secondaryGray.500">Badge</Th>
              <Th color="secondaryGray.500">Journals</Th>
              <Th color="secondaryGray.500">Entries</Th>
            </Tr>
            </Thead>
          <Tbody>
            {/* {friends.map((friend, index) => (
              <Tr key={index}>
                <Td>{friend.username}</Td>
                <Td>{friend.badge}</Td>
                <Td>{friend.journals}</Td>
                <Td>{friend.entries}</Td>
              </Tr>
            ))} */}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
};

export default FriendTable;