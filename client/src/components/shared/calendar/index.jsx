
import { Box, Grid } from "@chakra-ui/react";
import React, { useState } from "react";
import Board from "components/shared/calendar/components/board/Board";
import { useQuery } from "@apollo/client";
import { GET_JOURNAL } from "utils/queries";

export default function Overview({ journal_id, data, refetch }) {
  return (
    <Box pt={{ base: "10px", md: "10px", xl: "10px" }}>
      <Grid>
        <Board 
          data={data}
          journalId={journal_id}
          refetch={refetch}
        />
      </Grid>
    </Box>
  );
}
