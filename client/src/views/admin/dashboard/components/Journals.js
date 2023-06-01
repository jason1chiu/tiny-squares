import { Text, useColorModeValue } from "@chakra-ui/react";

import Journal1 from "assets/img/purple.png";
import Journal2 from "assets/img/purple.png";
import Journal3 from "assets/img/purple.png";
import Card from "components/card/Card.js";
import React from "react";
import Project from "views/admin/profile/components/Project";

export default function Journals(props) {
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'>
        All Journals
      </Text>
      <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
        Make edits or changes
      </Text>
      <Journal 
      boxShadow={cardShadow}
      mb='20px'
      image={Journal1}
      link='#'
        ranking='1'
        title='Journal 1'
        />
        <Journal
        boxShadow={cardShadow}
        mb='20px'
        image={Journal2}
        link='#'
        ranking='2'
        title='Journal 2'
        />
        <Journal
        boxShadow={cardShadow}
        mb='20px'
        image={Journal3}
        link='#'
        ranking='3'
        title='Journal 3'
        />
    </Card>
    );
    }