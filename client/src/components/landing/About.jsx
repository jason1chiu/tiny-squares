import React from 'react';
import styled from 'styled-components';
import { Slide } from 'react-awesome-reveal';
import Button from '../partials/Button';
import AboutImage from '../../imgs/about.jpg';
import { AboutTitle, AboutDescription, ContentWrapper, ImageWrapper, StyledImage } from './LandingStyles';

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

const Container = styled.div``;