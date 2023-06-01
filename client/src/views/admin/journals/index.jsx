import React from "react";
import {
    Box,
    Button,
    Flex,
    Grid,
    Link,
    Text,
    useColorModeValue,
    SimpleGrid,
  } from "@chakra-ui/react";

  import Banner from "views/admin/create/components/Banner";

  import Card from "components/card/card";

  export default function JournalPage() {
    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorBrand = useColorModeValue("brand.500", "white");
    return (
      <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
        {/* Main Fields */}
        <Grid
          mb='20px'
          gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
          gap={{ base: "20px", xl: "20px" }}
          display={{ base: "block", xl: "grid" }}>
          <Flex
            flexDirection='column'
            gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>

<Banner />

<Flex direction='column'>
            <Flex
              mt='45px'
              mb='20px'
              justifyContent='space-between'
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}>
              <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                Blank
              </Text>
              <Flex
                align='center'
                me='20px'
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#'>
                  Blank
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#'>
                  Blank
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#collectibles'>
                  Blank
                </Link>
                <Link color={textColorBrand} fontWeight='500' to='#sports'>
                  Blank
                </Link>
              </Flex>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>

                {/* Card component */}
            </SimpleGrid>

            <Text
              mt='45px'
              mb='36px'
              color={textColor}
              fontSize='2xl'
              ms='24px'
              fontWeight='700'>
              Recently Added
            </Text>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>

                {/* Card component */}

            </SimpleGrid>

            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap='20px'
              mb={{ base: "20px", xl: "0px" }}>

                {/* Card component */}

            </SimpleGrid>
            </Flex>
        </Flex>
        <Flex flexDirection='column'
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}>

<Card px='0px' mb='20px'>
            {/* content */}
          </Card>

          <Card p='0px'>
            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify='space-between'
              w='100%'
              px='22px'
              py='18px'>
              <Text color={textColor} fontSize='xl' fontWeight='600'>
                History
              </Text>
              <Button variant='action'>See all</Button>
            </Flex>
            </Card>
        </Flex>
      </Grid>
      </Box>
  );
}