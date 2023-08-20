import React from "react";
import { Button, Box, Flex, Image, Heading, Text, useColorModeValue, useBreakpointValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import bannerimg from "assets/img/1.png";
import buttonimg from "assets/img/2.png"
import logo from "assets/img/ts.png";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@chakra-ui/icons";
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

const welcomeVariant = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 1.2 } },
};
const pulseVariant = { // Define this outside of the component
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 2,
      repeat: Infinity
    }
  }
};
export default function LandingPage() {
  const transformValue = useBreakpointValue({
    base: 'scale(1)',
    md: 'scale(1.2) translateX(3.5%)',
  });
  const tColor = useColorModeValue("brand.800", "white");
  const text = "Your life, \n one pixel at a time";
  return (
    <Flex
      w="100%"
      h="100vh"
      bg={`url(${bannerimg}) no-repeat right bottom / cover`}
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="90vw"
        h={{ base: "80vh", md: "90vh", lg: "90vh" }}
        borderRadius="3xl"
        bgColor="white"
        boxShadow="xl"
        p={6}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        position="relative"
      >
        <Box
          w="150px"
          h="70px"
          position="absolute"
          top={{ base: "-2px", lg: "-2px" }}
          right={{ base: "-2px", lg: "-2px" }}
          bg={`url(${buttonimg}) no-repeat center / cover`}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderBottomLeftRadius="lg"
          zIndex="100"

        >
          <MotionButton as={Link} to="/auth/sign-up" variant="brand"
            color="white"
            fontSize="md"
            fontWeight="600"
            borderRadius="70px" initial="hidden" animate="visible"
            background="transparent"
            mx="8px"
            p="16px"
          >
            Get Started
            <MotionBox as={ArrowRightIcon} ml={2} variants={pulseVariant} animate="animate" />
          </MotionButton>
        </Box>
        <Box
          w={{ base: "100%", md: "50%" }}
          p={{ base: 4, md: 10 }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Image src={logo} alt="Logo" w={{ base: "20%", md: "10%" }} mb="12" />
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
            <motion.div
    variants={welcomeVariant}
    initial="hidden"
    animate="visible"
  >
    <Text mt={8} textAlign="left" fontSize="xl">Welcome to <Box as="span" fontWeight="bold">TinySquares</Box></Text>
  </motion.div>
            <Box mt={8}>
            <MotionButton
  as={Link}
  to="/auth/sign-in"
  initial="hidden"
  animate="visible"
  variants={buttonVariant}
  bg="gray.200" 
  
  _hover={{ bg: "gray.300" }} 
>
  Sign In
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
          bgColor="transparent" 
        >
          <MotionImage
            src={bannerimg}
            objectFit="cover"
            objectPosition="right bottom"
            transform={transformValue} // Apply responsive value here
            w="100%"
            h="100%"
            position="absolute"
            top={0}
            left={0}
            borderRadius="80px"
            initial="hidden" animate="visible"
          />

        </Box>
      </Box>
    </Flex>
  );
}