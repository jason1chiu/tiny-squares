import React, { useState } from "react";
import { Box, Input, Button, VStack, HStack, Text, Heading } from "@chakra-ui/react";
import Card from "components/card/card";

const Legend = ({ legends, setLegends }) => {
  const [color, setColor] = useState("#000000");
  const [label, setLabel] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Initialized the first item in legend array as something blank
  useState(() => {
    setLegends([{ label: "Add Your Selection" }]);
  });

  const handleAddLegend = () => {
    if (selectedIndex !== null) {
      // update
      const newLegends = [...legends];
      newLegends[selectedIndex] = { color, label };
      setLegends(newLegends);
    } else if (legends.length < 10) {
      // add
      setLegends([...legends, { color, label }]);
    }
    // reset
    setColor("#000000");
    setLabel("");
    setSelectedIndex(null);
  };

  const handleDeleteLegend = (index) => {
    setLegends(legends.filter((_, i) => i !== index));
  };

  const handleEditLegend = (index) => {
    setColor(legends[index].color);
    setLabel(legends[index].label);
    setSelectedIndex(index);
  };

  return (
    // <Card mt={4} mb={6} mx="auto" p={4} w="auto">
    <VStack spacing={2}>
      <Heading size="sm" mb={2}>Legend</Heading>
      <HStack spacing={1}>
        <Input size="sm" type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <Input size="sm" type="text" placeholder="Label" value={label} onChange={(e) => setLabel(e.target.value)} />
        <Button size="xs" onClick={handleAddLegend}>{selectedIndex === null ? "Add" : "Update"}</Button>
      </HStack>
      {legends.map((legend, index) => (
        <HStack key={index} spacing={1}>

          {/* Hide the first legend item, if index > 0, render the legend items that are iterations > 0 */}
          {index !== 0 && (
            <>
              <Box boxSize="1em" bgColor={legend.color} border="1px solid" borderColor="gray.200" />
              <Text fontSize="sm">{legend.label}</Text>
              <Button size="xs" onClick={() => handleEditLegend(index)}>Edit</Button>
              <Button size="xs" onClick={() => handleDeleteLegend(index)}>Delete</Button>
            </>
          )}
        </HStack>
      ))}
    </VStack>
    // </Card>
  );
};

export default Legend;