import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Card from "components/card/card.js";
import React, { useState, useEffect } from "react";
import BarChart from "components/charts/BarChart.js"
import { GET_JOURNAL } from "utils/queries";
import { useLazyQuery } from "@apollo/client";
import { barChartDataConsumption, barChartOptionsConsumption } from "variables/charts.js";
import { MdBarChart } from "react-icons/md";

export default function JournalBars({ gridArea, journalsData }) {
  // const { ...rest } = props;
  const [journal] = useLazyQuery(GET_JOURNAL, { fetchPolicy: "network-only" })

  let [barChartDataPrepared, setbarChartDataPrepared] = useState([])
  let [barChartOptionsPrepared, setbarChartOptionsPrepared] = useState(barChartOptionsConsumption)

  useEffect(() => {

    if (journalsData) {
      // setbarChartDataPrepared([])
      Promise.all(journalsData.map(async (item, index) => {
        return journal({ variables: { id: item._id } }).then(response => {
          let row = {
            name: response.data.journal.name,
            data: response.data.journal.entries.reduce((months, entry) => {
              let month = new Date(+entry.date).getMonth();
              months[month] += 1
              return months
            }, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
          }
          return row
        })
        // setbarChartDataPrepared([...preparedData.map(i => ({...i}))])
        // setbarChartDataPrepared(JSON.parse(JSON.stringify(preparedData)))
      })).then(data => {
        setbarChartDataPrepared(data)
      })
    }
  }, [journalsData])

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );



  return (
    <Card align='center' direction='column' w='100%' gridArea={gridArea}>
      <Flex align='center' w='100%' px='15px' py='10px'>
        <Text
          me='auto'
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'>
          Journal Usage
        </Text>
        
      </Flex>

      <Box h='240px' mt='auto'>
        {barChartDataPrepared.length &&
          <BarChart
            chartData={[...barChartDataPrepared]}
            chartOptions={barChartOptionsPrepared}
          />
        }
      </Box>
    </Card>
  );
}