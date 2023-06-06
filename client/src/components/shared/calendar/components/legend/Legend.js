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

  const { loading, error, data } = useQuery(GET_LEGENDS, {
    variables: { id: userId },
  });

  useEffect(() => {
    if (data && data.legends) {
      setLegends(data.legends);
    }
  }, [data]);

  const handleAddLegend = async () => {
    try {
      if (!userId) {
        console.error("User ID is missing or invalid.");
        return;
      }

      const { data } = await createLegend({
        variables: { label, color, userId },
      });

      const createdLegend = data.createLegend;
      setLegends((prevLegends) => [...prevLegends, createdLegend]);

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

      const legendId = legends[selectedIndex].id;

      const { data } = await updateLegend({
        variables: { id: legendId, label, color },
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
        variables: { id: legendId },
        update: (cache) => {
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
      });
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
    <VStack spacing={2}>
      <Heading size="sm" mb={2}>
        Legend
      </Heading>
      <HStack spacing={1}>
        <Input
          size="sm"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <Input
          size="sm"
          type="text"
          placeholder="Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        {selectedIndex === null ? (
          <Button size="xs" onClick={handleAddLegend}>
            Add
          </Button>
        ) : (
          <>
            <Button size="xs" onClick={handleUpdateLegend}>
              Update
            </Button>
            <Button size="xs" onClick={handleCancelEdit}>
              Cancel
            </Button>
          </>
        )}
      </HStack>

      {legends.map((legend, index) => (
        <HStack key={index} spacing={1}>
          {index !== 0 && (
            <>
              <Box
                boxSize="1em"
                bgColor={legend.color}
                border="1px solid"
                borderColor="gray.200"
              />
              <Text fontSize="sm">{legend.label}</Text>
              {selectedIndex === index ? (
                <Button size="xs" onClick={() => handleEditLegend(index)}>
                  Edit
                </Button>
              ) : (
                <>
                  <Button
                    size="xs"
                    onClick={() => handleEditLegend(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="xs"
                    onClick={() => handleDeleteLegend(legend.id)}
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