import React from "react";
import "assets/css/index.css";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";

import CancelPage from "views/admin/cancelOrderPage/";
import SuccessPage from "views/admin/successOrderPage";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useAuth } from "contexts/auth.context";
import { useCookies } from "react-cookie";
import LandingPage from "views/auth/landing";

// Create an Apollo Client and specify the connection to your GraphQL API

export default function App() {
  let { user } = useAuth();
  let [cookies] = useCookies();
  function getToken(user, cookies) {
    let token = (user && user.token) || cookies.token;
    return token ? `Bearer ${token}` : "";
  }

  const client = new ApolloClient({
    // uri: "https://tinysquares.herokuapp.com/graphql",
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache({ query: true, data: false }),
    headers: {
      authorization: getToken(user, cookies),
    },
  });

  return (
    <ApolloProvider client={client}>
     
        <ChakraProvider theme={theme}>
          <React.StrictMode>
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route path={`/success`}>
                  <SuccessPage />
                </Route>
                <Route path={`/cancel`}>
                  <CancelPage />
                </Route>
                <Route path={`/auth`}>
                  <AuthLayout />
                </Route>
                {!user && <Redirect to="/auth/sign-in" />}
                {user && (
                  <>
                    <Route path={`/admin`}>
                      <AdminLayout />
                    </Route>
                    <Redirect from="/" to="/admin/dashboard" />
                  </>
                )}
              </Switch>
            </BrowserRouter>
          </React.StrictMode>
        </ChakraProvider>
   
    </ApolloProvider>
  );
}
