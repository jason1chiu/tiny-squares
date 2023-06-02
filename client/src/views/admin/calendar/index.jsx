import {
    // Avatar,
    Box,
    // Flex,
    // FormLabel,
    // Icon,
    // Select,
    Grid,
    // useColorModeValue,
  } from "@chakra-ui/react";

  import React from "react";
  import Board from "views/admin/calendar/components/board/Board";

  export default function Overview() {
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
          gap={{ base: "20px", xl: "20px" }}>

            <Board
          gridArea={{ base: "3 / 1 / 4 / 2", lg: "1 / 3 / 2 / 4" }}
        />

      </Grid>
    </Box>
    );
    }