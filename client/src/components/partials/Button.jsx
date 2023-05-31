import React from 'react';
import styled from 'styled-components';

const Button = ({ children, onClick, ...otherProps }) => {
    return <StyledButton onClick={onClick} {...otherProps}>{children}</StyledButton>
}

export default Button;

const StyledButton = styled.button`
margin-top: 20px;
padding: 10px;
font-family: 'Thunder-BoldLC', sans-serif;
color: var(--white);
background-color: rgba(253, 253, 253, 0.4);
backdrop-filter: blur(1px);
border: 2px solid rgba(235, 236, 240, 0.9);
padding: .8rem 1.5rem;
margin-top: 2rem;
cursor: pointer;
border-radius: 10px !important;; 
font-weight: 600;
letter-spacing: 0.2rem;
font-size: 1.8rem;
text-transform: uppercase;
font-weight: 900;
transition: all 0.2s ease-out;
border-radius: 1px;
    :hover {
          background-color: rgba(253, 253, 253, 0.7);
          filter: drop-shadow(0px 8px 8px #69798b);
          transition: all 0.2s ease-out;
          border: 2px solid var(--white);
      }
`;