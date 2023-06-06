import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_LEGENDS } from "utils/queries";
import { CREATE_LEGEND, UPDATE_LEGEND, DELETE_LEGEND } from "utils/mutations"
import { Box, Input, Button, VStack, HStack, Text, Heading } from "@chakra-ui/react";
import Card from "components/card/card";

const Legend = ({ legends, setLegends }) => {
  
  const [color, setColor] = useState("#000000");
  const [label, setLabel] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [createLegend] = useMutation(CREATE_LEGEND);
  const [updateLegend] = useMutation(UPDATE_LEGEND);
  const [deleteLegend] = useMutation(DELETE_LEGEND);

    useEffect(() => {
      // Add initial legend
      if (legends.length === 0) {
        setLegends([{ label: "Add Your Selection" }]);
      }
    }, []);

    console.log(legends);
  
        // Get the user ID from localStorage
        const userId = localStorage.getItem("user_id");

        // Fetch existing legends
        const { loading, error, data } = useQuery(GET_LEGENDS, {
          variables: { id: userId },
        });

        const existingLegends = data ? data.legends : null;
      
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error fetching existing legends.</p>;


  const handleAddLegend = async () => {
    if (selectedIndex !== null) {
      // Update
      const newLegends = [...legends];
      newLegends[selectedIndex] = { color, label };
      setLegends(newLegends);
    } else if (legends.length < 10 && label !== "Add Your Selection") {
      // Add
  
      try {
        const response = await createLegend({
          variables: {
            label,
            color,
            userId: userId, // Pass the user ID to the mutation
          },
          
          update: (cache, { data }) => {
            // Update the cache after the mutation
            const existingLegends = cache.readQuery({ query: GET_LEGENDS, variables: { userId } });

            const newLegend = data.createLegend;
  
            if (existingLegends && existingLegends.legends) {
              cache.writeQuery({
                query: GET_LEGENDS,
                variables: { userId },
                data: { legends: existingLegends
                  ? [...existingLegends.legends, newLegend]
                  : [newLegend], },
              });
            } else {
              cache.writeQuery({
                query: GET_LEGENDS,
                variables: { userId },
                data: { legends: [newLegend] },
              });
            }
          },
        });
  
        const newLegend = response.data.createLegend;
        console.log(newLegend); // Log the response object here
        setLegends([...legends, { id: newLegend.id, color, label }]);
        console.log(newLegend);
      } catch (error) {
        console.error("Error adding legend:", error);
      }
    }
    // Reset
    setColor("#000000");
    setLabel("");
    setSelectedIndex(null);
  };


  
  const handleDeleteLegend = (legend) => {
    const legendId = legend.id; // Assuming the ID field is named 'id' in the 'legend' object
    deleteLegend({
      variables: { id: legendId },
      update(cache) {
        // Update the cache after successful deletion
        const cachedData = cache.readQuery({ query: GET_LEGENDS });
        const updatedLegends = cachedData.legends.filter(
          (legend) => legend.id !== legendId
        );
  
        cache.writeQuery({
          query: GET_LEGENDS,
          data: { legends: updatedLegends },
        });
      },
    })
      .then((response) => {
        // Handle successful deletion
        console.log("Legend deleted:", response);
      })
      .catch((error) => {
        // Handle error
        console.error("Failed to delete legend:", error);
      });
  };


const handleEditLegend = (index) => {
  setColor(legends[index].color);
  setLabel(legends[index].label);
  setSelectedIndex(index);
};




  return (
    <VStack spacing={2}>
      <Heading size="sm" mb={2}>Legend</Heading>
      <HStack spacing={1}>
        <Input size="sm" type="color" value={color}  onChange={(e) => setColor(e.target.value)} />
        <Input size="sm" type="text" placeholder="Label" value={label} onChange={(e) => setLabel(e.target.value)} />
        <Button size="xs" onClick={handleAddLegend}>{selectedIndex === null ? "Add" : "Update"}</Button>
      </HStack>
      
      {legends.concat(existingLegends).map((legend, index) => (
        index !== 0 && (
          <HStack key={index} spacing={1}>
            <Box boxSize="1em" bgColor={legend.color} border="1px solid" borderColor="gray.200" />
            <Text fontSize="sm">{legend.label}</Text>
            <Button size="xs" onClick={() => handleEditLegend(index)}>Edit</Button>
            <Button size="xs" onClick={() => handleDeleteLegend(legend.id)}>Delete</Button>
          </HStack>
        )
      ))}
     
    </VStack>

  );
};

export default Legend;