import './assets/css/index.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import styled from "styled-components";
import LandingPage from "./views/admin/dashboard/"
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <Router>
      {/* <ScrollToHash /> */}
      <ChakraProvider>
        <Switch>
          <Route path="/" element={<LandingPage />} />
        </Switch>
      </ChakraProvider>
    </Router>
  );
}
// function ScrollToHash() {
//   useScrollToHash();
//   return null;
// }
export default App;
