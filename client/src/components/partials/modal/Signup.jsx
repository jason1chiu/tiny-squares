import React from 'react';
import { Modal, ImageContainer, FormContainer } from './ModalStyles';
import signUpImage from '../../../img/purple.jpg';

const SignUpForm = () => {
    return (
        <Modal>
            <ImageContainer>
                <img src={signUpImage} alt="Sign Up" />
            </ImageContainer>
            <FormContainer>
                <h2>Sign Up</h2>
                <form>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />

                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />

                    <button type="submit">Sign Up</button>
                </form>
            </FormContainer>
        </Modal>
    )
}

export default SignUpForm;