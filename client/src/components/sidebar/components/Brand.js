import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

import { HSeparator } from "components/seperator/Seperator";

export function SidebarBrand() {

    let logoColor = useColorModeValue("navy.700", "white");

    return (
        <Flex align='center' direction='column'>
            {/* LOGO */}
            <HSeparator mb='20px' />
            </Flex>
    );
}

export default SidebarBrand;