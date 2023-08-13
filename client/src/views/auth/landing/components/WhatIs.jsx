import React from "react";
import { Box, Flex, Heading, Image, Text, Link } from "@chakra-ui/react";
import bannercover3 from "assets/img/bannercover3.png";
import graphic from "assets/img/graphic.png";

const WhatIs = () => {
  return (
    <Flex
      w="100vw"
      h={{ base: "auto", md: "100vh" }}
      bg={`url(${bannercover3}) no-repeat center center`}
      bgSize="cover"
      alignItems="center"
      justifyContent="space-between"
      direction={{ base: "column", md: "row" }}
      p={{ base: 6, md: 12 }}
    >
      <Box flex="1" display="flex" alignItems="center" justifyContent="center" mb={{ base: 6, md: 0 }}>
        <Image src={graphic} alt="Graphic" objectFit="cover" w="80%" />
      </Box>
      <Box
        flex="1"
        pl={{ base: 0, md: 10 }}
        borderRadius="3xl"
        bg="white"
        p={10}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box pb="25">
          <Heading size="md" textAlign={{ base: "left", md: "right" }} color="#a46cf5">
            What is a pixel journal?
          </Heading>
          <Heading size="2xl" mt={4} textAlign={{ base: "left", md: "right" }}>
            Mindfulness,<br /> Creativity,<br /> Organization, and<br /> Customized Goals
          </Heading>
        </Box>
        <Text mt={10} textAlign="center" fontSize={{ base: "sm", md: "lg" }}>
          A Pixel Journal chart provides an elegant way to represent your daily mood or musings through a vibrant grid. The horizontal axis maps the months, while the vertical axis illustrates the days of the month.  In this grid, each individual square, or pixel, symbolizes your mood (or whatever you like!) on any given day. <br/> <br/> The original concept was invented by{" "}
          <Link href="https://www.instagram.com/passioncarnets/" isExternal color="purple.500">
            @PassionCarnets
          </Link>
          , go check her Instagram account!
        </Text>
      </Box>
    </Flex>
  );
};

export default WhatIs;