import React from "react";
import { Box } from "@chakra-ui/react";
import getBoardGridLayout from "./BoardGridLayout";
import getBoardCalendarLayout from "./BoardCalendarLayout";
import Cell from "./Cell";
import { DAYS_PER_MONTH } from "js/components/main/Constants";
import { getIndex, isLeapYear } from "js/util/DateUtils";

const Board = ({
  year,
  currentlySelected,
  currentDay,
  shouldShowTodayMarker, // Renamed from showTodayMarker
  showEditing,
  values,
  invalidCellsDisplayType,
  showDayNumber,
  colorSchemes,
  handleClick,
  setCurrentDayXYProvider,
  displayType
}) => {
  const getCell = (m, d) => {
    let value = "";
    let numDays = DAYS_PER_MONTH[m] + (isLeapYear(year) && m === 1 ? 1 : 0);
    let valid = d >= 0 && d + 1 <= numDays;
    let active = currentlySelected[0] === m && currentlySelected[1] === d;
    let isToday = m * 31 + d === currentDay && d < numDays;
    let showTodayMarker = 
      isToday && shouldShowTodayMarker && String(new Date().getFullYear()) === String(year);
    if (valid) value = values[getIndex(m, d)];
    return (
      <Cell
        value={value}
        month={m}
        day={d}
        handleClick={showEditing ? handleClick : () => {}}
        valid={valid}
        invalidCellsDisplayType={invalidCellsDisplayType}
        showDayNumber={showDayNumber}
        active={active}
        showTodayMarker={showTodayMarker}
        setCurrentDayXYProvider={
          isToday ? setCurrentDayXYProvider : function () {}
        }
        colorSchemes={colorSchemes}
        key={m + ":" + d}
      />
    );
  };

  let Component = getBoardGridLayout; // default to Grid Layout
  if (displayType === 'CALENDAR') {
    Component = getBoardCalendarLayout;
  }
  
  return (
    <Box gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}>
      <Component getCell={getCell} year={year} />
    </Box>
  );
};

export default Board;