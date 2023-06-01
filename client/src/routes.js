import React from "react";
import { Icon } from "@chakra-ui/react";
import {
    MdHome,
    MdLibraryAdd,
    MdLock,
    MdOutlineCalendarMonth,
    MdMenuBook
  } from "react-icons/md";

  import Dashboard from "views/admin/dashboard/Dashboard.js";

  //auth 

  const routes = [
    {
        name: "Dashboard",
        layout: "/admin",
        path: "/dashboard",
        icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
        component: Dashboard,
    },
];

export default routes;