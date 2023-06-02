import { Box, Grid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/card.js";
import React from "react";
// Assets
import { calendarData } from "./variables/calendar";
import EventCalendar from "components/calendar/EventCalendar";
import Timeline from "./components/Timeline";
import Events from "./components/Events";

export default function Default() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Grid
      pt={{ base: "130px", md: "80px", xl: "80px" }}
      gridTemplateColumns={{ base: "2.4fr 1fr", lg: "1fr 1.83fr" }}
      gap={{ base: "20px", xl: "20px" }}
      display={{ base: "block", lg: "grid" }}>
      <Box gridArea='1 / 1 / 2 / 2'>
        <Timeline mb='20px' />
        <Events />
      </Box>
      <Card gridArea='1 / 2 / 2 / 3' minH='680px'>
        <Text fontSize='2xl' fontWeight='700' color={textColor}>
          Calendar
        </Text>
        <Text
          fontSize='md'
          fontWeight='500'
          color='secondaryGray.600'
          mb='30px'>
          September 2022{" "}
        </Text>
        <EventCalendar initialDate='2022-10-01' calendarData={calendarData} />
      </Card>
    </Grid>
  );
}