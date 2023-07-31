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
  Select,
  useToast,
  FormLabel,
  useColorModeValue,
  Box,
  Image,
  Grid,
  useDisclosure,
  IconButton,
  Collapse,
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import { useQuery } from "@apollo/client";

import { GET_JOURNALS } from "utils/queries";

import { useAuth } from "contexts/auth.context";

export default function NewJournalModal({ isOpen, onClose, onSubmit }) {
  const [journalName, setJournalName] = useState("");
  const [journalImage, setJournalImage] = useState(1);
  const { isOpen: isJournalImageOpen, onToggle: onJournalImageToggle } =
    useDisclosure(); // And this

  const bColor = useColorModeValue("secondaryGray.600", "white");
  const tColor = useColorModeValue("brand.800", "white");
  const pColor = useColorModeValue("brand.600", "white");
  const { data } = useQuery(GET_JOURNALS);

  const [journalCategory, setJournalCategory] = useState("");
  let { categories } = useAuth();
  const toast = useToast();

  const handleInputChange = (event) => {
    setJournalName(event.target.value);
  };

  const handleSelectChange = (event) => {
    setJournalCategory(event.target.value);
  };

  // Add this function
  const handleJournalImageChange = (imageNumber) => {
    setJournalImage(imageNumber);
    onJournalImageToggle();
  };

  const handleSubmit = () => {
    if (data?.journals?.length >= 3) {
      onSubmit({
        name: journalName,
        category: journalCategory,
        image: `/img/journal/${journalImage}.webp`,
      });
    } else {
      onSubmit({
        name: journalName,
        category: journalCategory,
        image: `/img/journal/${journalImage}.webp`,
      });
      toast({
        title: "Journal created.",
        description: "Your journal was successfully created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
        colorScheme: "purple",
      });
    }

    setJournalName("");
    setJournalCategory("");
    setJournalImage(1); // And this
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent width="100vw">
        <ModalHeader color={tColor}>Create a new journal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormLabel mt={3} color={pColor}>
            Journal Name
          </FormLabel>
          <Input
            variant="auth"
            value={journalName}
            onChange={handleInputChange}
            placeholder="Journal name"
          />
          <FormLabel mt={3} color={pColor}>
            Select Avatar
          </FormLabel>
          <Select
            color={bColor}
            variant="auth"
            value={journalCategory}
            onChange={handleSelectChange}
            placeholder="Select option"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <FormLabel mt={3} color={pColor}>
            Select Journal Image
          </FormLabel>
          <Box>
            <Image
              src={journalImage ? `/img/journal/${journalImage}.webp` : ""}
              borderRadius="full"
              boxSize="100px"
              objectFit="cover"
            />
            <IconButton
              aria-label="Select journal image"
              icon={<FiUpload />}
              onClick={onJournalImageToggle}
            />
            <Collapse in={isJournalImageOpen}>
              <Grid templateColumns="repeat(3, 1fr)" gap={3}>
                {[...Array(20)].map((_, i) => (
                  <Box
                    key={i}
                    onClick={() => handleJournalImageChange(i + 1)}
                    cursor="pointer"
                    border={
                      journalImage === i + 1 ? "2px solid purple.500" : ""
                    }
                    transition="transform 0.3s"
                    _hover={{
                      transform: "scale(1.2)",
                    }}
                  >
                    <Image
                      src={`/img/journal/${i + 1}.webp`}
                      borderRadius="full"
                      boxSize="100px"
                      objectFit="cover"
                    />
                  </Box>
                ))}
              </Grid>
            </Collapse>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="purple" mr={3} onClick={handleSubmit}>
            Go
          </Button>
          <Button color={tColor} variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
