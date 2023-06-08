import React from 'react';
import Store from 'components/shared/store/components/Store'
import StoreHeader from 'components/shared/store/components/StoreHeader'
import { Box, Flex, Grid } from '@chakra-ui/react'

export default function Overview() {
  return (
    <>
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
          </Flex>
    
          </Grid>
        <StoreHeader />
        <Store />

       
      </Box> 
    </>
  )
}