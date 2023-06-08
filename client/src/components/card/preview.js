import {
    Box,
    Button,
    Flex,
    Icon,
    Image,
    Text,
    useColorModeValue,
    Tooltip,
  VStack,
  } from "@chakra-ui/react";
  import { MdClose, MdEdit } from "react-icons/md";
  import Card from "components/card/card";
  import React, { useState } from "react";



  export default function Preview(props) {
    const { image, name, author, onViewClick, onDeleteClick } = props;
    const textColor = useColorModeValue("navy.700", "white");
    

    return (
      <Card p='20px'>
        <Flex direction={{ base: "column" }} justify='center'>
          <Box mb={{ base: "20px", "2xl": "20px" }} position='relative'>
            <Image
              src={image}
              w={{ base: "100%", "3xl": "100%" }}
              h={{ base: "100%", "3xl": "100%" }}
              borderRadius='20px'
            />
        </Box>
        <Flex flexDirection='column' justify='space-between' h='100%'>
          <Flex
            justify='space-between'
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mb='auto'>
            <Flex direction='column'>
              <Text
                color={textColor}
                fontSize={{
                  base: "xl",
                  md: "lg",
                  lg: "lg",
                  xl: "lg",
                  "2xl": "md",
                  "3xl": "lg",
                }}
                mb='5px'
                fontWeight='bold'
                me='14px'>
                {name}
              </Text>
              <Text
                color='secondaryGray.600'
                fontSize={{
                  base: "sm",
                }}
                fontWeight='400'
                me='14px'>
                {author}
              </Text>
            </Flex>
            <VStack position="absolute" right={8} top={8} spacing={2}>
            <Tooltip hasArrow label="Delete" fontSize="sm">
            <Button size="xs" colorScheme="purple" onClick={onDeleteClick} >
              <Icon as={MdClose}/>
            </Button>
          </Tooltip>
          <Tooltip hasArrow label="Edit" fontSize="sm">
            <Button size="xs" colorScheme="purple" >
              <Icon as={MdEdit} />
            </Button>
          </Tooltip>
          
        </VStack>
            <Button
                variant='darkBrand'
                color='white'
                fontSize='sm'
                fontWeight='500'
                borderRadius='70px'
                px='24px'
                py='5px'
                onClick={onViewClick}>
                VIEW
            </Button>
          </Flex>
        </Flex>
        
      </Flex>
    </Card>
  );
}
