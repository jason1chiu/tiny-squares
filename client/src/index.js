import React from 'react';
import ReactDOM from 'react-dom';
import "assets/css/index.css";

import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
// import AuthLayout from "./layouts/auth";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import CartProvider from "./views/admin/store/js/CartContext"
import CancelPage from "./views/admin/cancelOrderPage/"
import SuccessPage from "./views/admin/successOrderPage"
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";

// Create an Apollo Client and specify the connection to your GraphQL API
const client = new ApolloClient({
  uri: 'localhost:3000/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem('id_token') ? `Bearer ${localStorage.getItem('id_token')}` : "",
  },
});

// let user = localStorage.getItem("user");
// user = JSON.parse(user);
ReactDOM.render(
  <ApolloProvider client={client} >
    <CartProvider>
      <ChakraProvider theme={theme}>
        <React.StrictMode>
          <HashRouter>
            <Switch>
              <Route path={`/auth`} component={AuthLayout} />
              <Route path={`/admin`} component={AdminLayout} />
              <Route path={`/cancel`} component={CancelPage} />
              <Route path={`/success`} component={SuccessPage} />
              <Redirect from='/' to='/admin/dashboard' />
            </Switch>
          </HashRouter>
        </React.StrictMode>
      </ChakraProvider>
    </CartProvider>
  </ApolloProvider>,
  document.getElementById("root")
);