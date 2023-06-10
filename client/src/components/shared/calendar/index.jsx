import { Box, Grid } from "@chakra-ui/react";
import React, { useState } from "react";
import Board from "components/shared/calendar/components/board/Board";
import Legend from "components/shared/calendar/components/legend/Legend";
import { useQuery } from "@apollo/client";
import { GET_JOURNAL } from "utils/queries";

export default function Overview({ journal_id }) {
  
  // const [trigger, setTrigger] = useState(null)
  const { data, refetch } = useQuery(GET_JOURNAL, {
    variables: {
      id: journal_id,
    },
  });

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid>
        <Legend
          journalId={journal_id}
          refetchEntries={refetch}
          // gridArea={{ base: "1 / 1 / 2 / 2", lg: "1 / 1 / 2 / 2" }}
          // height="100%"
        />
        <Board data={data}
          journalId={journal_id}
          // gridArea={{ base: "1 / 1 / 2 / 2", lg: "1 / 1 / 2 / 2" }}
          // height="100%"
        />
      </Grid>
    </Box>
  );
}
