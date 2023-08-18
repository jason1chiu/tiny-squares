import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";

import Card from "components/card/card.js";
import React, { useState, useEffect } from "react";
import BarChart from "components/charts/BarChart.js";
import { GET_JOURNAL } from "utils/queries";
import { useLazyQuery } from "@apollo/client";
import {
  barChartDataConsumption,
  barChartOptionsConsumption,
} from "variables/charts.js";


export default function JournalBars({ gridArea, journalsData }) {
  // const { ...rest } = props;
  const [journal] = useLazyQuery(GET_JOURNAL, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "network-only",
  });

  let [barChartDataPrepared, setbarChartDataPrepared] = useState([]);
  let [barChartOptionsPrepared, setbarChartOptionsPrepared] = useState(
    barChartOptionsConsumption
  );

  useEffect(() => {
    if (journalsData) {
      Promise.all(
        journalsData.map(async (item, index) => {
          return journal({ variables: { id: item._id } }).then((response) => {
            let row = {
              name: response.data.journal.name,
              data: response.data.journal.entries.reduce(
                (months, entry) => {
                  let month = new Date(+entry.date).getMonth();
                  months[month] += 1;
                  return months;
                },
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              ),
            };
            return row;
          });
        })
      ).then((data) => {
        setbarChartDataPrepared(data);
      });
    }
  }, [journalsData]);

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const navbarIcon = useColorModeValue("gray.400", "white");



  return (
    <Card
      align="center"
      direction="column"
      w="100%"
      gridArea={gridArea}
      id="usage-step"
    >

      <Flex align="center" w="100%" px="15px" py="10px">
        <Text
          me="auto"
          color={textColor}
          fontSize="xl"
          fontWeight="700"
          lineHeight="100%"
        >
          Journal Usage
        </Text>
        
      </Flex>

      <Box h="240px" mt="auto">
        {barChartDataPrepared.length && (
          <BarChart
            chartData={[...barChartDataPrepared]}
            chartOptions={barChartOptionsPrepared}
          />
        )}
      </Box>
    </Card>
  );
}
