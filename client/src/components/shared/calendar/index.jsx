import { Box, Grid } from "@chakra-ui/react";
import React, { useState } from "react";
import Board from "components/shared/calendar/components/board/Board";
import Legend from "components/shared/calendar/components/legend/Legend";

export default function Overview() {
  const [legends, setLegends] = useState([]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid>
        <Legend
          legends={legends}
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