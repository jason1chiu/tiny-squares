import React from "react";
import { Button, Box, Flex, Image, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import bannerimg from "assets/img/jpb.png";
import logo from "assets/img/ts.png";
import { motion } from "framer-motion";
import graphic from "assets/img/graphic.png";

const MotionImage = motion(Image);
const MotionBox = motion(Box);
const MotionButton = motion(Button);

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const letter = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const buttonVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, delay: 1 } },
};

const graphicVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
};

export default function LandingPage() {
  const tColor = useColorModeValue("brand.800", "white");
  const text = "Your life, \n one pixel at a time";
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
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Box
          w={{ base: "100%", md: "50%" }}
          p={{ base: 4, md: 10 }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Image src={logo} alt="Logo" w={{ base: "30%", md: "10%" }} />
          <MotionBox display="flex" flexDirection="column" justifyContent="center" flex="1" variants={sentence} initial="hidden" animate="visible">
            <Heading size="3xl" textAlign="left">
              {text.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line.split("").map((char, index) => (
                    <motion.span key={index} variants={letter}>
                      {char}
                    </motion.span>
                  ))}
                  <br />
                </React.Fragment>
              ))}
            </Heading>
            <Text mt={8} textAlign="left" size="lg">Welcome to TinySquares</Text>
            <Box mt={4}>
              <MotionButton as={Link} to="/auth/sign-in" variants={buttonVariant} initial="hidden" animate="visible">
                Sign In
              </MotionButton>
              <MotionButton as={Link} to="/auth/sign-up" m={2} variants={buttonVariant} initial="hidden" animate="visible">
                Sign Up
              </MotionButton>
            </Box>
          </MotionBox>
        </Box>
        <Box
          w={{ base: "0", md: "50%" }}
          h="100%"
          p={10}
          borderRadius="lg"
          overflow="hidden"
          position="relative"
          display={{ base: "none", md: "block" }}
        >
          <Image src={bannerimg} objectFit="cover" w="100%" h="100%" position="absolute" top={0} left={0} borderRadius="3xl" />
          <MotionImage src={graphic} objectFit="cover" w="80%" h="80%" position="absolute" top="10%" left="10%" borderRadius="3xl" variants={graphicVariant} initial="hidden" animate="visible" />
        </Box>
      </Box>
    </Flex>
  );
}