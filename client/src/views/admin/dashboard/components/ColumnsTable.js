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
import { MdHelpOutline } from "react-icons/md";
import { tutorialStyles } from "theme/components/tutorial";
import Joyride, { STATUS, LIFECYCLE } from "react-joyride";

export default function JournalBars({ gridArea, journalsData }) {
  // const { ...rest } = props;
  const [journal] = useLazyQuery(GET_JOURNAL, {
    fetchPolicy: "cache-and-network",
    // nextFetchPolicy: "network-only",
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

  const [runTutorial, setRunTutorial] = useState(false);

  // Define the steps for the tutorial
  const tutorialSteps = [
    {
      target: "#entries-step", // Add appropriate target elements
      content:
        "Compiles your entries from individual journals and displays your data in a pie chart. Hover over the chart for more information.",
    },
    {
      target: "#usage-step", // Add appropriate target elements
      content:
        "Compiles data from all your journals and displays it in a bar chart.",
    },
    {
      target: "#link-step", // Add appropriate target elements
      content: "You can navigate to the journal page by clicking the link.",
    },
    {
      target: "#update-step", // Add appropriate target elements
      content:
        "Your journals that have not yet been updated will appear here. Clicking on them will allow you to update them.",
    },
  ];

  // Callback function to handle Joyride status changes
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRunTutorial(false);
      document.body.style.overflow = "auto"; // Reset overflow when the tutorial ends
    }
  };

  return (
    <Card
      align="center"
      direction="column"
      w="100%"
      gridArea={gridArea}
      id="usage-step"
    >
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        run={runTutorial}
        steps={tutorialSteps}
        scrollToFirstStep={false}
        scrollToSteps={false}
        styles={tutorialStyles}
      />
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
        <IconButton
          icon={<MdHelpOutline size="20" />}
          color={navbarIcon} // Make sure navbarIcon is defined in your code
          variant="ghost"
          _hover={{ color: "secondaryGray.900" }}
          onClick={() => {
            setRunTutorial(true);
            document.body.style.overflow = "hidden";
          }}
        />
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
