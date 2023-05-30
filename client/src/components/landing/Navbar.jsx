import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [bar, setBar] = useState(false);
    return (
        <Container bar={bar}>
            <Logo>
                <Link to='/'>
                    <img src='/images/logo.svg' alt='logo' />
                </Link>
            </Logo>
            <Nav bar={bar}>
                <Link to='/'>About</Link>
                <Link to='/'>Features</Link>
                <Link to='/'>Pricing</Link>
            </Nav>
            <div onClick={() => setBar(!bar)} className="bars">
                <div className="bar"></div>
            </div>
            </Container>
    )
}

export default Navbar;


