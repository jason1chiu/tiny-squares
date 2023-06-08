import { Box, Flex, Text, Select, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/card.js";
//import the pie chart from components/charts
import PieChart from "components/charts/Pie.js";
import React from "react";
import { pieChartData, pieChartOptions } from "variables/charts.js";
import { VSeparator } from "components/seperator/Seperator.jsx";
import { GET_JOURNALS, GET_LEGENDS } from "utils/queries";
import { useQuery } from "@apollo/client";

export default function Conversion(props, {journalId}) {
  const { ...rest } = props;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const { data: journalsData } = useQuery(GET_JOURNALS);
  const { data: legendsData } = useQuery(GET_LEGENDS, {variables: {id: journalId}})
  console.log(legendsData);

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
          fontSize='sm'
          variant='subtle'
          defaultValue='monthly'
          width='unset'
          fontWeight='700'>
          {(journalsData?.journals ?? []).map((journal, index) => (
            <option key={index}>{journal.name}</option>
          ))}
        </Select>
      </Flex>
      <PieChart
        h='100%'
        w='100%'
        chartData={pieChartData}
        chartOptions={pieChartOptions}
      />
      <Card
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
            </Text>
          </Flex>
          <Text fontSize='lg' color={textColor} fontWeight='700'>
            25%
          </Text>
        </Flex>
      </Card>
    </Card>
  );
}