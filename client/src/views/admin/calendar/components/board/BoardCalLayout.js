import {
    FULL_MONTH_NAMES,
    ABBR_WEEKDAY_NAMES,
    DAYS_PER_MONTH
  } from "views/admin/calendar/components/Constants";
  import { getDayOfWeek, isLeapYear } from "utils/DateUtils";
  import { Box, Text, Grid, GridItem, Heading } from "@chakra-ui/react";
  
  function getTable(month, year, getCell) {
    let tableData = [];
    let firstDay = getDayOfWeek(month, 1, year);
    let numDays = DAYS_PER_MONTH[month] + (month === 1 && isLeapYear(year) ? 1 : 0);
  
    for (let w = 0; w < 6; w++) {
        let rowData = [];
        if (w * 7 - firstDay >= numDays) {
          break;
        }
    
        for (let d = 0; d < 7; d++) {
          let dayOfMonth = w * 7 + d - firstDay;
    
          rowData.push(getCell(month, dayOfMonth));
        }
    
        tableData.push(<Grid templateColumns="repeat(7, 1fr)" key={w} gap={6}>{rowData}</Grid>);
      }

      return (
        <Box>
          <Grid templateColumns="repeat(7, 1fr)" gap={6} fontSize="0.9rem" textAlign="center">
            {ABBR_WEEKDAY_NAMES.map((value, index) => {
              return (
                <GridItem key={index} pb={1}>
                  <Text>{value}</Text>
                </GridItem>
              );
            })}
          </Grid>
          {tableData}
        </Box>
      );
    }

    export default function getBoardCalendarLayout({getCell, year}) {
        let calendarData = [];
      
        for (let m = 0; m < 12; m++) {
          calendarData.push(
            <Box key={m} mx={3} my={2}>
              <Heading as="h4" size="md">{FULL_MONTH_NAMES[m]}</Heading>
              {getTable(m, year, getCell)}
            </Box>
          );
        }
      
        return (
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
              gap={6}
            >
              {calendarData}
            </Grid>
          );
        }