import React, { useState } from "react";

import { useQuery, useMutation } from "@apollo/client";
import {
  Box,
  Input,
  Button,
  VStack,
  HStack,
  Text,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { GET_LEGENDS } from "utils/queries";
import { CREATE_LEGEND, UPDATE_LEGEND, DELETE_LEGEND } from "utils/mutations";

const Legend = ({ journalId }) => {
  const [color, setColor] = useState("#000000");
  const [label, setLabel] = useState("");
  const [selectedLegend, setSelectedLegend] = useState(null);
  const userId = localStorage.getItem("user_id");

  const { data, refetch, loading, error } = useQuery(GET_LEGENDS, {
    variables: { id: journalId },
  });

  const [createLegend] = useMutation(CREATE_LEGEND);
  const [updateLegend] = useMutation(UPDATE_LEGEND);
  const [deleteLegend] = useMutation(DELETE_LEGEND);

  const textColor = useColorModeValue("secondaryGray.500", "white");
  const titleColor = useColorModeValue("navy.700", "white");

  const handleAddLegend = async () => {
    try {
      if (!userId) {
        console.error("User ID is missing or invalid.");
        return;
      }

      await createLegend({
        variables: { label, color, journalId },
      });

      refetch();
      handleCancelEdit();
    } catch (error) {
      console.error("Error creating legend: ", error);
    }
  };

  const handleUpdateLegend = async () => {
    try {
      if (!selectedLegend) {
        console.error("Legend is not selected or invalid.");
        return;
      }

      await updateLegend({
        variables: { legendId: selectedLegend._id, label, color, journalId },
      });

      refetch();
      handleCancelEdit();
    } catch (error) {
      console.error("Error updating legend: ", error);
    }
  };

  const handleDeleteLegend = async (legendId) => {
    try {
      await deleteLegend({
        variables: { legendId, journalId },
      });

      refetch();
    } catch (error) {
      console.error("Failed to delete legend:", error);
    }
  };

  const handleEditLegend = (legend) => {
    setSelectedLegend(legend);
    setLabel(legend.label);
    setColor(legend.color);
  };

  const handleCancelEdit = () => {
    setSelectedLegend(null);
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
        <Input variant="auth"
          size="sm"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          w="60px"
        />
        <Input variant="auth"
  
          placeholder="Happy"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
   
        />
        {!selectedLegend ? (
          <Button
            variant="darkBrand"
            color="white"
            fontSize="sm"
            fontWeight="500"
            borderRadius="70px"
            onClick={handleAddLegend}
          >
            Add
          </Button>
        ) : (
          <>
            <Button
              variant="darkBrand"
              color="white"
              fontSize="sm"
              fontWeight="500"
              borderRadius="70px"
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

      {(data?.legends ?? []).map((legend, index) => (
        <HStack
          key={legend._id}
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
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
          {selectedLegend?._id === legend._id ? (
            <Button
              size="sm"
              borderRadius="md"
              colorScheme="purple"
              onClick={() => handleEditLegend(legend)}
            >
              Edit
            </Button>
          ) : (
            <>
              <Button
                variant="darkBrand"
                color="white"
                fontSize="sm"
                fontWeight="500"
                borderRadius="70px"
                onClick={() => handleEditLegend(legend)}
              >
                Edit
              </Button>
              <Button
                variant="darkBrand"
                color="white"
                fontSize="sm"
                fontWeight="500"
                borderRadius="70px"
                onClick={() => handleDeleteLegend(legend._id)}
              >
                Delete
              </Button>
            </>
          )}
        </HStack>
      ))}
    </VStack>
  );
};

export default Legend;
