import { Avatar, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/card.js";
import React from "react";
import profile from "assets/img/bannercover.png";
import { useAuth } from "contexts/auth.context";
import { useEffect, useState } from "react";
import bImage from 'assets/img/rand/b.jpg';
import cImage from 'assets/img/rand/c.jpg';
import dImage from 'assets/img/rand/d.jpg';
import eImage from 'assets/img/rand/e.jpg';
import { motion } from 'framer-motion';

const images = [
  bImage,
  cImage,
  dImage,
  eImage
];

function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}
const MotionBox = motion(Box);

export default function Profile(props) {
  const { banner, avatar, name, entries, journals } = props;
  let { user, setUser } = useAuth();
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  
  
  const [bgImage, setBgImage] = useState(getRandomImage());

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImage(getRandomImage());
    }, 15000); 

    return () => clearInterval(interval); 
  }, []);
  
  return (
    <Card mb={{ base: "0px", lg: "20px" }} align='center'>
      <MotionBox
        bgImage={`url(${bgImage})`}
        bgSize='cover'
        borderRadius='16px'
        h='131px'
        w='100%'
        key={bgImage} 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        transition={{ duration: 0.5 }} 
      />
      <Avatar
        mx='auto'
        h='87px'
        w='87px'
        mt='-43px'
        border='4px solid'
        borderColor={borderColor}
        name={user && user.user ? user.user.username : 'Default Name'}
      />
      <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
        {name}
      </Text>
      <Flex w='max-content' mx='auto' mt='26px'>
        <Flex mx='auto' me='60px' align='center' direction='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {entries}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Entries
          </Text>
        </Flex>
        <Flex mx='auto' me='60px' align='center' direction='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {journals}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Journals
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}