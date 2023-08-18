import React, { useEffect, useState } from "react";
import { Grid, GridItem, Box, Text, useColorModeValue } from "@chakra-ui/react";
import { useQuery, useMutation } from "@apollo/client";
import Card from "components/card/card";
import Cell from "components/shared/calendar/components/board/Cell";
import { GET_LEGENDS, GET_JOURNAL, GET_JOURNALS } from "utils/queries";
import { ADD_ENTRY } from "utils/mutations";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const Board = ({ journalId, data }) => {
  debugger
  let [entriesMap, setEntriesMap] = useState({});

  let [addEntry] = useMutation(ADD_ENTRY, {
    refetchQueries: [GET_JOURNAL],
  });

  const legendsQuery = useQuery(GET_LEGENDS, {
    variables: { id: journalId },
  });

  const legends = legendsQuery?.data?.legends ?? [];

  useEffect(() => {
    let preparedData = (data?.journal?.entries ?? []).reduce(
      (accumulator, currentValue) => {
        accumulator[currentValue.date] = currentValue;
        return accumulator;
      },
      {}
    );

    setEntriesMap(preparedData);
  }, [data?.journal?.entries, data?.journal?.length]);

  const textColor = useColorModeValue("secondaryGray.400", "white");

  const handleSave = (legend, note, date) => {
    addEntry({
      variables: {
        journalId,
        input: {
          date,
          legendId: legend._id,
          note,
        },
      },
    });
  };

  return (
    <Card mt={4} mb={4} mx="auto" minh="90vh" w="auto">
      <Grid
        templateColumns="repeat(13, 1fr)"
        gap={0}
        h="100%"
        w="100%"
        id="your-board-id"
      >
        <GridItem></GridItem>
        {Array.from({ length: 12 }, (_, index) => (
          <GridItem key={`month-${index}`} textAlign="center">
            <Text color={textColor} fontSize="m">
              {months[index]}
            </Text>
          </GridItem>
        ))}
        {Array.from({ length: 31 }, (_, rowIndex) => (
          <React.Fragment key={`day-row-${rowIndex}`}>
            <GridItem key={`day-label-${rowIndex}`} textAlign="center">
              <Text color={textColor} fontSize="lg">{`${rowIndex + 1}`}</Text>
            </GridItem>
            {Array.from({ length: 12 }, (_, colIndex) => (
              <GridItem key={`cell-${rowIndex}-${colIndex}`}>
                <Box h="100%">
                  <Cell
                    journalEntriesMap={entriesMap}
                    journalId={journalId}
                    day={rowIndex + 1}
                    month={colIndex}
                    onSave={handleSave}
                    legends={legends} // Pass legends as props
                  />
                </Box>
              </GridItem>
            ))}
          </React.Fragment>
        ))}
      </Grid>
    </Card>
  );
};

export default Board;
