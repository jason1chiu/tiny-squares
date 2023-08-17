import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Joyride, { CallBackProps, STATUS } from "react-joyride";
import FriendTable from "views/admin/friends/components/FriendTable";
import Banner from "views/admin/friends/components/Banner";
import { GET_ME } from "utils/queries";
import { useQuery } from "@apollo/client";

export default function FriendPage() {

  const{ loading, data, refetch } = useQuery(GET_ME);

  const titleColor = useColorModeValue("brand.700", "white");

  if (loading) {
    return <div>Loading...</div>;
  }

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
            <FriendTable friends={[...data.me.friends]}/>
          </Flex>
        </Flex>
      </Grid>
    </Box>
  );
}
