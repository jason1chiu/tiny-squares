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
    max-width: 500px;
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