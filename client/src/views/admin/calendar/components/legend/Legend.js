import React, { useState } from "react";
import { Box, Input, Button, VStack, HStack, Text, Heading } from "@chakra-ui/react";
import Card from "components/card/card";

const Legend = ({ legends, setLegends }) => {
  const [color, setColor] = useState("#000000");
  const [label, setLabel] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

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
    <Card mt={4} mb={6} mx="auto" minH="10vh">
      <VStack spacing={4}>
        <Heading size="md" mb={4}>Legend</Heading>
        <HStack spacing={2}>
          <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          <Input type="text" placeholder="Label" value={label} onChange={(e) => setLabel(e.target.value)} />
          <Button onClick={handleAddLegend}>{selectedIndex === null ? "Add" : "Update"}</Button>
        </HStack>
        {legends.map((legend, index) => (
          <HStack key={index} spacing={2}>
            <Box boxSize="1.5em" bgColor={legend.color} border="1px solid" borderColor="gray.200" />
            <Text>{legend.label}</Text>
            <Button size="xs" onClick={() => handleEditLegend(index)}>Edit</Button>
            <Button size="xs" onClick={() => handleDeleteLegend(index)}>Delete</Button>
          </HStack>
        ))}
      </VStack>
    </Card>
  );
};

export default Legend;