import React from 'react';
import ReactDOM from 'react-dom';
import "assets/css/index.css";

import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
// import AuthLayout from "./layouts/auth";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
// import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";

// let user = localStorage.getItem("user");
// user = JSON.parse(user);
ReactDOM.render(
    <ChakraProvider theme={theme}>
      {/* <AuthProvider userData={user}> */}
      <React.StrictMode>
        {/* <ThemeEditorProvider> */}
          <HashRouter>
            <Switch>
              <Route path={`/auth`} component={AuthLayout} />
              <Route path={`/admin`} component={AdminLayout} />
              <Redirect from='/' to='/admin/dashboard' />
              </Switch>
        </HashRouter>
      {/* </ThemeEditorProvider> */}
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);