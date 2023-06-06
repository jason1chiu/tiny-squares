import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Box, Input, Button, VStack, HStack, Text, Heading } from "@chakra-ui/react";
import Card from "components/card/card";

import { GET_LEGENDS, GET_ME } from "utils/queries";
import { CREATE_LEGEND, UPDATE_LEGEND, DELETE_LEGEND } from "utils/mutations"

const Legend = () => {
  const [color, setColor] = useState("#000000");
  const [label, setLabel] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const userId = localStorage.getItem("user_id");

  const [legends, setLegends] = useState([]);
  const [createLegend] = useMutation(CREATE_LEGEND);
  const [updateLegend] = useMutation(UPDATE_LEGEND);
  const [deleteLegend] = useMutation(DELETE_LEGEND);

  const { loading, error, data,} = useQuery(GET_LEGENDS, {
    variables: { id: userId },
  });

  useEffect(() => {
    if (data && data.legends) {
      setLegends(data.legends);
    }
  }, [data]);
  // Initialized the first item in legend array as something blank
  useState(() => {
    setLegends([{ label: "Add Your Selection" }]);
  }, []);
 

  const handleAddLegend = async (label, color) => {
    try {

      if (!userId) {
        console.error("User ID is missing or invalid.");
        return;
      }

      const {data} = await createLegend({
        variables: { label, color, userId},
      });

      const createdLegend = data.createLegend;
       setLegends((prevLegends) => [...prevLegends, createdLegend]);
      
      console.log('Created Legend: ', data.createLegend);
    } catch (error) {
      console.error("Error creating legend: ", error);
    }
  };

  const handleDeleteLegend = (legendId) => {
  
    console.log("Legend ID:", legendId);
    deleteLegend({
      variables: { id: legendId },
      update: (cache) => {
        // Update the cache after successful deletion
        cache.modify({
          fields: {
            legends(existingLegends, { readField }) {
              return existingLegends.filter(
                (legendRef) => legendId !== readField("id", legendRef)
              );
            },
          },
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

  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }


  return (
    // <Card mt={4} mb={6} mx="auto" p={4} w="auto">
    <VStack spacing={2}>
      <Heading size="sm" mb={2}>Legend</Heading>
      <HStack spacing={1}>
        <Input size="sm" type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <Input size="sm" type="text" placeholder="Label" value={label} onChange={(e) => setLabel(e.target.value)} />
        {/* <Button size="xs" onClick={() => handleAddLegend(label, color, userId)}>{selectedIndex === null ? "Add" : "Update"}</Button> */}
        <Button size="xs" onClick={() => handleAddLegend(label, color, userId)}>Add</Button>
      </HStack>

      {legends.map((legend, index) => (
        
        <HStack key={index} spacing={1}>
          {index !== 0 && (
            <>
          <Box boxSize="1em" bgColor={legend.color} border="1px solid" borderColor="gray.200" />
          <Text fontSize="sm">{legend.label}</Text>
          <Button size="xs" onClick={() => handleEditLegend(index)}>Edit</Button>
          <Button size="xs" onClick={() => handleDeleteLegend(legend.id)}>Delete</Button>
          </>
          )}
        </HStack>
      ))}

    </VStack>
    // </Card>
  );
};

export default Legend;