import React from "react";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  Image,
  Box,
  useToast,
  VStack,
  CloseButton,
} from "@chakra-ui/react";
import { productsArray } from "components/shared/store/js/ProductsStore";
import Card from "components/card/card";
import { CartContext } from "components/shared/store/js/CartContext";
import { useContext } from "react";

export default function BuyOptionsModal({ isOpen, onClose }) {
  const textColor = useColorModeValue("navy.700", "white");
  const cart = useContext(CartContext);
  const toast = useToast();

  const addToCart = (productId) => {
    cart.addOneToCart(productId);
    toast({
      title: "Successfully added to cart",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
      backgroundColor: "purple.500",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
      <CloseButton size="sm" colorScheme="purple" onClick={onClose} ml="auto" pr='10px' />
        <ModalHeader color={textColor}>
          Donate
         
        </ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            {productsArray.map((product, index) => (
              <Card key={index} p="20px">
                <Flex p={5} shadow="md" borderWidth="1px" borderRadius="16px">
                  <Box mb={{ base: "20px", "2xl": "20px" }} position="relative">
                    <Image
                      src={product.img}
                      w={{ base: "100%", "3xl": "100%" }}
                      h={{ base: "100%", "3xl": "100%" }}
                      borderRadius="20px"
                    />
                  </Box>
                  <Flex flexDirection="column" justify="space-between" h="100%">
                    <Flex direction="column" m="auto">
                      <Text pt="20px" color={textColor} fontSize={{ base: "xl" }} mb="5px" fontWeight="bold">
                        {product.title}
                      </Text>
                      <Text color="secondaryGray.600" fontSize={{ base: "sm" }} fontWeight="400">
                        ${product.price}
                      </Text>
                      <Text pb="10px" color="secondaryGray.600" fontSize={{ base: "sm" }} fontWeight="400">
                        {product.benefits.join(", ")}
                      </Text>
                    </Flex>
                    <Button
                      variant="brand"
                      color="white"
                      fontSize="sm"
                      pt="10px"
                      fontWeight="500"
                      borderRadius="70px"
                      size="sm"
                      py="5px"
                      onClick={() => addToCart(product.id)}
                    >
                      ADD TO CART
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}