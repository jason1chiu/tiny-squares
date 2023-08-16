import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
  CloseButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Alert,
  AlertIcon,
  AlertDescription,

} from "@chakra-ui/react";
import Card from "components/card/card";
import React, { useState } from "react";

export default function Preview(props) {
  const { image, name, author, onViewClick, onDeleteClick } = props;
  const textColor = useColorModeValue("navy.700", "white");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const purpleColor = "purple.500";

  const onCloseClick = () => {
    setShowDeleteAlert(false);
  };

  const onDeleteConfirm = () => {
    setShowDeleteAlert(false);
    onDeleteClick();
  };
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteAlert(true);
  };

  return (
    <Card
      _hover={{
        boxShadow: "lg",
      }}
      onClick={onViewClick}
      style={{ cursor: "pointer" }}
    >
      <Flex justify="space-between" alignItems="center" bg={purpleColor} color="white" borderTopRadius={"20px"} p={{ base: "10px", md: "15px", xl: "20px" }} m={{ base: "-20px", md: "-20px", xl: "-20px" }}>
        <Text fontSize="xs" fontWeight="400" color="secondaryGray.500">
          {author}
        </Text>
        <Text fontSize="lg" fontWeight="bold" textAlign="center">
          {name}
        </Text>
        <CloseButton
          size="sm"
          color="secondaryGray.500"
          onClick={handleDeleteClick}
        />
      </Flex>

      <Image
        src={image}
        w={{ base: "100%", "3xl": "100%" }}
        h={{ base: "100%", "3xl": "100%" }}
        borderRadius="20px"
        
        mt="40px"
      />


      {showDeleteAlert && (
        <AlertDialog
          isOpen={true}
          leastDestructiveRef={undefined}
          onClose={onCloseClick}
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Confirmation
            </AlertDialogHeader>
            <AlertDialogBody>
              <Alert
                status="warning"
                colorScheme="purple"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                h="auto"
              >
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
    </Card>
  );
}