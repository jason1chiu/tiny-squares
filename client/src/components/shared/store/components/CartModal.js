// import React, { useContext } from "react";
// import { CartContext } from "components/shared/store/js/CartContext";
// import { getProductData } from "components/shared/store/js/ProductsStore";
// import {
//   Button,
//   Text,
//   Image,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Box,
//   VStack,
//   useToast,
//   Flex,
//   useColorModeValue,
// } from "@chakra-ui/react";

// export function CartModal(props) {
//   const cart = useContext(CartContext);
//   const bColor = useColorModeValue("secondaryGray.500", "white");
//   const tColor = useColorModeValue("brand.800", "white");

//   const checkout = async () => {
//     const userId = localStorage.getItem("user_id");

//     const requestData = {
//       cart: cart.cart,
//       userId: userId,
//     };
//     // Change back to /admin/store/checkout when deploy to heroku
//     await fetch("http://localhost:3001/admin/store/checkout", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ requestData }),
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then((response) => {
//         console.log(response);

//         if (response.url) {
//           window.location.assign(response.url); //Forwarding user to stripe
//         }
//       });

//     await fetch("http://localhost:3001/stripe-webhook", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userId: userId }),
//     });
//   };

//   return (
//     <Modal isOpen={props.isOpen} onClose={props.onClose}>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader color={tColor}>Your Shopping Cart</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           {cart.cart.length === 0 ? (
//             <Text color={bColor}>There's nothing in here!</Text>
//           ) : (
//             <VStack spacing={4}>
//               {cart.cart.map(({ id, quantity }) => {
//                 const productData = getProductData(id);
//                 return (
//                   <Flex
//                     key={id}
//                     p={5}
//                     shadow="md"
//                     borderWidth="1px"
//                     borderRadius="16px"
//                     w="100%"
//                   >
//                     <Box color={tColor} as="b" flex="1">
//                       <h3>{productData.title}</h3>
//                       <Image
//                         src={productData.img}
//                         alt="product"
//                         boxSize="150px"
//                         objectFit="cover"
//                       ></Image>
//                     </Box>
//                     <Box flex="1">
//                       <Text color={bColor}>
//                         Quantity: {cart.getProductQuantity(id)}
//                       </Text>
//                       <Text color={bColor}>
//                         Subtotal: ${(quantity * productData.price).toFixed(2)}
//                       </Text>
//                     </Box>
//                     <Button
//                       variant="action"
//                       color="white"
//                       fontSize="sm"
//                       fontWeight="500"
//                       borderRadius="70px"
//                       onClick={() => cart.deleteFromCart(id)}
//                     >
//                       <Text fontSize="xs">Remove</Text>
//                     </Button>
//                   </Flex>
//                 );
//               })}
//             </VStack>
//           )}
//         </ModalBody>

//         <ModalFooter>
//           <Button color={tColor} variant="ghost" mr={3} onClick={props.onClose}>
//             Close
//           </Button>
//           {cart.cart.length !== 0 && (
//             <Button
//               variant="brand"
//               color="white"
//               fontSize="sm"
//               fontWeight="500"
//               borderRadius="70px"
//               onClick={checkout}
//             >
//               Checkout
//             </Button>
//           )}
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// }

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

       const requestData = {
            // cart: cart.cart,
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
      
          await fetch("http://localhost:3001/stripe-webhook", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: userId }),
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