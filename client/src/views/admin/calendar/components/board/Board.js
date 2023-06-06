import React, { useState } from "react";
import { Grid, GridItem, Box, Text } from "@chakra-ui/react";
import Card from "components/card/card";
import Cell from "views/admin/calendar/components/board/Cell";

const Board = ({ legends }) => {
  // Create a state that stores the cell data
  const [cells, setCells] = useState({});

  const handleSave = (id, color, note) => {
    setCells(prev => ({ ...prev, [id]: { color, note } }));
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

  return (
    <Card mt={4} mb={4} mx="auto" minh="80vh" w="auto">
      <Grid templateColumns="repeat(13, 1fr)" gap={0} h="100%" w="100%">
        <GridItem></GridItem>
        {Array.from({ length: 12 }, (_, index) => (
          <GridItem key={`month-${index}`} textAlign="center">
            <Text fontSize="sm" fontWeight="bold">{months[index]}</Text>
          </GridItem>
        ))}
        {Array.from({ length: 31 }, (_, rowIndex) => (
           <React.Fragment key={`day-row-${rowIndex}`}>
            <GridItem key={`day-label-${rowIndex}`} textAlign="center">
              <Text fontSize="sm" fontWeight="bold">{`${rowIndex + 1}`}</Text>
            </GridItem>
            {Array.from({ length: 12 }, (_, colIndex) => {
              const id = `cell-${rowIndex}-${colIndex}`; // create unique id
              const cell = cells[id] || {}; // get the cell data
              return (
                <GridItem key={id}>
                  <Box h="100%">
                    <Cell
                      day={rowIndex + 1}
                      month={colIndex + 1}
                      color={cell.color}
                      note={cell.note}
                      legends={legends}
                      onSave={(color, note) => handleSave(id, color, note)}
                    />
                  </Box>
                </GridItem>
              )
            })}
          </React.Fragment>
        ))}
      </Grid>
    </Card>
  );
};

export default Board;
