import React from "react";
import { Box, Flex, Heading, Text, SimpleGrid, Icon, Image } from "@chakra-ui/react";
import { FaRegEdit, FaRegChartBar, FaPlusCircle, FaUserFriends } from "react-icons/fa"; 
import iconBox from "assets/img/iconbox.png"

const Features = () => {
  const cards = [
    {
      icon: FaPlusCircle,
      text: "Create a journal through the journals tab. Choose a title, category, and cover photo that represents what you want to track the best.",
    },
    {
      icon: FaRegEdit,
      text: "Update your journals daily through the dashboard or journals tabs. Update your legends with relevant tags and colors and apply them to your pixels.",
    },
    {
      icon: FaRegChartBar,
      text: "View your journal data. The more you update your journals, the more data will be organized visually on your dashboard.",
    },
    {
      icon: FaUserFriends, 
      text: "Connect with friends who are on the same self improvement journey you are on!", 
    },
  ];

  return (
    <Flex
      w="100vw"
      minH="100vh" 
      bg="white"
      flexDirection="column"
      p={10}
      
    >
      <Heading size="md" color="#a46cf5" textAlign="left">
        How it works
      </Heading>
      <Heading mb="20" size="2xl" mt={4} textAlign="left">
        Add, Update, <br /> and View Your Progression
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10} mt={10}>
        {cards.map((card, index) => (
          <Box
            key={index}
            p={6}
            borderRadius="3xl"
            bg="white"
            boxShadow="xl"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box position="relative">
              <Image src={iconBox} alt="Icon Box" h={{ base: "120px"}}/> 
              <Icon color="white" as={card.icon} w={12} h={12} position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" /> 
            </Box>
            <Text mt={6} pl="5" pr="5" textAlign="center">
              {card.text}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Features;