import { Box, Flex, Stack } from "@chakra-ui/react";

import Brand from "./Brand";
import Links from ".Links";

import React from "react";

function SidebarContent(props) {
    const { routes } = props;
    // SIDEBAR
    return (
      <Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
        <Brand />
        <Stack direction='column' mb='auto' mt='8px'>
          <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
            <Links routes={routes} />
          </Box>
        </Stack>

        <Box
        ps='20px'
        pe={{ md: "16px", "2xl": "0px" }}
        mt='60px'
        mb='40px'
        borderRadius='30px'>
        <SidebarCard />
      </Box>
    </Flex>
  );
}

export default SidebarContent;