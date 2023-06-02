import React, { useState, useEffect, useContext } from 'react';
import Logo from "../../../../assets/img/Logo.png"
import { CartContext } from "../js/CartContext"
import CartProduct from '../js/CartProduct'
import { Button, Flex, Text, Box, Grid, Image, GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure } from '@chakra-ui/react'

const StoreHeader = () => {
  const cart = useContext(CartContext)

  const { isOpen, onOpen, onClose } = useDisclosure();

  const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

  const checkout = async () => {
    await fetch("http://localhost:3001/admin/store/checkout", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items: cart.items })
    }).then((response) => {
      return response.json();
    }).then((response) => {
      if (response.url) {
        window.location.assign(response.url); //Forwarding user to stripe
      }
    })
  }

  return (
    <>
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
        {/* Main Fields */}
        <Grid
          mb='20px'
          gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
          gap={{ base: "20px", xl: "20px" }}
          display={{ base: "block", xl: "grid" }}>
          <Flex
            flexDirection='column'
            gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>
        </Flex>
      </Grid>
      </Box> 




        {/* Logo as the Store Banner */}
        <Grid templateColumns='repeat(2, 1fr)' gap={4}>
          <GridItem w='100%'>
            <Image src={Logo} alt="logo"></Image>
            </GridItem>

            <Flex justifyContent="flex-end">
              <Button onClick={onOpen}>Cart ({productsCount} Items)</Button>
            </Flex>
        </Grid>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Shopping Cart</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* If products 0, say cart is empty. If > 0, show items */}
          {productsCount > 0 ?
              <>
                <p>Items In Your Cart:</p>

                {cart.items.map((currentProduct, id) => (
                  <CartProduct key={id} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
                ))}

                <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

                <Button colorScheme="purple" onClick={(checkout)}>Purchase Items</Button>
              </>
              :
              <p>Your Shopping Cart Is Empty!</p>
            }
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
      
          </ModalFooter>
        </ModalContent>
      </Modal>
       
      
     

      {/* {show && (
        
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

                <Button colorScheme="purple" onClick={(checkout)}>Purchase Items</Button>
              </>
              :
              <p>Items go here</p>
            }


          </div>
        </div>
      )} */}

    </>
  )
}

export default StoreHeader;