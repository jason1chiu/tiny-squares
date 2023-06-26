// import React, { useState } from "react";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Input,
//   useColorModeValue,
//   Button,
//   IconButton,
//   Box,
//   FormControl,
//   FormLabel,
//   useDisclosure,
//   useToast
// } from "@chakra-ui/react";
// import { FiUpload } from "react-icons/fi";
// import axios from 'axios';
// import { useAuth } from "contexts/auth.context";
// import { useMutation } from "@apollo/client";
// import { UPDATE_USER } from "utils/mutations.js";

// function EditProfileModal({ isOpen, onClose }) {
//   let [username, setUsername] = useState("");
//   const [file, setFile] = useState(null);
//   const [updateUser, { error }] = useMutation(UPDATE_USER);
//   const { editUser } = useAuth();
//   const toast = useToast();

//   const tColor = useColorModeValue ("brand.800", "white")
//   const pColor = useColorModeValue("brand.600", "white")

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUsernameChange = (e) => {
//     setUsername(e.target.value);
//   };

//   const handleSaveProfile = async () => {
//     try {
//       const { data } = await updateUser({
//         variables: {
//           username: username,
//         },
//       });
//       editUser(data.updateUser);
//       onClose();
//       toast({
//         title: "Profile successfully updated",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//         position: "top",
//         backgroundColor: "purple.500",
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>

//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent >
//           <ModalHeader color={tColor}>Edit Profile</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <FormControl>
//               <FormLabel color={pColor}>Username</FormLabel>
//               <Input variant="auth"
//                 value={username}
//                 onChange={handleUsernameChange}
//                 placeholder="Username"
//               />
//             </FormControl>
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="brand" mr={3} onClick={handleSaveProfile}>
//               Save
//             </Button>
//             <Button variant="ghost" onClick={onClose} color={tColor}>
//               Cancel
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }

// export default EditProfileModal;

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
  Image
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import { useAuth } from "contexts/auth.context";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "utils/mutations.js";

function EditProfileModal({ isOpen, onClose }) {
  let [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(1);
  const [cover, setCover] = useState(1);  // Add state for cover
  const { isOpen: isAvatarOpen, onToggle: onAvatarToggle } = useDisclosure();
  const { isOpen: isCoverOpen, onToggle: onCoverToggle } = useDisclosure();  // Disclosure for cover
  const { editUser } = useAuth();
  const toast = useToast();
  const [updateUser, { error }] = useMutation(UPDATE_USER);

  const tColor = useColorModeValue ("brand.800", "white");
  const pColor = useColorModeValue("brand.600", "white");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleAvatarChange = (avatarNumber) => {
    setAvatar(avatarNumber);
    onAvatarToggle();
  }

  const handleCoverChange = (coverNumber) => {
    setCover(coverNumber);
    onCoverToggle();
  }

  const handleSaveProfile = async () => {
    try {
      const { data } = await updateUser({
        variables: {
          username: username,
          avatar: `/img/avatar/${avatar}.webp`,
          cover: `/img/cover/${cover}.webp`,  // Add cover to variables
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
            <Input variant="auth"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
            />
            <FormLabel mt={3} color={pColor}>Select Avatar</FormLabel>
            <Box>
              <IconButton aria-label="Select avatar" icon={<FiUpload />} onClick={onAvatarToggle} />
              <Collapse in={isAvatarOpen}>
                <Grid templateColumns="repeat(3, 1fr)" gap={3}>
                  {[...Array(18)].map((_, i) => (
                    <Box
                    key={i}
                    onClick={() => handleAvatarChange(i + 1)}
                    cursor="pointer"
                    border={avatar === (i + 1) ? '2px solid purple.500' : ''}
                    transition="transform 0.3s"
                    _hover={{
                      transform: 'scale(1.2)',
                    }}
                  >
                    <Image src={`/img/avatar/${i + 1}.webp`} />
                  </Box>
                  ))}
                </Grid>
              </Collapse>
            </Box>
            <FormLabel mt={3} color={pColor}>Select Cover Photo</FormLabel>  
            <Box>
              <IconButton aria-label="Select cover photo" icon={<FiUpload />} onClick={onCoverToggle} />
              <Collapse in={isCoverOpen}>
                <Grid templateColumns="repeat(3, 1fr)" gap={3}>
                  {[...Array(18)].map((_, i) => (
                    <Box
                    key={i}
                    onClick={() => handleCoverChange(i + 1)}
                    cursor="pointer"
                    border={cover === (i + 1) ? '2px solid purple.500' : ''}
                    transition="transform 0.3s"
                    _hover={{
                      transform: 'scale(1.2)',
                    }}
                  >
                    <Image src={`/img/cover/${i + 1}.webp`} />
                  </Box>
                  ))}
                </Grid>
              </Collapse>
            </Box>
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
  );
}

export default EditProfileModal;