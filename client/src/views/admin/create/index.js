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
import Preview from "components/card/preview"
import Card from "components/card/card";
import P2 from "assets/img/purple.jpg"
import NewCard from "views/admin/create/components/NewCard";

export default function CreateJournal() {
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
                                Create New
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
                                    Mood
                                </Link>
                                <Link
                                    color={textColorBrand}
                                    fontWeight='500'
                                    me={{ base: "34px", md: "44px" }}
                                    to='#'>
                                    Health
                                </Link>
                                <Link
                                    color={textColorBrand}
                                    fontWeight='500'
                                    me={{ base: "34px", md: "44px" }}
                                    to='#collectibles'>
                                    Habit
                                </Link>
                            </Flex>
                        </Flex>
                        <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>

                            <NewCard />
                           
                        </SimpleGrid>
                    </Flex>
                    <Flex direction='column'>

                        <Flex
                            mt='45px'
                            mb='20px'
                            justifyContent='space-between'
                            direction={{ base: "column", md: "row" }}
                            align={{ base: "start", md: "center" }}>
                            <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                                Mood Journals
                            </Text>
                            
                        </Flex>
                        <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>

                            {/* ToDo: insert functionality to add new journals */}
                            <Preview
                                name='Mood'
                                author='By John Doe'
                                image={P2}

                            />
                            <Preview
                                name='Pain'
                                author='By John Doe'
                                image={P2}

                            />
                            <Preview
                                name='Workouts'
                                author='By John Doe'
                                image={P2}
                            />
                        </SimpleGrid>
                    </Flex>
                    <Flex direction='column'>
                        <Flex
                            mt='45px'
                            mb='20px'
                            justifyContent='space-between'
                            direction={{ base: "column", md: "row" }}
                            align={{ base: "start", md: "center" }}>
                            <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                                Health Journals
                            </Text>

                        </Flex>
                        <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>

                            {/* ToDo: insert functionality to add new journals */}
                            <Preview
                                name='Mood'
                                author='By John Doe'
                                image={P2}

                            />
                            <Preview
                                name='Pain'
                                author='By John Doe'
                                image={P2}

                            />
                            <Preview
                                name='Workouts'
                                author='By John Doe'
                                image={P2}
                            />
                        </SimpleGrid>
                    </Flex>
                    <Flex direction='column'>
                        <Flex
                            mt='45px'
                            mb='20px'
                            justifyContent='space-between'
                            direction={{ base: "column", md: "row" }}
                            align={{ base: "start", md: "center" }}>
                            <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                                Habit Journals
                            </Text>

                        </Flex>
                        <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>

                            {/* ToDo: insert functionality to add new journals */}
                            <Preview
                                name='Mood'
                                author='By John Doe'
                                image={P2}

                            />
                            <Preview
                                name='Pain'
                                author='By John Doe'
                                image={P2}

                            />
                            <Preview
                                name='Workouts'
                                author='By John Doe'
                                image={P2}
                            />
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