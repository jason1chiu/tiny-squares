/*eslint-disable*/
import React from "react";
import {
  Flex,
  Link,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Footer() {
  let textColor = useColorModeValue("gray.400", "white");
  let linkColor = useColorModeValue({ base: "gray.400", lg: "white" }, "white");

  return (
    <Flex
      zIndex='3'

      flexDirection={{
        base: "column",
        lg: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent='space-between'
      px={{ base: "30px", md: "0px" }}
      pb='30px'>
      <Text
        color={textColor}
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", lg: "0px" }}>
        {" "}
        &copy; {1900 + new Date().getYear()}
        <Text as='span' fontWeight='500' ms='4px'>
        <Text as='span' fontWeight='500' ms='4px'>
            TinySquares. All Rights Reserved.
            <Link
            mx='3px'
            color={textColor}
            href='https://github.com/jason1chiu/tiny-squares/tree/main'
            target='_blank'
            fontWeight='700'>
            TinySquares
            </Link>
        </Text>        
        </Text>
      </Text>
     
    </Flex>
  );
}