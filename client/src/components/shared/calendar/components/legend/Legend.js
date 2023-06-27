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
  Collapse,
  IconButton,
} from "@chakra-ui/react";
import { GET_LEGENDS } from "utils/queries";
import { CREATE_LEGEND, UPDATE_LEGEND, DELETE_LEGEND } from "utils/mutations";

import { AddIcon, EditIcon, DeleteIcon, CloseIcon, CheckIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { motion } from "framer-motion";

const Legend = ({ journalId, refetchEntries }) => {
  const [color, setColor] = useState("#9164AF");
  const [label, setLabel] = useState("");
  const [selectedLegend, setSelectedLegend] = useState(null);
  const userId = localStorage.getItem("user_id");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { data, refetch, loading, error } = useQuery(GET_LEGENDS, {
    variables: { id: journalId },
  });
  const MotionBox = motion(Box);
  const MotionIconButton = motion(IconButton);
  const [createLegend] = useMutation(CREATE_LEGEND);
  const [updateLegend] = useMutation(UPDATE_LEGEND);
  const [deleteLegend] = useMutation(DELETE_LEGEND);

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
      refetchEntries()
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
    setColor("#9164AF");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <VStack spacing={4}>
      {/* <Heading color={titleColor} size="sm" mb={2} >
        Legend
      </Heading> */}
      <HStack spacing={1}>
        <MotionBox
          alignItems="center"
          justifyContent="center"
          boxSize={7}
          whileHover={{ scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 500 }}
          style={{
            backgroundImage: `
        linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%), linear-gradient(225deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%),
        linear-gradient(${color}, ${color})`,
            backgroundSize: "100% 100%, 100% 100%, auto",
            backgroundPosition: "0",
            backdropFilter: "blur(10px)",
            boxShadow: "5px 5px 10px rgba(0,0,0,0.3)",

            borderRadius: "7px",
          }}
        >
          <Input
            size="sm"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            h="100%"
            w="100%"
            opacity={0}

            borderRadius="md"
            cursor="pointer"
          />
        </MotionBox>
        <Input
          variant="auth"
          placeholder="e.g. Happy"
          value={label}

          onChange={(e) => setLabel(e.target.value)}
        />
        {!selectedLegend ? (
          <MotionIconButton
            icon={<AddIcon />}
            onClick={handleAddLegend}
            color="gray.700"

          />
        ) : (
          <>
            <MotionIconButton
              icon={<CheckIcon />}
              onClick={handleUpdateLegend}
              color="gray.300"
              hoverColor="gray.700"
              size="sm"
            />
            <MotionIconButton
              icon={<CloseIcon />}
              onClick={handleCancelEdit}
              color="gray.300"
              hoverColor="gray.700"
              size="sm"
            />
          </>
        )}
        <MotionIconButton
          icon={<ChevronDownIcon />}
          onClick={() => setIsCollapsed(!isCollapsed)}
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ duration: 0.5 }}
          color="gray.700"

        />
      </HStack>

      <Collapse in={!isCollapsed}>
        {(data?.legends ?? []).map((legend, index) => (
          <HStack pb={3} px={3}
            key={legend._id}
            spacing={4}
            alignItems="center"
            justifyContent="space-between"
          >
            <MotionBox
              d="flex"
              alignItems="center"
              justifyContent="center"
              boxSize={7}
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 500 }}
              style={{
                backgroundImage: `
      linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%), linear-gradient(225deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%),
      linear-gradient(${legend.color}, ${legend.color})`,
                backgroundSize: "100% 100%, 100% 100%, auto",
                backgroundPosition: "0",
                backdropFilter: "blur(10px)",
                boxShadow: "5px 5px 10px rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "7px",
              }}
            >
              <MotionIconButton
                icon={<EditIcon />}
                onClick={() => handleEditLegend(legend)}
                color="white"
                size="sm"
                borderRadius={"7px"}
                bgColor="transparent"
                border="none"
                _hover={{ bg: "transparent" }} // 
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }} // 
              />
            </MotionBox>
            <Text fontSize="sm" color="secondaryGray.500">
              {legend.label}
            </Text>
            <MotionIconButton
              icon={<DeleteIcon />}
              onClick={() => handleDeleteLegend(legend._id)}
              color="gray.300"
              hoverColor="gray.700"

            />
          </HStack>
        ))}
      </Collapse>
    </VStack>
  );
};

export default Legend;
