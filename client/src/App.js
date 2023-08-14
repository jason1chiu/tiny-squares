import React from "react";
import "assets/css/index.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import CartProvider from "components/shared/store/js/CartContext";
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
      <CartProvider>
        <ChakraProvider theme={theme}>
          <React.StrictMode>
            <BrowserRouter>
              <Switch>
                <Route path="/success" component={SuccessPage} />
                <Route path="/cancel" component={CancelPage} />
                <Route path="/auth" component={AuthLayout} />

                {user ? (
                  <>
                    <Route path="/admin" component={AdminLayout} />
                    <Redirect from="/" to="/admin/dashboard" exact />
                  </>
                ) : (
                  <>
                    <Route path="/TinySquares" component={LandingPage} />
                    <Redirect from="/" to="/auth/sign-in" exact />
                  </>
                )}
              </Switch>
            </BrowserRouter>
          </React.StrictMode>
        </ChakraProvider>
      </CartProvider>
    </ApolloProvider>
  );
}
