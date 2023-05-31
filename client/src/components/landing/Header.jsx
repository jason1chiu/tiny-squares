import React, { useState } from 'react';

// import { HeaderImg, Texts } from './LandingStyles';
import HeaderPNG from '../../img/HeaderPNG.png';
import Button from '../partials/Button';
import Login from '../partials/modal/Login';
import SignUp from '../partials/modal/Signup';
import styled from 'styled-components';

const Header = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    return (
        <Container id="landing">
            <Texts>
                <h2>Your Life in</h2>
                <h1>Pixels</h1>
                <p>Capture, create, and chronicle your journey with Tiny Squares, the Pixel Journal. Dive into the world of pixels and let each square color your memories, mood, habits, and more. Experience journaling like never before!</p>
                <ButtonWrapper>
                    <Button onClick={() => setShowLogin(true)}>
                        Login
                    </Button>
                    <Button onClick={() => setShowSignUp(true)}>
                        SignUp
                    </Button>
                </ButtonWrapper>
            </Texts>

            <HeaderImg>
                <img src={HeaderPNG} alt="largeicon" />
            </HeaderImg>

            {showLogin && <Login onClose={() => setShowLogin(false)} />}
            {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
        </Container>
    );
}

export default Header;

const Container = styled.div`
display: flex;
    padding-top: 3.2rem;
    gap: 2rem;
    margin: 0 auto;
    width: 80%;
    max-width: 1200px;
    @media (max-width: 840px) {
        width: 90%;
    }
    @media (max-width: 640px) {
        flex-direction: column;
        align-items: center;
    }`;

const HeaderImg = styled.div`
img {
    transition: transform 400ms ease-in-out;
    width: 25rem;
    @media (max-width: 790px) {
        width: 20rem;
    }
    @media (max-width: 660px) {
        width: 15rem;
    }
    @media (max-width: 640px) {
        width: 80%;
    }
}   
:hover img{
    transform: translateY(-10px);
}

`;

const Texts = styled.div`
flex: 1;
margin-top: 5rem;
h1 {
    font-size:15vw;
    text-transform: uppercase;
    line-height: .9; 
    font-weight: 300;
    text-shadow: 1px 3px 2px rgba(19, 38, 42, 1);
    font-family: 'Thunder-BoldLC', sans-serif;
    color: var(--white);
   
    @media (max-width: 640px) {
        font-size: 4rem; // Reduced font size for smaller screens
    }
}
h2 {
    font-size:8vw;
    text-transform: uppercase;
    line-height: .9; 
    font-weight: 300;
    
    font-family: 'Thunder-LightLC', sans-serif;
    color: var(--white);
   
    @media (max-width: 640px) {
        font-size: 4rem; // Reduced font size for smaller screens
    }
}
p {
    font-size: 1.2rem;
    font-weight: 200;
    color: var(--white);
    @media (max-width: 640px) {
        font-size: 1rem; 
    }
    
}
`;

const ButtonWrapper = styled.div`
display: flex;
    justify-content: space-between;
    gap: 1rem; 
`;