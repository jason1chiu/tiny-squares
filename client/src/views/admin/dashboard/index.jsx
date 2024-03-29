import { Box, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PieChart from "views/admin/dashboard/components/PieChart";
import Profile from "views/admin/dashboard/components/Profile";
import Journals from "views/admin/dashboard/components/Journals";
import ColumnsTable from "views/admin/dashboard/components/ColumnsTable";
import { useAuth } from "contexts/auth.context";
import { GET_JOURNALS, GET_ME } from "utils/queries";
import { useQuery } from "@apollo/client";
import Joyride, { STATUS } from "react-joyride";
import { tutorialStyles } from "theme/components/tutorial";
import Friends from "views/admin/dashboard/components/Friends";

export default function Overview() {
  let { user } = useAuth();
  
  const { loading, data, refetch } = useQuery(GET_JOURNALS);

  const { loading: userLoading, data: userData } = useQuery(GET_ME);
  console.log(userData);

  const [runTutorial, setRunTutorial] = useState(false);

  const tutorialSteps = [
    {
      target: "#new-card-step",
      content: "Create a new journal by clicking the + button",
    },
    {
      target: "#journal-card-step",
      content:
        "Journals that have not yet been updated today will display in the journals section. Click on a journal to update it.",
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRunTutorial(false);
    }
  };

  let [selectedJournal, setSelectedJournal] = useState(null);

  const entries = (data?.journals ?? []).reduce(
    (sum, journal) => sum + (journal.entries?.length || 0),
    0
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} mt="20px">
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        run={runTutorial}
        steps={tutorialSteps}
        styles={tutorialStyles}
      />
      <SimpleGrid columns={{ base: 1, md: 3, xl: 3 }} gap="20px" mb="20px">
        {data?.journals && (
          <Profile
            cover={userData.me.cover}
            avatar={userData.me.avatar}
            name={user.user.username}
            entries={entries}
            journals={data?.journals?.length}
            friends={userData?.me.friends.length}
            minH="365px"
          />
        )}
        <Friends friends={[...userData.me.friends]} />
        <Journals journalsData={[...data.journals]} />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <PieChart
          selectedJournal={selectedJournal}
          setSelectedJournal={setSelectedJournal}
          journalsData={data}
        />
        {data && <ColumnsTable journalsData={[...data.journals]} />}
      </SimpleGrid>
    </Box>
  );
}
