import React from "react";
import {
  Box,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

import Banner from "views/admin/journals/components/Banner";
import YourJournalCard from "views/admin/journals/components/YourJournalCard";
import P2 from "assets/img/jp.png";
import { useQuery } from "@apollo/client";
import { GET_JOURNALS } from "utils/queries";
import NewCard from "views/admin/journals/components/NewCard";

export default function JournalPage() {
  const textColor = useColorModeValue("secondaryGray.500", "white");
  const titleColor = useColorModeValue("brand.700", "white");

  const { data } = useQuery(GET_JOURNALS);

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        >
          <Banner />

          <Flex direction="column">
            <Flex
              mt="45px"
              mb="20px"
              justifyContent="space-between"
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}
            >
              <Text
                color={titleColor}
                fontSize="2xl"
                ms="24px"
                fontWeight="700"
              >
                Create New
              </Text>
              <Flex
                align="center"
                me="20px"
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}
              >
                {/* Other components */}
              </Flex>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
              <NewCard />
            </SimpleGrid>

            <Flex
              mt="45px"
              mb="20px"
              justifyContent="space-between"
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}
            >
              <Text
                color={titleColor}
                fontSize="2xl"
                ms="24px"
                fontWeight="700"
              >
                Your Journals
              </Text>
            </Flex>

            {data?.journals && data.journals.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
                {data.journals.map((journal) => (
                  <YourJournalCard key={journal._id} journal={journal} />
                ))}
              </SimpleGrid>
            ) : (
              <Text color={textColor} fontSize="lg" ms="24px" mt="20px">
                You have no journals yet!
              </Text>
            )}
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
        ></Flex>
      </Grid>
    </Box>
  );
}
