import React from "react";
import { Button, Box, Flex, Image, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import bannerimg from "assets/img/jpb.png";
import buttonbg from "assets/img/jpbg.png";
import logo from "assets/img/ts.png";
export default function LandingPage() {
  return (
    <Flex
      w="100%"
      h="100vh"
      bg={`url(${bannerimg}) no-repeat center center`}
      bgSize="cover"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="90vw"
        h="90vh"
        borderRadius="3xl"
        bgColor="white"
        boxShadow="xl"
        p={6}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="relative"
      >
        <Box w="50%" p={10}>
        <Image src={logo} alt="Logo" w="10%" mr={4} position="absolute" top="5" left="12" />
          <Heading size="xl" mx="auto">
            Your life one pixel at a time
          </Heading>
          <Text mt={4}>Subtitle goes here</Text>
          <Box mt={4}>
            <Button as={Link} to="/auth/sign-in" m={2}>
              Sign In
            </Button>
            <Button as={Link} to="/auth/sign-up" m={2}>
              Sign Up
            </Button>
          </Box>
        </Box>
        <Box w="50%" h="100%" p={10} borderRadius="lg" overflow="hidden" position="relative">
          <Image src={bannerimg} objectFit="cover" w="100%" h="100%" position="absolute" top={0} left={0} borderRadius="3xl" />
        </Box>
        <Box
          position="absolute"
          top="-8"
          right="-3"
          pl={4}
          w="20%"
          h="15%"
          bg={`url(${buttonbg}) no-repeat center center`}
          bgSize="150%"
          borderRadius="3xl"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Button as={Link} to="/auth/sign-up" bgColor="white">
            Get Started
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}