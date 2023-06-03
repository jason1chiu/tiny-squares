import React, { useEffect, useState } from "react";
import {
    Box,
    Flex,
    Grid,
    Text,
    useColorModeValue,
    SimpleGrid,
  } from "@chakra-ui/react";

  import Banner from "views/admin/create/components/Banner";
import YourJournalCard from "views/admin/journals/components/YourJournalCard";
import P2 from "assets/img/purple.jpg";

  export default function JournalPage() {
    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const [journals, setJournals] = useState([]);
    // const textColorBrand = useColorModeValue("brand.500", "white");
    useEffect(() => {
      // TODO: Fetch journals from API and set them to state
      // This is placeholder data until you have actual data from your API
      setJournals([
        { name: 'Mood', author: 'By John Doe', image: P2 },
        { name: 'Pain', author: 'By John Doe', image: P2 },
        { name: 'Workouts', author: 'By John Doe', image: P2 },
      ]);
    }, []);
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
                Your Journals
              </Text>
             
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>

{/* ToDo: insert functionality to add new journals */}
{/* <YourJournalCard journal={yourJournalObject} /> */}
{journals.map((journal) => (
  <YourJournalCard journal={journal} />
))}
            </SimpleGrid>

            </Flex>
        </Flex>
        <Flex flexDirection='column'
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}>


        </Flex>
      </Grid>
      </Box>
  );
}