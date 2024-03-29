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
  useToast,
  Collapse,
  Grid,
  Image,
  Center
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import { useAuth } from "contexts/auth.context";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "utils/mutations.js";

function EditProfileModal({ isOpen, onClose, currentUsername }) {
  let [username, setUsername] = useState(currentUsername || "");
  const [avatar, setAvatar] = useState(1);
  const [cover, setCover] = useState(1); // Add state for cover
  const { isOpen: isAvatarOpen, onToggle: onAvatarToggle } = useDisclosure();
  const { isOpen: isCoverOpen, onToggle: onCoverToggle } = useDisclosure(); // Disclosure for cover
  const { editUser } = useAuth();
  const toast = useToast();
  const [updateUser] = useMutation(UPDATE_USER);

  const tColor = useColorModeValue("brand.800", "white");
  const pColor = useColorModeValue("brand.600", "white");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleAvatarChange = (avatarNumber) => {
    setAvatar(avatarNumber);
    onAvatarToggle();
  };

  const handleCoverChange = (coverNumber) => {
    setCover(coverNumber);
    onCoverToggle();
  };

  const handleSaveProfile = async () => {
    try {
      const { data } = await updateUser({
        variables: {
          username: username,
          avatar: `/img/avatar/${avatar}.webp`,
          cover: `/img/cover/${cover}.webp`, // Add cover to variables
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
    <Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader color={tColor}>Edit Profile</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <FormControl>
        <FormLabel color={pColor}>Username</FormLabel>
        <Input variant="auth" value={username} onChange={handleUsernameChange} placeholder={currentUsername || "Username"} />
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <Box>
          <Center><FormLabel mt={3} color={pColor}>Select Avatar</FormLabel></Center>
            <Box mx="auto" position="relative" cursor="pointer" onClick={onAvatarToggle}>
              <Image mx="auto" src={avatar ? `/img/avatar/${avatar}.webp` : ""} borderRadius="full" boxSize="100px" objectFit="cover" />
              <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" opacity="0" _hover={{ opacity: "1" }} >
                <FiUpload color="white" size="32"/>
              </Box>
            </Box>
            <Collapse in={isAvatarOpen}>
              <Grid templateColumns="repeat(3, 1fr)" gap={3}>
                {[...Array(18)].map((_, i) => (
                  <Box key={i} onClick={() => handleAvatarChange(i + 1)} cursor="pointer" border={avatar === i + 1 ? "2px solid purple.500" : ""} transition="transform 0.3s" _hover={{ transform: "scale(1.2)" }} >
                    <Image src={`/img/avatar/${i + 1}.webp`} />
                  </Box>
                ))}
              </Grid>
            </Collapse>
          </Box>
          <Box>
            <Center><FormLabel mx="auto" mt={3} color={pColor}>Select Cover Photo</FormLabel></Center>
            <Box position="relative" cursor="pointer" onClick={onCoverToggle}>
              <Image mt={3.5} mb="15px" mx="auto" src={cover ? `/img/cover/${cover}.webp` : ""} borderRadius="full" boxSize="85px" objectFit="cover" />
              <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" opacity="0" _hover={{ opacity: "1" }} >
                <FiUpload color="white" size="32"/>
              </Box>
            </Box>
            <Collapse in={isCoverOpen}>
              <Grid templateColumns="repeat(3, 1fr)" gap={3}>
                {[...Array(10)].map((_, i) => (
                  <Box key={i} onClick={() => handleCoverChange(i + 1)} cursor="pointer" border={cover === i + 1 ? "2px solid purple.500" : ""} transition="transform 0.3s" _hover={{ transform: "scale(1.2)" }} >
                    <Image src={`/img/cover/${i + 1}.webp`} />
                  </Box>
                ))}
              </Grid>
            </Collapse>
          </Box>
        </Grid>
      </FormControl>
    </ModalBody>
    <ModalFooter>
      <Button variant="brand" color="white" fontSize="sm" fontWeight="500" mr={3} onClick={handleSaveProfile}>Save</Button>
      <Button variant="ghost" onClick={onClose} color={tColor}>Cancel</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
  );
}

export default EditProfileModal;
