// React import
import React, { useEffect, useState } from "react";

// Chakra import
import {
  Box,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
  Link
} from "@chakra-ui/react";

// Apollo import
import { useLazyQuery } from "@apollo/client";

// File import
import Banner from "views/admin/journals/components/Banner";
import YourJournalCard from "views/admin/journals/components/YourJournalCard";
import P2 from "assets/img/purple.jpg";
import { useAuth } from "contexts/auth.context";
import { GET_ME } from "utils/queries";
import NewCard from "views/admin/journals/components/NewCard";

export default function JournalPage() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  // const [journals, setJournals] = useState([]);
  let { user, journals, setJournals } = useAuth();
  let [me, { data, loading }] = useLazyQuery(GET_ME);
  let { categories } = useAuth();

  useEffect(() => {
    me().then(data => {
      setJournals(data.data.me.journals);
    })
  }, [])

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
                Create New
              </Text>
              <Flex
                align='center'
                me='20px'
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}>
                {categories.map(category =>
                  <Link
                    color={textColorBrand}
                    fontWeight='500'
                    me={{ base: "34px", md: "44px" }}
                    to='#'>
                    {category}
                  </Link>
                )}
              </Flex>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>

              <NewCard />

            </SimpleGrid>

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
              {journals.map((journal) => (
                <YourJournalCard journal={{ ...journal, image: P2 }} />
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