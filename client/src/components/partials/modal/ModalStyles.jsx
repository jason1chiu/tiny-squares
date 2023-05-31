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

    @media (max-width: 768px) {
        display: none;
    }
`;

export const FormContainer = styled.div`
    flex: 1;
    padding-left: 20px;

    h2 {
        font-weight: 900;
        font-size: 1.8rem;
        color: var(--text);
        letter-spacing: 1px;
        font-family: 'Thunder-BoldLC', sans-serif;
        text-transform: uppercase;
        text-align: center;
    }

    label, input, button {
        display: block;
        width: 100%;
        padding: 0;
        border: none;
        outline: none;
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
    }

    label {
        margin-bottom: 4px;
    }

    label:nth-of-type(2) {
        margin-top: 12px;
    }

    input::placeholder {
        color: gray;
    }

    input {
        background: #ecf0f3;
        padding: 10px;
        padding-left: 20px;
        height: 50px;
        font-size: 14px;
        border-radius: 50px;
        box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white;
        margin-bottom: 20px;
    }
    button {
        color: white;
        margin-top: 20px;
        background: var(--text);
        height: 40px;
        border-radius: 20px;
        cursor: pointer;
        font-weight: 900;
        box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px white;
        transition: 0.5s;
    }

    button:hover {
        box-shadow: none;
    }
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
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
