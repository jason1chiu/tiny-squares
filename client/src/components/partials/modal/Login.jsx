import React from 'react';

import loginImage from '../../../img/purple.jpg';
import { Modal, ImageContainer, FormContainer } from './ModalStyles';

const LoginForm = () => {
    return (
        <Modal>
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
        )
    }
    
    export default LoginForm;