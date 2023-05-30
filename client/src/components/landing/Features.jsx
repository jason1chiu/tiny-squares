import React from 'react';
import styled from 'styled-components';
import Button from '../partials/Button';
// TODO: import { Slide } from 'react-awesome-reveal';
import { CardsContainer, Card, FeatureTitle } from './LandingStyles';

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
            <Button onClick={() => console.log("Button 2 clicked!")}>Go</Button>
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