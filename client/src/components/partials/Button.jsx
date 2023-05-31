import React from 'react';
import styled from 'styled-components';

const Button = ({ children, onClick, ...otherProps }) => {
    return <StyledButton onClick={onClick} {...otherProps}>{children}</StyledButton>
}

export default Button;

const StyledButton = styled.button`
color: white;
        margin-top: 20px;
        background: var(--text);
        border-radius: 20px;
        cursor: pointer;
        font-weight: 900;
        box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px white;
        transition: 0.5s;
        padding: 10px;
        padding-left: 40px;
        padding-right: 40px;
        border: none;
        font-family: 'Montserrat', sans-serif;
    :hover {
        box-shadow: none;
      }
`;