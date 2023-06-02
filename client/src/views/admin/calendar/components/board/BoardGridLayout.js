import { squareLength } from "./Cell";
import { ABBR_MONTH_NAMES } from "js/components/main/Constants";
import { Box, Text, Grid, GridItem } from "@chakra-ui/react";

export default function getBoardGridLayout(getCell) {
    let chartData = [];
    for (let d = 0; d < 31; d++) {
      let rowData = [
        <GridItem
          key={"-1:" + d}
          w={`${squareLength}px`}
          justifyContent="flex-end"
          pr={2}
        >
          <Text>{d + 1}</Text>
        </GridItem>,
      ];
      for (let m = 0; m < 12; m++) {
        rowData.push(getCell(m, d));
      }
      chartData.push(<Grid templateColumns="repeat(13, 1fr)" key={d} gap={6}>{rowData}</Grid>);
    }
  
    return (
      <Box mt={3} mx="auto" mb={4} transform={`translateX(-${squareLength / 2}px)`}>
        <Grid templateColumns="repeat(13, 1fr)" gap={6} fontSize="0.9rem" textAlign="center">
          <GridItem></GridItem>
          {ABBR_MONTH_NAMES.map((value, index) => {
            return (
              <GridItem key={index} pb={1}>
                <Text>{value}</Text>
              </GridItem>
            );
          })}
        </Grid>
        {chartData}
      </Box>
    );
  }