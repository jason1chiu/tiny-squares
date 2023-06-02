import React from "react";

import { Flex, Link, Text } from "@chakra-ui/react";

import banner from "assets/img/purple.jpg";

export default function Banner() {
    return (
        <Flex
          direction='column'
          bgImage={banner}
          bgSize='cover'
          py={{ base: "30px", md: "56px" }}
          px={{ base: "30px", md: "64px" }}
          borderRadius='30px'>
          <Text
            fontSize={{ base: "24px", md: "34px" }}
            color='white'
            mb='14px'
            maxW={{
              base: "100%",
              md: "64%",
              lg: "46%",
              xl: "70%",
              "2xl": "50%",
              "3xl": "42%",
            }}
            fontWeight='700'
            lineHeight={{ base: "32px", md: "42px" }}>
                Discover or Create your own Journal
                </Text>
      <Text
        fontSize='md'
        color='#E3DAFF'
        maxW={{
          base: "100%",
          md: "64%",
          lg: "40%",
          xl: "56%",
          "2xl": "46%",
          "3xl": "34%",
        }}
        fontWeight='500'
        mb='40px'
        lineHeight='28px'>
            Enter in this creative world.
            </Text>
            <Flex align='center'>
            <Link>
          <Text color='white' fontSize='sm' fontWeight='500'>
            Create New Journal
          </Text>
        </Link>   
            </Flex>
            </Flex>
  );
}