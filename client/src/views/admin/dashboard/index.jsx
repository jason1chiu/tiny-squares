import { Box, Grid } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import PieChart from "views/admin/dashboard/components/PieChart";
import Profile from "views/admin/dashboard/components/Profile";
import Journals from "views/admin/dashboard/components/Journals";
import ColumnsTable from "views/admin/dashboard/components/ColumnsTable";

import profile from "assets/img/bannercover.png";
import avatar from "assets/img/bannercover.png";
import { useAuth } from "contexts/auth.context";
import { GET_JOURNALS } from "utils/queries";
import { useQuery } from "@apollo/client";

export default function Overview() {
  let { user } = useAuth();
  const { data } = useQuery(GET_JOURNALS, {fetchPolicy: "network-only"});

  let [selectedJournal, setSelectedJournal] = useState(null);

  const entries = (data?.journals ?? []).reduce(
    (sum, journal) => sum + (journal.entries?.length || 0),
    0
  );

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
        gap={{ base: "20px", xl: "20px" }}
      >
        {data?.journals && (
          <Profile
            banner={profile}
            avatar={avatar}
            name={user.user.username}
            entries={entries}
            journals={data?.journals?.length}
          />
        )}
        <PieChart selectedJournal={selectedJournal} setSelectedJournal={setSelectedJournal} journalsData={data} gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }} />
        {data &&
          <ColumnsTable journalsData={[...data.journals]}
            gridArea={{ base: "3 / 1 / 4 / 2", lg: "1 / 3 / 2 / 4" }}
          />
        }
      </Grid>
      <Grid
        mb="20px"
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
        gap={{ base: "20px", xl: "20px" }}
      >
        <Journals
          gridArea={{ base: "3 / 1 / 4 / 2", lg: "1 / 3 / 2 / 4" }}
          minH="365px"
          pe="20px"
        />
      </Grid>
    </Box>
  );
}
