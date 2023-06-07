import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Box, Input, Button, VStack, HStack, Text, Heading, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/card";

import { GET_JOURNAL, GET_ME } from "utils/queries";
import { CREATE_LEGEND, UPDATE_LEGEND, DELETE_LEGEND } from "utils/mutations"

const Legend = ({ journalId, legends, setLegends }) => {
  const [color, setColor] = useState("#000000");
  const [label, setLabel] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const userId = localStorage.getItem("user_id");

  const [createLegend] = useMutation(CREATE_LEGEND);
  const [updateLegend] = useMutation(UPDATE_LEGEND);
  const [deleteLegend] = useMutation(DELETE_LEGEND);

  const { loading, error, data, refetch } = useQuery(GET_JOURNAL, {
    variables: { id: journalId }, 
  });
  const textColor = useColorModeValue("secondaryGray.500", "white");
  const titleColor = useColorModeValue("navy.700", "white");
 
  
  // (GET_LEGENDS, {
  //   variables: { id: userId },


  useEffect(() => {
    if (data && data.journal) {
      setLegends([...data.journal.legends]);
    }
  }, [data]);

  useEffect(() => {refetch()}, [])

  const handleAddLegend = async () => {
    try {
      if (!userId) {
        console.error("User ID is missing or invalid.");
        return;
      }

      const { data } = await createLegend({
        variables: { label, color, journalId },
      });

      const legends = data.createLegend.legends;
      setLegends(legends);

      console.log("Created Legend: ", data.createLegend);
    } catch (error) {
      console.error("Error creating legend: ", error);
    }
  };

  const handleUpdateLegend = async () => {
    try {
      if (selectedIndex === null) {
        console.error("Selected index is missing or invalid.");
        return;
      }

      const legendId = legends[selectedIndex]._id;

      const { data } = await updateLegend({
        variables: { legendId, label, color, journalId },
      });

      const updatedLegend = data.updateLegend;
      setLegends((prevLegends) => {
        const updatedLegends = [...prevLegends];
        updatedLegends[selectedIndex] = updatedLegend;
        return updatedLegends;
      });

      console.log("Updated Legend: ", data.updateLegend);
      handleCancelEdit();
    } catch (error) {
      console.error("Error updating legend: ", error);
    }
  };

  const handleDeleteLegend = async (legendId) => {
    console.log("Legend ID:", legendId);
    try {
      await deleteLegend({
        variables: { legendId, journalId },
      });
      refetch();
      console.log("Legend deleted:", legendId);
    } catch (error) {
      console.error("Failed to delete legend:", error);
    }
  };

  const handleEditLegend = (index) => {
    setSelectedIndex(index);
    const selectedLegend = legends[index];
    setLabel(selectedLegend.label);
    setColor(selectedLegend.color);
  };

  const handleCancelEdit = () => {
    setSelectedIndex(null);
    setLabel("");
    setColor("#000000");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <VStack spacing={4}>
      <Heading color={titleColor} size="sm" mb={2}>
        Legend
      </Heading>
      <HStack spacing={2}>
        <Input
          size="sm"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          borderColor="secondaryGray.500"
          borderRadius="md"
          color="secondaryGray.500"
          w="60px"
        />
        <Input
          borderRadius="md"
          size="sm"
          type="text"
          placeholder="Happy"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          borderColor={textColor}
          color="secondaryGray.500"
        />
        {selectedIndex === null ? (
          <Button
          variant='darkBrand'
          color='white'
          fontSize='sm'
          fontWeight='500'
          borderRadius='70px'
            onClick={handleAddLegend}
            
          >
            Add
          </Button>
        ) : (
          <>
            <Button
              variant='darkBrand'
              color='white'
              fontSize='sm'
              fontWeight='500'
              borderRadius='70px'
              onClick={handleUpdateLegend}
            
            >
              Update
            </Button>
            <Button
              size="sm"
              colorScheme="purple"
              onClick={handleCancelEdit}
              borderRadius="md"
            >
              Cancel
            </Button>
          </>
        )}
      </HStack>

      {legends.map((legend, index) => (

        <HStack key={legend._id} spacing={1}
          spacing={2}
          alignItems="center"
          justifyContent="space-between">
          {index !== 0 && (
            <>
              <Box
                boxSize={6}
                bgColor={legend.color}
                border="1px solid"
                borderColor="secondaryGray.500"
                borderRadius="md"
              />
              <Text fontSize="sm" color="secondaryGray.500">
                {legend.label}
              </Text>
              {selectedIndex === index ? (
                <Button
                  size="sm"
                  borderRadius="md"
                  colorScheme="purple"
                  onClick={() => handleEditLegend(index)}
                >
                  Edit
                </Button>

              ) : (
                <>
                  <Button
                    variant='darkBrand'
                    color='white'
                    fontSize='sm'
                    fontWeight='500'
                    borderRadius='70px'
                    onClick={() => handleEditLegend(index)}
                  >
                    Edit
                  </Button>
                  <Button
                   variant='darkBrand'
                   color='white'
                   fontSize='sm'
                   fontWeight='500'
                   borderRadius='70px'

                    onClick={() => handleDeleteLegend(legend._id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </>
          )}

        </HStack>
      ))}
    </VStack>
  );
};

export default Legend;
