import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdHome,
  MdLock,
  MdMenuBook
} from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import Journals from "views/admin/journals";
import Dashboard from "views/admin/dashboard";
import Friends from "views/admin/friends"
import SignIn from "views/auth/signIn";
import SignUp from "views/auth/signUp";


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
    path: "/journals",
    icon: <Icon as={MdMenuBook} width='20px' height='20px' color='inherit' />,
    component: Journals,
  },
  {
    name: "Friends",
    layout: "/admin",
    path: "/friends",
    icon: <Icon as={FaUserFriends} width='20px' height='20px' color='inherit' />,
    component: Friends,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignIn,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "/sign-up",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignUp,
  },
];

const sidebarRoutes = routes.filter(route => route.name !== "Sign In" && route.name !== "Sign Up");

export default routes;
export { sidebarRoutes };