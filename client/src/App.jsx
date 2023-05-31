import './index.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import styled from "styled-components";
import LandingPage from './components/landing/App';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'

// scroll to hash
// function useScrollToHash() {
//     const { hash } = useLocation();

//     useEffect(() => {
//         setTimeout(() => {
//           const id = hash.replace('#', '');
//           const element = document.getElementById(id);
//           if (element) element.scrollIntoView({ behavior: 'smooth' });
//         }, 0);
//       }, [hash]);
//     }
    function App() {
        return (
          <Router>
            <ScrollToHash />
            <ChakraProvider>
              <Switch>
                <Route path="/" element={<LandingPage />} />
                </Switch>
            </ChakraProvider>
            </Router>
        );
    }
    function ScrollToHash() {
        useScrollToHash();
        return null;
    }
    export default App;

        const Container = styled.div``;