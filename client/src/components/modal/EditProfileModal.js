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
  Button,
  IconButton,
  Box,
  FormControl,
  FormLabel,
  useDisclosure,
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import axios from 'axios';
import { useAuth } from "contexts/auth.context";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "utils/mutations.js";
// import { useAuth } from "contexts/auth.context";

function EditProfileModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [username, setUsername] = useState("");
    const [file, setFile] = useState(null);
    const [updateUser, { error }] = useMutation(UPDATE_USER);
    // const [updateUser, { error }] = useMutation(UPDATE_USER);
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
      };
const handleSave = async () => {
  try {
    const formData = new FormData();
    formData.append('image', file);
  
    const response = await axios.post('/api/users/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const { data } = await updateUser({
      variables: {
        avatar: response.data.file.filename,
        username: username,
      },
    });
  
    console.log(data);
    onClose();
  } catch (error) {
    console.error(error);
  }
};

    
    //   const handleSave = async () => {
    //     try {
    //       const { data } = await updateUser({
    //         variables: {
    //           username: username,
    //         },
    //       });
    //       console.log(data);
    
    //       onClose();
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

      return (
        <>
          <Button onClick={onOpen}>Edit Profile</Button>
    
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Profile</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Username"
                  />
                   </FormControl>
            <FormControl mt={4}>
              <FormLabel>Profile Picture</FormLabel>
              <Box d="flex" alignItems="center">
                <Input
                  type="file"
                  onChange={handleFileChange}
                  hidden
                  id="upload-file"
                />
                 <FormLabel htmlFor="upload-file">
                  <IconButton
                    colorScheme="brand"
                    aria-label="Upload image"
                    icon={<FiUpload />}
                    isRound
                    size="lg"
                  />
                </FormLabel>
                <Box ml={4}>
                  {file ? file.name : "No file chosen"}
                </Box>
              </Box>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brand" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditProfileModal;