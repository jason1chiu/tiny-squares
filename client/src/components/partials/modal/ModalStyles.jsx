import styled from 'styled-components';

export const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 10px;
    padding: 50px;
    z-index: 1000;
    width: 80%;
    display: flex;
    box-shadow: 0 0 10px rgba(0,0,0,0.25);
`;

export const ImageContainer = styled.div`
    flex: 1;
    img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
`;

export const FormContainer = styled.div`
    flex: 1;
    padding-left: 20px;
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 1.5em;
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.4);
    z-index: 1000;
`;

export const SignUpButton = styled.button``;