import React from 'react';
import "assets/css/index.css";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { AnimatePresence, motion } from "framer-motion";
import CartProvider from "components/shared/store/js/CartContext"
import CancelPage from "views/admin/cancelOrderPage/"
import SuccessPage from "views/admin/successOrderPage"
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useAuth } from 'contexts/auth.context';

// Create an Apollo Client and specify the connection to your GraphQL API

export default function App() {

  let { user } = useAuth();
  const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql',
    cache: new InMemoryCache(),
    headers: {
      authorization: user ? `Bearer ${user.token}` : "",
    },
  });
  const pageVariants = {
    initial: {
      opacity: 0,
      x: "-100vw",
      scale: 0.8
    },
    in: {
      opacity: 1,
      x: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      x: "100vw",
      scale: 1.2
    }
  };
  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 1 
  };
  return (
    <ApolloProvider client={client} >
      <CartProvider>
        <ChakraProvider theme={theme}>
          <React.StrictMode>
            <BrowserRouter>
              <AnimatePresence exitBeforeEnter>
                <Switch>
                  <Route path={`/auth`}>
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <AuthLayout />
                    </motion.div>
                  </Route>
                  {!user &&
                    <Redirect to='/auth/sign-in' />
                  }
                  <Route path={`/admin`}>
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <AdminLayout />
                    </motion.div>
                  </Route>
                  <Route path={`/cancel`}>
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <CancelPage />
                    </motion.div>
                  </Route>
                  <Route path={`/success`}>
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <SuccessPage />
                    </motion.div>
                  </Route>
                  <Redirect from='/' to='/admin/dashboard' />
                </Switch>
              </AnimatePresence>
            </BrowserRouter>
          </React.StrictMode>
        </ChakraProvider>
      </CartProvider>
    </ApolloProvider>
  )
}
