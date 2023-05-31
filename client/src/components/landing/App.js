import React from 'react';
import Header from './Header';
import Footer from '../Footer.jsx';
import Features from './Features';
import About from './About';
import Navbar from './Navbar';
import LandingImg from '../../img/gradient.jpeg';
import styled from 'styled-components';

const LandingPage = () => {
    return (
        <div>
            <Navbar />
            <Banner>
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
margin: 3rem;
border-radius: 1rem;
box-shadow: 0 0 1rem rgba(0,0,0,0.5);
height: 85vh;
@media (max-width: 640px) {
  height: 100%;
padding-bottom: 2rem;
}
`;