import React from 'react';
import styled from 'styled-components';
import Button from '../partials/Button';
import LandingImg from '../../img/gradient.jpeg';
// TODO: import { Reveal.Slide } from 'react-awesome-reveal';
// import { CardsContainer, Card, FeatureTitle } from './LandingStyles';

const Features = () => {
    const features = [
        { title: "title", description: "description" },
        { title: "title", description: "description" },
        { title: "title", description: "description" },
        { title: "title", description: "description" },
    ];

    return (
        <Container>
            <FeatureTitle>
                <h1>Features</h1>
            </FeatureTitle>
            <CardsContainer>
        {features.map((feature, index) => (
          <Card key={index}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>

          </Card>
        ))}
      </CardsContainer>
    </Container>
  );
};

export default Features;

const Container = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem 0;
  background: url(${LandingImg});
  background-size: cover;
  background-position: center;
  margin-top: 5rem;
  margin-bottom: 5rem;
  height: 80vh;
  box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px white;
`;

const CardsContainer = styled.div`
display: flex;
justify-content: space-around;
flex-wrap: wrap;
width: 100%;

`;

const Card = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--text);
  padding: 20px;
  margin: 20px;
  border-radius: 1rem;
  width: 20%;
  min-width: 200px;
  box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px white;
  
  h3 {
    margin-bottom: 10px;
    color: var(--white);
    font-family: 'Thunder-LightLC', sans-serif;
    font-size: 2rem;
  }
  p {
    margin-bottom: 20px;
    color: var(--white);
  }
`;

const FeatureTitle = styled.div`
h1 {
    text-transform: uppercase;
    line-height: .9; 
    font-weight: 300;
    text-shadow: 1px 3px 2px rgba(19, 38, 42, 1);
    font-family: 'Thunder-BoldLC', sans-serif;
    color: var(--white);
    font-size: 10vw;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    :hover {
      opacity: 1;
    }
  }
`;
