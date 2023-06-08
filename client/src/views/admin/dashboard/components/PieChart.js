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
    <Card p='20px' align='center' direction='column' w='100%' {...rest}>
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
        /> : <Box>No Data</Box>
      }
      {/* <Card
        bg={cardColor}
        flexDirection='row'
        boxShadow={cardShadow}
        w='100%'
        p='15px'
        px='20px'
        mt='15px'
        mx='auto'>
        <Flex direction='column' py='5px'>
          <Flex align='center'>
            <Box h='8px' w='8px' bg='brand.500' borderRadius='50%' me='4px' />
            <Text
              fontSize='xs'
              color='secondaryGray.600'
              fontWeight='700'
              mb='5px'>
              Happy
            </Text>
          </Flex>
          <Text fontSize='lg' color={textColor} fontWeight='700'>
            63%
          </Text>
        </Flex>
        <VSeparator mx={{ base: "60px", xl: "60px", "2xl": "60px" }} />
        <Flex direction='column' py='5px' me='10px'>
          <Flex align='center'>
            <Box h='8px' w='8px' bg='#6AD2FF' borderRadius='50%' me='4px' />
            <Text
              fontSize='xs'
              color='secondaryGray.600'
              fontWeight='700'
              mb='5px'>
              Sad
              {journalsData.journals[0].entries[0].legend.label}
            </Text>
          </Flex>
          <Text fontSize='lg' color={textColor} fontWeight='700'>
            25%
          </Text>
        </Flex>
      </Card> */}
    </Card>
  );
}