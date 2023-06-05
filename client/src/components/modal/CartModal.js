import React, { useContext } from 'react';
import { CartContext } from "views/admin/store/js/CartContext";
import { getProductData } from 'views/admin/store/js/ProductsStore';
import { Button, Text, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Box, VStack, useToast  } from '@chakra-ui/react';

export function CartModal(props) {
    const cart = useContext(CartContext);

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
                      <Text>Quantity: {quantity}</Text>
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
              <Button colorScheme="blue">Checkout</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )
    }