import React from 'react';
import "assets/css/index.css";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import CartProvider from "./views/admin/store/js/CartContext"
import CancelPage from "./views/admin/cancelOrderPage/"
import SuccessPage from "./views/admin/successOrderPage"
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// Create an Apollo Client and specify the connection to your GraphQL API
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem('id_token') ? `Bearer ${localStorage.getItem('id_token')}` : "",
  },
});

export default function App() {
  return (
    <ApolloProvider client={client} >
    <CartProvider>
      <ChakraProvider theme={theme}>
        <React.StrictMode>
          <BrowserRouter>
            <Switch>
              <Route path={`/auth`} component={AuthLayout} />
              <Route path={`/admin`} component={AdminLayout} />
              <Route path={`/cancel`} component={CancelPage} />
              <Route path={`/success`} component={SuccessPage} />
              <Redirect from='/' to='/admin/dashboard' />
            </Switch>
          </BrowserRouter>
        </React.StrictMode>
      </ChakraProvider>
    </CartProvider>
  </ApolloProvider>
  )
}
