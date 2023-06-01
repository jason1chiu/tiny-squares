import React from 'react';
import ReactDOM from 'react-dom';
import "./assets/css/index.css";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "./layouts/auth/index";
import AdminLayout from "./layouts/admin/index";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
        <BrowserRouter>
          <Switch>
            <Route path={`/auth`} component={AuthLayout} />
            <Route path={`/admin`} component={AdminLayout} />
            <Redirect from='/' to='/' />
          </Switch>
        </BrowserRouter>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);