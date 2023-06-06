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

import React, { useEffect } from "react";
import PieChart from "views/admin/dashboard/components/PieChart";
import Profile from "views/admin/dashboard/components/Profile";
import Journals from "views/admin/dashboard/components/Journals";
import ColumnsTable from "views/admin/dashboard/components/ColumnsTable";

import profile from "assets/img/purple.jpg";
import avatar from "assets/img/purple.jpg";
import { useAuth } from "contexts/auth.context";
import { GET_ME } from "utils/queries";
import { useLazyQuery } from "@apollo/client";

export default function Overview() {
  let { user, journals, setJournals } = useAuth();
  let [me, { data, loading, error }] = useLazyQuery(GET_ME);

  useEffect(() => {
    if (user && user.token) { // ensure user and token exist before calling me()
      me({ variables: { token: user.token } })
        .then(response => {
          if (response && response.data && response.data.me) {
            setJournals(response.data.me.journals);
          }
        })
        .catch(err => console.error(err));
    }
  }, [user, me, setJournals]);
  
  const entries =
    journals && journals.length
      ? journals.reduce((sum, journal) => sum + (journal.entries?.length || 0), 0)
      : 0;

  const journalsLength = journals ? journals.length : 0;

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
        {journals &&
          <Profile
          banner={profile}
          avatar={avatar}
          name={user && user.user ? user.user.username : 'Default Name'}
          entries={entries}
          journals={journalsLength}
        />
        }
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
          gridArea={{ base: "3 / 1 / 4 / 2", lg: "1 / 3 / 2 / 4" }}
          minH='365px'
          pe='20px'
        />
      </Grid>

    </Box>
  );
}