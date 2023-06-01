import {
    Avatar,
    Box,
    Flex,
    FormLabel,
    Icon,
    Select,
    Grid,
    useColorModeValue,
  } from "@chakra-ui/react";

  import Usa from "assets/img/purple.png";
  import React from "react";
  import { PieChart } from "views/admin/dashboard/components/PieChart";
import { Profile } from "views/admin/dashboard/components/Profile";
import { Journals } from "views/admin/dashboard/components/Journals";
import { ColumnsTable } from "views/admin/dashboard/components/ColumnsTable";

    export default function Overview() { 
        return
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 1fr 1.62fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>