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
  
        // Get the user ID from localStorage
        const userId = localStorage.getItem("user_id");

        // Fetch existing legends
        const { loading, error, data } = useQuery(GET_LEGENDS, {
          variables: { id: userId },
        });
        const existingLegends = data ? data.legends : null;
      
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error fetching existing legends.</p>;

  // Initialized the first item in legend array as something blank
  // useState(() => {
  //   setLegends([{ label: "Add Your Selection" }]);
  // });

  const handleAddLegend = async () => {
    if (selectedIndex !== null) {
      // Update
      const newLegends = [...legends];
      newLegends[selectedIndex] = { color, label };
      setLegends(newLegends);
    } else if (legends.length < 10) {
      // Add
  
      // Get the user ID from localStorage
      // const userId = localStorage.getItem("user_id");
  
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

            

            if (existingLegends && existingLegends.legends) {
              const legendsMap = existingLegends.legends.map(legend => ({
                id: legend.id,
                label: legend.label,
                color: legend.color
              }));
              
              console.log(legendsMap);
            }
  
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


  
  const handleDeleteLegend = (legendId) => {
    deleteLegend({
      variables: { id: legendId },
      update(cache) {
        console.log(cache);

        // Update the cache after successful deletion
        const cachedData = cache.readQuery({ query: GET_LEGENDS });
        const updatedLegends = cachedData.legends.filter((legend) => legend.id !== legendId);

          // Handle case when cachedData is null or undefined
      if (!cachedData || !cachedData.legends) {
        return;
      }

        console.log('Updated Legends:', updatedLegends);
        cache.writeQuery({
          query: GET_LEGENDS,
          data: { legends: updatedLegends },
        });
      },
    });
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
        <Input size="sm" type="color" value={color}  onChange={(e) => setColor(e.target.value)} />
        <Input size="sm" type="text" placeholder="Label" value={label} onChange={(e) => setLabel(e.target.value)} />
        <Button size="xs" onClick={handleAddLegend}>{selectedIndex === null ? "Add" : "Update"}</Button>
      </HStack>
      
      {existingLegends && existingLegends.map((legend, index) => (
    
        <HStack key={index} spacing={1}>
          <React.Fragment key={index}>
            <Box boxSize="1em" bgColor={legend.color} border="1px solid" borderColor="gray.200" />
            <Text fontSize="sm">{legend.label}</Text>
            <Button size="xs" onClick={() => handleEditLegend(index)}>Edit</Button>
            <Button size="xs" onClick={() => handleDeleteLegend(legend.id)}>Delete</Button>
          </React.Fragment>
          </HStack>
        ))}
      {/* {legends.map((legend, index) => (
        <HStack key={index} spacing={1}> */}

          {/* Hide the first legend item, if index > 0, render the legend items that are iterations > 0 */}
          {/* {index !== 0 && (
            <>
              <Box boxSize="1em" bgColor={legend.color} border="1px solid" borderColor="gray.200" />
              <Text fontSize="sm">{legend.label}</Text>
              <Button size="xs" onClick={() => handleEditLegend(index)}>Edit</Button>
              <Button size="xs" onClick={() => handleDeleteLegend(index)}>Delete</Button>
            </>
          )}
        </HStack>
      ))} */}
     
    </VStack>
    // </Card>
  );
};

export default Legend;