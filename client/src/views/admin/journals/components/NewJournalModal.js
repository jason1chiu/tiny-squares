import { useState, useEffect } from "react";
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
import { GET_JOURNALS, GET_ME } from "utils/queries";
import { useAuth } from "contexts/auth.context";

export default function NewJournalModal({ isOpen, onClose, onSubmit }) {
  const [journalName, setJournalName] = useState("");
  const [journalImage, setJournalImage] = useState(1);
  const { isOpen: isJournalImageOpen, onToggle: onJournalImageToggle } =
    useDisclosure();

  const [journalLimitReached, setJournalLimitReached] = useState(false);

  const bColor = useColorModeValue("secondaryGray.600", "white");
  const tColor = useColorModeValue("brand.800", "white");
  const pColor = useColorModeValue("brand.600", "white");

  const { data } = useQuery(GET_JOURNALS);
  const { data: meData, refetch: meRefetch } = useQuery(GET_ME);

  const [journalCategory, setJournalCategory] = useState("");
  let { categories } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (meData && meData.me && meData.me.journals.length >= 3) {
      setJournalLimitReached(true);
    } else {
      setJournalLimitReached(false);
    }
  }, [meData]);

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

  // If user does not have premium and max journals reached, modal informing them pops up
  if (journalLimitReached && !meData.me.premium) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent width="100vw">
          <ModalHeader color={tColor}>Maximum Journal Amount Reached</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Your current plan only includes 3 journals. Please purchase premium if you'd like to add more.
          </ModalBody>
          <ModalFooter>
            <Button color={tColor} variant="ghost" onClick={onClose}>
              Ok
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }

  // Otherwise, they can add journals as normal
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
            Select Category
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
         
          <Box
  mx="auto"
  position="relative"
  cursor="pointer"
  onClick={onJournalImageToggle}
  _hover={{ opacity: 1 }}
>
  <Image
    src={journalImage ? `/img/journal/${journalImage}.webp` : ""}
    borderRadius="full"
    boxSize="100px"
    objectFit="cover"
  />
  <Box
    position="absolute"
    top="50%"
    left="50px"
    transform="translate(-50%, -50%)"
    opacity="0"
    _hover={{ opacity: "1" }}
  >
    <FiUpload color="white" size="44" />
  </Box>
</Box>
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

