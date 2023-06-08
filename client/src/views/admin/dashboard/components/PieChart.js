import { Box, Flex, Text, Select, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/card.js";
//import the pie chart from components/charts
import PieChart from "components/charts/Pie.js";
import React, { useEffect, useState } from "react";
import { pieChartData, pieChartOptions } from "variables/charts.js";
import { VSeparator } from "components/seperator/Seperator.jsx";
import { GET_JOURNALS, GET_JOURNAL, GET_ME } from "utils/queries";
import { useQuery, useLazyQuery } from "@apollo/client";

export default function Conversion({ selectedJournal, setSelectedJournal, journalsData, ...props }) {

  let [pieChartDataPrepared, setPieChartDataPrepared] = useState([])
  let [pieChartOptionsPrepared, setPieChartOptionsPrepared] = useState(pieChartOptions)
  // const { data: journalsData, refetch } = useQuery(GET_JOURNALS);
  const [journal] = useLazyQuery(GET_JOURNAL, {fetchPolicy: "network-only"})

  const tColor = useColorModeValue("secondaryGray.500", "white");

  // useEffect(() => {
  //   if (journalsData && journalsData.journals.length) {
  //     setSelectedJournal(journalsData.journals[0]._id)
  //   }
  // }, [journalsData])

  useEffect(async () => {
    pieChartOptionsPrepared.labels = []
    pieChartOptionsPrepared.colors = []
    pieChartOptionsPrepared.fill.colors = []
    setPieChartOptionsPrepared({ ...pieChartOptionsPrepared })
    setPieChartDataPrepared([])

    if (selectedJournal) {
      let selectedJournalObject = await journal({ variables: { id: selectedJournal } })
      let colors = []
      let object = selectedJournalObject.data.journal.entries.reduce((memory, entry) => {
        if (entry && entry.legend) {
          if (entry.legend.label in memory) {
            memory[entry.legend.label] += 1
          } else {
            memory[entry.legend.label] = 1
            colors.push(entry.legend.color)
          }
        }
        return memory
      }, {})
      let labels = Object.keys(object)
      let data = Object.values(object)
      selectedJournalObject.data.journal.legends.forEach(legend => {
        if (!labels.includes(legend.label)) {
          labels.push(legend.label);
          colors.push(legend.color);
          data.push(0);
        }
      })
      pieChartOptionsPrepared.labels = labels
      pieChartOptionsPrepared.colors = colors
      pieChartOptionsPrepared.fill.colors = colors
      setPieChartOptionsPrepared({ ...pieChartOptionsPrepared })
      setPieChartDataPrepared(data)
    }
  }, [selectedJournal])

  const { ...rest } = props;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  return (
    <Card Card mb={{ base: "0px", lg: "20px" }} align='center' >
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        mb='8px'>
        <Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
          Your Journal Entries
        </Text>
        <Select
          value={selectedJournal}
          onChange={(event) => setSelectedJournal(event.target.value)}
          fontSize='sm'
          variant='subtle'
          defaultValue='monthly'
          width='unset'
          fontWeight='700'>
          <option value={""}>Select Journal</option>
          {(journalsData?.journals ?? []).map((journal, index) => (
            <option value={journal._id} key={journal._id}>{journal.name}</option>
          ))}
        </Select>
      </Flex>
      {pieChartDataPrepared.length ?
        <PieChart
          h='100%'
          w='100%'
          chartData={pieChartDataPrepared}
          chartOptions={pieChartOptionsPrepared}
        /> : <Box color={tColor} pt='50px'>Select a journal to view stats</Box>
      }
      
    </Card>
  );
}