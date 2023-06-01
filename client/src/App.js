import './index.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import styled from "styled-components";
import LandingPage from './components/landing/App';
import React from 'react';
import StoreHeader from './components/store/StoreHeader'
import Cancel from './components/store/pages/Cancel'
import Store from './components/store/pages/Store'
import Success from './components/store/pages/Success'
import CartProvider from "./components/store/js/CartContext"

// scroll to hash
function useScrollToHash() {
    const { hash } = useLocation();

    useEffect(() => {
        setTimeout(() => {
          const id = hash.replace('#', '');
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }, [hash]);
    }
    function App() {
        return (
        <CartProvider>
          <Router>
            <ScrollToHash />
            <Container>
              <Routes>
                <Route path="/" element={<LandingPage />} />
              
              </Routes>
            </Container>

            <Container>
            <StoreHeader />
              <Routes>
                <Route path="/store" element={<Store />} />
                <Route path="/store/success" element={<Success />} />
                <Route path="/store/cancel" element={<Cancel />} />
              </Routes>
            </Container>
            </Router>
            </CartProvider>
        );
    }
    function ScrollToHash() {
        useScrollToHash();
        return null;
    }
    export default App;

        const Container = styled.div``;