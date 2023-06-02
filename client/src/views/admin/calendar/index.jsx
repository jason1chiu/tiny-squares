import { Box, Grid } from "@chakra-ui/react";
import React, { useState } from "react";
import Board from "views/admin/calendar/components/board/Board";
import Legend from "views/admin/calendar/components/legend/Legend";

export default function Overview() {
  const [legends, setLegends] = useState([]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1fr 1fr",
        }}
        templateRows={{
          base: "repeat(2, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
      >
        <Board 
          legends={legends} 
          gridArea={{ base: "1 / 1 / 2 / 2", lg: "1 / 1 / 2 / 2" }} 
        />
        <Legend 
          legends={legends}
          setLegends={setLegends}
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }} 
        />
      </Grid>
    </Box>
  );
}