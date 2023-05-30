import React from 'react';
import { Slide } from 'react-awesome-reveal';
import { HeaderImg, Texts } from './LandingStyles';
import HeaderPNG from '../../imgs/header.png';
import { StyledButton } from '../partials/Button';

const Header = () => {
    <Container id="landing">
        <Slide direction="left">
            <Texts>
                <h1>title</h1>
                <p>description</p>
                <StyledButton onClick={() => console.log("Button 2 clicked!")}>
                    Login
                </StyledButton>
                <StyledButton onClick={() => console.log("Button 2 clicked!")}>
                    SignUp
                </StyledButton>
            </Texts>
        </Slide>
        <Slide direction="right">
            <HeaderImg>
                <img src={HeaderPNG} />
            </HeaderImg>
        </Slide>
    </Container>
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