import {
  // Avatar,
  Box,
  // Flex,
  // FormLabel,
  // Icon,
  // Select,
  Grid,
  // useColorModeValue,
} from "@chakra-ui/react";

import React, { useState, useEffect } from "react";
// import { useQuery } from "@apollo/client";
// import { GET_ME } from "../../utils/queries";
import PieChart from "views/admin/dashboard/components/PieChart";
import Profile from "views/admin/dashboard/components/Profile";
import Journals from "views/admin/dashboard/components/Journals";
import ColumnsTable from "views/admin/dashboard/components/ColumnsTable";

import profile from "assets/img/purple.jpg";
import avatar from "assets/img/purple.jpg";



export default function Overview() {
  // TODO: use this to pass entries and journals count
    // const { data } = useQuery(GET_ME);
    // const [entriesCount, setEntriesCount] = useState(0);
    // const [journalsCount, setJournalsCount] = useState(0);
    // useEffect(() => {
    //   // Retrieve the number of entries and journals from the user's data
    //   if(data?.me) {
    //     setEntriesCount(data.me.entries.length);
    //     setJournalsCount(data.me.journals.length);
    //   }
    // }, [data]);
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 1fr 1.62fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>

        <Profile
          banner={profile}
          avatar={avatar}
          name="John Doe" //TODO: insert {userData.username} here
          entries="3" //TODO: insert {entriesCount.toString()} here
          journals="2" //TODO: insert {journalsCount.toString()} here
        />

        <PieChart
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
        />

        <ColumnsTable
          gridArea={{ base: "3 / 1 / 4 / 2", lg: "1 / 3 / 2 / 4" }}
        />

      </Grid>
      <Grid
        mb='20px'
        templateColumns={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1.34fr 1.62fr 1fr",
        }}
        templateRows={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        <Journals
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          minH='365px'
          pe='20px'
        />
      </Grid>
    </Box>
  );
}


