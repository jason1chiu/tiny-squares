import React from 'react';
import styled from 'styled-components';
import Button from '../partials/Button';
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
  background-color: var(--babyblue);
  height: 80vh;
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
  background: var(--white);
  padding: 20px;
  margin: 20px;
  border-radius: 1px;
  width: 20%;
  min-width: 200px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  h3 {
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 20px;
  }
`;

const FeatureTitle = styled.div`
h1 {
    margin-top: 40px;
    font-size: 2.5rem;
    text-decoration: none;
    transition: all 400ms ease-in-out;
    opacity: .6;
    :hover {
      opacity: 1;
    }
  }
`;
