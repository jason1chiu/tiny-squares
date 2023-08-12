import { Box, Flex, Text, Select, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/card.js";
import PieChart from "components/charts/Pie.js";
import React, { useEffect, useState } from "react";
import { pieChartOptions } from "variables/charts.js";
import { GET_JOURNAL } from "utils/queries";
import { useLazyQuery } from "@apollo/client";
export default function Conversion({
  selectedJournal,
  setSelectedJournal,
  journalsData,
  ...props
}) {
  let [pieChartDataPrepared, setPieChartDataPrepared] = useState([]);
  let [pieChartOptionsPrepared, setPieChartOptionsPrepared] =
    useState(pieChartOptions);
 
  const [journal] = useLazyQuery(GET_JOURNAL, { fetchPolicy: "network-only" });

  const tColor = useColorModeValue("secondaryGray.500", "white");

  useEffect(() => {
    if (journalsData && journalsData.journals.length) {
      setSelectedJournal(journalsData.journals[0]._id);
      journal({ variables: { id: journalsData.journals[0]._id } });
    }
  }, [journalsData]);

  useEffect(() => {
    const fetchSelectedJournalData = async () => {
      let newOptions = { ...pieChartOptionsPrepared };
      newOptions.labels = [];
      newOptions.colors = [];
      newOptions.fill.colors = [];

      if (selectedJournal) {
        let selectedJournalObject = await journal({
          variables: { id: selectedJournal },
        });
        let colors = [];
        let object = selectedJournalObject.data.journal.entries.reduce(
          (memory, entry) => {
            if (entry && entry.legend) {
              if (entry.legend.label in memory) {
                memory[entry.legend.label] += 1;
              } else {
                memory[entry.legend.label] = 1;
                colors.push(entry.legend.color);
              }
            }
            return memory;
          },
          {}
        );
        let labels = Object.keys(object);
        let data = Object.values(object);
        selectedJournalObject.data.journal.legends.forEach((legend) => {
          if (!labels.includes(legend.label)) {
            labels.push(legend.label);
            colors.push(legend.color);
            data.push(0);
          }
        });
        newOptions.labels = labels;
        newOptions.colors = colors;
        newOptions.fill.colors = colors;

        setPieChartOptionsPrepared(newOptions);
        setPieChartDataPrepared(data);
      }
    };

    fetchSelectedJournalData();
  }, [selectedJournal]);

  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Card
      Card
      mb={{ base: "0px", lg: "20px" }}
      align="center"
      id="entries-step"
    >
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        mb="8px"
      >
        <Text color={textColor} fontSize="md" fontWeight="600" mt="4px">
          Your Journal Entries
        </Text>
        <Select
          value={selectedJournal}
          onChange={(event) => setSelectedJournal(event.target.value)}
          fontSize="sm"
          variant="subtle"
          defaultValue="monthly"
          width="unset"
          fontWeight="700"
        >
          <option value={""}>Select Journal</option>
          {(journalsData?.journals ?? []).map((journal, index) => (
            <option value={journal._id} key={journal._id}>
              {journal.name}
            </option>
          ))}
        </Select>
      </Flex>
      {pieChartDataPrepared.length ? (
        <PieChart
          h="100%"
          w="100%"
          chartData={pieChartDataPrepared}
          chartOptions={pieChartOptionsPrepared}
        />
      ) : (
        <Box color={tColor} pt="50px">
          Select a journal to view stats
        </Box>
      )}
    </Card>
  );
}
