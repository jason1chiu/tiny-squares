import React from 'react';
import styled from 'styled-components';
// import { Reveal.Slide } from 'react-awesome-reveal';
import Button from '../partials/Button';
// import { AboutTitle, AboutDescription, ContentWrapper, ImageWrapper, StyledImage } from './LandingStyles';
import AboutImage from '../../img/purple.jpg';

const About = () => {
    return (
        <Container id="about">
            <ImageWrapper>
                <StyledImage />
            </ImageWrapper>
            <ContentWrapper>
                <AboutTitle>
                    <h1>About</h1>
                </AboutTitle>
                <AboutDescription>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    </p>
                </AboutDescription>
                <Button onClick={() => console.log("Button 2 clicked!")}>Go</Button>
            </ContentWrapper>
        </Container>

    );
};

export default About;

const Container = styled.div`
display: flex;
  
  justify-content: center;
  align-items: center;
  width: 100%;
  
  margin: 0 auto;
  padding: 1.5rem 0;
  height: 100vh;
        @media (max-width: 640px) {
          height: 100%;
        padding-bottom: 2rem;`;

const ImageWrapper = styled.div`
  width: 50%;
  background: url(${AboutImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
    border-radius: 1rem;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  
`;

const AboutTitle = styled.div`
  h1 {
    font-size: 2.5rem;
    text-decoration: none;
    transition: all 400ms ease-in-out;
    opacity: .6;
    :hover {
      opacity: 1;
    }
  }
`;
const AboutDescription = styled.p`
  font-size: 1.1rem
  opacity: 0.6;
  transition: all 400ms ease-in-out;
  margin-bottom: 2rem;
  :hover {
    opacity: 1;
  }
`;

const ContentWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 2rem;
`;