import { Box, Grid } from "@chakra-ui/react";
import React from "react";
import Board from "components/shared/calendar/components/board/Board";

export default function Overview({ journal_id, data, refetch }) {
  return (
    <Box pt={{ base: "10px", md: "10px", xl: "10px" }}>
      <Grid>
        <Board data={data} journalId={journal_id} refetch={refetch} />
      </Grid>
    </Box>
  );
}
