import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useColorModeValue,
  Button,
  IconButton,
  Box,
  FormControl,
  FormLabel,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import axios from 'axios';
import { useAuth } from "contexts/auth.context";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "utils/mutations.js";

function EditProfileModal({ isOpen, onClose }) {
  let [username, setUsername] = useState("");
  const [file, setFile] = useState(null);
  const [updateUser, { error }] = useMutation(UPDATE_USER);
  const { editUser } = useAuth();
  const toast = useToast();

  const tColor = useColorModeValue ("brand.800", "white")
  const pColor = useColorModeValue("brand.600", "white")

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSaveProfile = async () => {
    try {
      const { data } = await updateUser({
        variables: {
          username: username,
        },
      });
      editUser(data.updateUser);
      onClose();
      toast({
        title: "Profile successfully updated",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
        backgroundColor: "purple.500",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader color={tColor}>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel color={pColor}>Username</FormLabel>
              <Input variant="auth"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Username"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brand" mr={3} onClick={handleSaveProfile}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose} color={tColor}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditProfileModal;