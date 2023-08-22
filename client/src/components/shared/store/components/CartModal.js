
import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Box,
  VStack,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

export function CartModal(props) {
  const bColor = useColorModeValue("secondaryGray.500", "white");
  const tColor = useColorModeValue("brand.800", "white");
  const purpleColor = "purple.500";

  const checkout = async () => {
    const userId = localStorage.getItem("user_id");

    const item = {
      price: "price_1NhmKsCS0MFKcelVwa3Y1FlY",
      quantity: 1
    }

       const requestData = {
            item: item,
            userId: userId,
          };
          // Change back to /admin/store/checkout when deploy to heroku
          await fetch("http://localhost:3001/admin/store/checkout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ requestData }),
          })
            .then((response) => {
              return response.json();
            })
            .then((response) => {
              console.log(response);
      
              if (response.url) {
                window.location.assign(response.url); //Forwarding user to stripe
              }
            });
      
        };

        return (
          <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader bg={purpleColor} color="white">Go Premium</ModalHeader>
              <ModalBody>
              <VStack align="center">
            <Box fontSize="3xl" fontWeight="bold" color={bColor}>$15</Box>
            <VStack align="start" spacing={2}>
              <Box display="flex" alignItems="center">
                <Icon as={FaCheck} color={purpleColor} />
                <Text ml={2} color={tColor}>Unlimited Journal Creation</Text>
              </Box>
              <Box display="flex" alignItems="center">
                <Icon as={FaCheck} color={purpleColor} />
                <Text ml={2} color={tColor}>One, lifetime purchase</Text>
              </Box>
              </VStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button color={tColor} variant="ghost" mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button
            variant="brand"
            color="white"
            fontSize="sm"
            fontWeight="500"
            borderRadius="70px"
            onClick={checkout}
            background={purpleColor}
          >
            Checkout
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}