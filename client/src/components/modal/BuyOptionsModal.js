import React from "react";
import { Button, Flex, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, useColorModeValue, Image, Box, useToast } from "@chakra-ui/react";
import { productsArray } from "views/admin/store/js/ProductsStore";
import Card from "components/card/card";
import {CartContext} from 'views/admin/store/js/CartContext'
import { useContext } from 'react'




export default function BuyOptionsModal({ isOpen, onClose }) {
    const textColor = useColorModeValue("navy.700", "white");
    const cart = useContext(CartContext);
    const toast = useToast();

    const addToCart = (productId) => {
      cart.addOneToCart(productId);
      toast({
        title: "Successfully added to cart",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Upgrade to Premium!</ModalHeader>
            <ModalBody>
              {productsArray.map((product, index) => (
                <Card key={index} p="20px">
                  <Flex direction={{ base: "column" }} justify="center">
                    <Box mb={{ base: "20px", "2xl": "20px" }} position='relative'>
                      <Image
                        src={product.img}
                        w={{ base: "100%", "3xl": "100%" }}
                        h={{ base: "100%", "3xl": "100%" }}
                        borderRadius='20px'
                      />
                    </Box>
                    <Flex flexDirection="column" justify="space-between" h="100%">
                      <Flex direction="column" mb="auto">
                        <Text color={textColor} fontSize={{ base: "xl" }} mb="5px" fontWeight="bold">
                          {product.title}
                        </Text>
                        <Text color="secondaryGray.600" fontSize={{ base: "sm" }} fontWeight="400">
                          ${product.price}
                        </Text>
                        <Text color="secondaryGray.600" fontSize={{ base: "sm" }} fontWeight="400">
                          {product.benefits.join(", ")}
                        </Text>
                      </Flex>
                      <Button
                        variant="darkBrand"
                        color="white"
                        fontSize="sm"
                        fontWeight="500"
                        borderRadius="70px"
                        px="24px"
                        py="5px"
                        // onClick={() => cart.addOneToCart(product.id)}
                        onClick={() => addToCart(product.id)}
                      >
                        ADD TO CART
                      </Button>
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </ModalBody>
          </ModalContent>
        </Modal>
      );
};