import { Box, Grid, SimpleGrid } from "@chakra-ui/react";

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
  const { data } = useQuery(GET_JOURNALS, { fetchPolicy: "network-only" });

  let [selectedJournal, setSelectedJournal] = useState(null);

  const entries = (data?.journals ?? []).reduce(
    (sum, journal) => sum + (journal.entries?.length || 0),
    0
  );

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        {data?.journals && (
          <Profile
            banner={profile}
            avatar={avatar}
            name={user.user.username}
            entries={entries}
            journals={data?.journals?.length}
            minH="365px"
          />
        )}
        <PieChart
          selectedJournal={selectedJournal}
          setSelectedJournal={setSelectedJournal}
          journalsData={data}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        {data && <ColumnsTable journalsData={[...data.journals]} />}
        <Journals />
      </SimpleGrid>
    </Box>
  );
}
