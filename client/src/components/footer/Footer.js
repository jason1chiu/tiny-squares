import React from "react";
import { Box, Flex, Text, Center, Image, Link } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import logo from "assets/img/ts.png";

const Footer = () => {
    return (
        <Box bg="#785bc8" color="white" p={6}>
            <Center>
                <Flex alignItems="center">
                    <Image src={logo} alt="TinySquares Logo" boxSize="60px"  />
                    <Text fontSize="3xl" fontWeight="bold">
                        TinySquares
                    </Text>
                    <Link href="https://github.com/jason1chiu/tiny-squares" ml={4} isExternal>
                        <FaGithub size="24px" />
                    </Link>
                </Flex>
            </Center>
            <Center>
                <Text mt={2} fontSize="sm" fontWeight="normal">
                    © 2023 TinySquares. All rights reserved.
                </Text>
            </Center>
        </Box>
    );
};

export default Footer;