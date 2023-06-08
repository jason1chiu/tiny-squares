import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Text,
  useColorModeValue,
  Tooltip,
  VStack,
  CloseButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
  import { MdClose, MdEdit } from "react-icons/md";
  import Card from "components/card/card";
  import React, { useState } from "react";

  export default function Preview(props) {
    const { image, name, author, onViewClick, onDeleteClick } = props;
    const textColor = useColorModeValue("navy.700", "white");
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  
    const onCloseClick = () => {
      setShowDeleteAlert(false);
    };
  
    const onDeleteConfirm = () => {
      setShowDeleteAlert(false);
      onDeleteClick();
    };

    return (
      <Card p='20px'>
        <Flex direction={{ base: "column" }} justify='center'>
          <Box mb={{ base: "20px", "2xl": "20px" }} position='relative'>
            <Image
              src={image}
              w={{ base: "100%", "3xl": "100%" }}
              h={{ base: "100%", "3xl": "100%" }}
              borderRadius='20px'
            />
        </Box>
        <Flex flexDirection='column' justify='space-between' h='100%'>
          <Flex
            justify='space-between'
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mb='auto'>
            <Flex direction='column'>
              <Text
                color={textColor}
                fontSize={{
                  base: "xl",
                  md: "lg",
                  lg: "lg",
                  xl: "lg",
                  "2xl": "md",
                  "3xl": "lg",
                }}
                mb='5px'
                fontWeight='bold'
                me='14px'>
                {name}
              </Text>
              <Text
                color='secondaryGray.600'
                fontSize={{
                  base: "sm",
                }}
                fontWeight='400'
                me='14px'>
                {author}
              </Text>
            </Flex>
            <VStack position="absolute" right={8} top={8} spacing={2}>
              <CloseButton size="sm" colorScheme="purple" onClick={() => setShowDeleteAlert(true)} />

              {showDeleteAlert && (
                <AlertDialog isOpen={true} leastDestructiveRef={undefined} onClose={onCloseClick}>
                  <AlertDialogOverlay />
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Delete Confirmation
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      <Alert status="warning" colorScheme="purple" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" h="auto">
                        <AlertIcon boxSize="40px" mr={0} />
                        <AlertDescription mt={4} fontSize="md">
                          But you've been doing so well! Are you sure you want to delete?
                        </AlertDescription>
                      </Alert>
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button onClick={onCloseClick}>Cancel</Button>
                      <Button colorScheme="purple" onClick={onDeleteConfirm} ml={3}>
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </VStack>
            <Button
              variant="darkBrand"
              color="white"
              fontSize="sm"
              fontWeight="500"
              borderRadius="70px"
              px="24px"
              py="5px"
              onClick={onViewClick}
            >
              VIEW
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}