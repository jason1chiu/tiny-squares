import React, { useContext } from 'react';
import { CartContext } from "components/shared/store/js/CartContext";
import { getProductData } from 'components/shared/store/js/ProductsStore';
import { Button, Text, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Box, VStack, useToast  } from '@chakra-ui/react';

export function CartModal(props) {
    const cart = useContext(CartContext);

    const checkout = async () => {
      // *** When deploying to heroku, change url to https://your-app-name.herokuapp.com/admin/store/checkout
      await fetch("http://localhost:3001/admin/store/checkout", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cart: cart.cart })
      }).then((response) => {
        return response.json();
      }).then((response) => {
        if (response.url) {
          window.location.assign(response.url); //Forwarding user to stripe
        }
      })
    }

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Your Shopping Cart</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                {cart.cart.map(({ id, quantity }) => {
                  const productData = getProductData(id);
                  return (
                    <Box key={id} p={5} shadow="md" borderWidth="1px">
                      <h3>{productData.title}</h3>
                      <Image src={productData.img} alt="product" boxSize='150px' objectFit='cover'></Image>
                      <Text>Quantity: {cart.getProductQuantity(id)}</Text>
                      <Text>Subtotal: ${(quantity * productData.price).toFixed(2)}</Text>
                      <Button colorScheme='red' onClick={() => cart.deleteFromCart(id)}><Text fontSize='xs'>Remove</Text></Button>
                    </Box>
                  );
                })}
              </VStack>
            </ModalBody>
    
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={props.onClose}>
                Close
              </Button>
              <Button colorScheme="blue" onClick={(checkout)}>Checkout</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )
    }