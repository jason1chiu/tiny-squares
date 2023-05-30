import React from 'react';
import Header from './Header';
import Footer from '../Footer.jsx';
import Features from './Features';
import About from './About';
import Navbar from './Navbar';
import LandingImg from '../../imgs/landing.png';
import styled from 'styled-components';

const LandingPage = () => {
    return (
        <div>
            <Banner>
                <Navbar />
                <Header />
            </Banner>
            <Features />
            <About />
            <Footer />
        </div>
    );
}

export default LandingPage;

const Banner = styled.div`
background: url(${LandingImg});
background-size: cover;
background-position: center;
margin: 1rem;
height: 100vh;
@media (max-width: 640px) {
  height: 100%;
padding-bottom: 2rem;
}
`;