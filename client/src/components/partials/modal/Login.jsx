import React from 'react';

import loginImage from '../../../img/purple.jpg';
import { Modal, ImageContainer, FormContainer, Overlay, CloseButton } from './ModalStyles';

const LoginForm = () => {

    const handleClickOutside = (event) => {
        if (event.target.className.includes('overlay')) {
            onClose();
        }
    }

    return (
        <Overlay onClick={handleClickOutside} className='overlay'>
        <Modal onClick={e => e.stopPropagation()}>
            <CloseButton onClick={onClose}>
                <FaTimes />
            </CloseButton>
            <ImageContainer>
                <img src={loginImage} alt="Login" />
            </ImageContainer>
            <FormContainer>
                <h2>Login</h2>
                <form>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />

                    <button type="submit">Login</button>
                </form>
            </FormContainer>
        </Modal>
        </Overlay>
        )
    }
    
    export default LoginForm;