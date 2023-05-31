import React, { useState } from 'react';
import { Modal, ImageContainer, FormContainer, Overlay, CloseButton } from './ModalStyles';
import { FaTimes } from "react-icons/fa";  // Importing React Icons package
import signUpImage from '../../../img/purple.jpg';

const SignUpForm = ({ onClose }) => {

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
    </Overlay>
             )
            }

export default SignUpForm;
