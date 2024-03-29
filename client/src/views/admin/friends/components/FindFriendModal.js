import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useToast,
  FormLabel,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, GET_USER } from "utils/queries";
import { ADD_FRIEND } from "utils/mutations";
import { useAuth } from "contexts/auth.context";

export default function FindFriendModal({ isOpen, onClose, onSubmit }) {
  const bColor = useColorModeValue("secondaryGray.600", "white");
  const tColor = useColorModeValue("brand.800", "white");
  const pColor = useColorModeValue("brand.600", "white");

  const [username, setUsername] = useState("");
  const [addFriend, { loading: addFriendLoading }] = useMutation(ADD_FRIEND, {
    refetchQueries: [GET_ME, GET_USER],
  });

  let { categories } = useAuth();
  const toast = useToast();

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { username: username },
  });

  const handleSubmit = async () => {
    try {
      const { data } = await addFriend({
        variables: { username: username },
      });
      console.log(data);
      if (data?.addFriend) {
        // Friend added successfully
        const addedFriend = data.addFriend;
        console.log(addedFriend);

        onSubmit(addedFriend);

        // Display a success toast or other notifications
        toast({
          title: "Friend Added",
          description: `User ${addedFriend.username} added to your friends list.`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
          colorScheme: "green",
        });
      }
    } catch (error) {
      console.log(error.message);
      if (error.message.includes("User is already in friends list")) {
        // Display a toast indicating that the user is already in friends list
        toast({
          title: "User Already in Friends List",
          description: "This user is already in your friends list.",
          status: "info",
          duration: 5000,
          isClosable: true,
          position: "top",
          colorScheme: "blue",
        });
      } else if (error.message.includes("User not found")) {
        // Display a toast indicating that the user was not found
        toast({
          title: "User Not Found",
          description: "No user found with the entered username.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
          colorScheme: "red",
        });
      } else if (error.message.includes("Cannot add yourself as a friend")) {
        // Display a toast indicating that the user was not found
        toast({
          title: "Failed to Add Friend",
          description: "Cannot add yourself as a friend.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
          colorScheme: "red",
        });
      } else {
        // Display a generic error toast
        toast({
          title: "Failed to Add Friend",
          description: "An error occurred while adding the friend.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
          colorScheme: "red",
        });
      }
    }

    // Clear or update state as needed
    setUsername(""); // Clear the input field
  };

  // Otherwise, they can add journals as normal
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent width="100vw">
        <ModalHeader color={tColor}>Add A User to Friend's List</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormLabel mt={3} color={pColor}>
            Find User by Username
          </FormLabel>
          <Input
            variant="auth"
            value={username}
            onChange={handleInputChange}
            placeholder="Find Username"
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="purple" mr={3} onClick={handleSubmit}>
            Add
          </Button>
          <Button color={tColor} variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
