import { Box, Grid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Board from "components/shared/calendar/components/board/Board";
import Legend from "components/shared/calendar/components/legend/Legend";
import { GET_JOURNAL } from "utils/queries";
import { useQuery } from "@apollo/client";

export default function Overview({journal_id}) {

  const [legends, setLegends] = useState([]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid>
        <Legend
          legends={legends}
          journalId={journal_id}
          setLegends={setLegends}
          gridArea={{ base: "1 / 1 / 2 / 2", lg: "1 / 1 / 2 / 2" }}
          height="100%"
        />
        <Board
          legends={legends}
          gridArea={{ base: "1 / 1 / 2 / 2", lg: "1 / 1 / 2 / 2" }}
          height="100%"
        />

      </Grid>
    </Box>
  );
}