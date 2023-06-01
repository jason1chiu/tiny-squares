import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Logo from "../../img/Logo.png"
import { CartContext } from "./js/CartContext"
import CartProduct from './js/CartProduct'

const StoreHeader = () => {
    const cart = useContext(CartContext)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

    const checkout = async () => {
        await fetch("http://localhost:3001/store/checkout", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({items: cart.items})
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if(response.url) {
                window.location.assign(response.url); //Forwarding user to stripe
            }
        })
    }

    return (
        <>
            <nav id="header">
                <Container>
                    <LogoWrapper>
                        <img src ={Logo} alt="logo"/>
                    </LogoWrapper>

                    <MenuWrapper>
                    <button onClick={handleShow}>Cart ({productsCount} Items)</button>
                    </MenuWrapper>
                </Container>
            </nav>

            {show && (
        <div id="open-modal" className="modal-window">
          <div className="modal-content">
          <button onClick={handleClose} className="modal-x">X</button>
            <h2>Shopping Cart</h2>
            {productsCount > 0 ?
                <>
                    <p>Items In Your Cart:</p>
                    {cart.items.map((currentProduct, id) => (
                        <CartProduct key={id} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
                        ))}


                    <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

                    <button onClick={(checkout)}>Purchase Items</button>
                </>
            :
            <p>Items go here</p>
            }
            
            
          </div>
        </div>
      )}
           
        </>
    )
}

export default StoreHeader;

const Container = styled.div`
width: 100%;
margin-left: auto;
margin-right: auto;
display: flex;
flex: flex-wrap;
justify-content: space-between;
align-items: center;
 `;

const LogoWrapper = styled.div`
padding-left: 1em;
display: flex;
align-items: center;
`

const MenuWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-left: 2.5rem;
`

