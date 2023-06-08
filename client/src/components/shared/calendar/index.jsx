import { Box, Grid } from "@chakra-ui/react";
import React from "react";
import Board from "components/shared/calendar/components/board/Board";
import Legend from "components/shared/calendar/components/legend/Legend";

export default function Overview({ journal_id }) {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid>
        <Legend
          journalId={journal_id}
          // gridArea={{ base: "1 / 1 / 2 / 2", lg: "1 / 1 / 2 / 2" }}
          // height="100%"
        />
        <Board
          journalId={journal_id}
          // gridArea={{ base: "1 / 1 / 2 / 2", lg: "1 / 1 / 2 / 2" }}
          // height="100%"
        />
      </Grid>
    </Box>
  );
}
