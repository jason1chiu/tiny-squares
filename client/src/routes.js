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
    // {
    //     name: "Journals",
    //     layout: "/admin",
    //     path: "/journals",
    //     icon: <Icon as={MdMenuBook} width='20px' height='20px' color='inherit' />,
    //     component: Journals,
    // },
    // {
    //     name: "Create",
    //     layout: "/admin",
    //     path: "/create",
    //     icon: <Icon as={MdLibraryAdd} width='20px' height='20px' color='inherit' />,
    //     component: Create,
    // },
    // {
    //     name: "Calendar",
    //     layout: "/admin",
    //     path: "/calendar",
    //     icon: <Icon as={MdOutlineCalendarMonth} width='20px' height='20px' color='inherit' />,
    //     component: Calendar,
    // },
];

export default routes;