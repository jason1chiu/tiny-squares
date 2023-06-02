import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdHome,
  MdLibraryAdd,
  MdLock,
  MdOutlineCalendarMonth,
  MdMenuBook
} from "react-icons/md";

// Admin views
import Calendar from "views/admin/calendar";
import Create from "views/admin/create";
import Journals from "./views/admin/journals";
import Dashboard from "views/admin/dashboard";
import Store from "views/admin/store"

import CancelPage from "views/admin/cancelOrderPage";
//auth views
// import SignIn from "./views/admin/auth/SignIn.js";
// import SignUp from "./views/admin/auth/SignUp.js";
// import Landing from "./views/admin/auth/Landing.js";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/dashboard",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Dashboard,
  },
  {
      name: "Journals",
      layout: "/admin",
      path: "/admin/journals",
      icon: <Icon as={MdMenuBook} width='20px' height='20px' color='inherit' />,
      component: Journals,
  },
  {
      name: "Create",
      layout: "/admin",
      path: "/create",
      icon: <Icon as={MdLibraryAdd} width='20px' height='20px' color='inherit' />,
      component: Create,
  },
  {
    name: "Store",
    layout: "/admin",
    path: "/store",
    icon: <Icon as={MdLibraryAdd} width='20px' height='20px' color='inherit' />,
    component: Store,
  },
  // {
  //   name: "Cancel",
  //   layout: "/admin",
  //   path: "/store/cancel",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: CancelPage,
  // },
  
  {
      name: "Calendar",
      layout: "/admin",
      path: "/calendar",
      icon: <Icon as={MdOutlineCalendarMonth} width='20px' height='20px' color='inherit' />,
      component: Calendar,
  },
  // {
  //     name: "Signin",
  //     layout: "/auth",
  //     path: "/sign-in",
  //     icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
  //     component: SignIn,
  // },
  // {
  //     name: "Signup",
  //     layout: "/auth",
  //     path: "/sign-up",
  //     icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
  //     component: SignUp,
  // },
  // {
  //     name: "Landing",
  //     layout: "/auth",
  //     path: "/landing",
  //     icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
  //     component: Landing,
  // },
];

export default routes;