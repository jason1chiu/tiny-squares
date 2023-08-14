// React imports
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useCookies } from "react-cookie";
import { FaCheck, FaTimes } from "react-icons/fa";

// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  Alert,
  HStack,
  VStack,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from "@chakra-ui/react";

// Apollo imports
import { useMutation } from "@apollo/client";

import { motion } from "framer-motion";

// File imports
import { HSeparator } from "components/seperator/Seperator";
import DefaultAuth from "layouts/auth/Default";
import imageAuth from "assets/img/authimage.png";
import { ADD_USER } from "utils/mutations.js";
import { useAuth } from "contexts/auth.context";
import Auth from "utils/auth";

export default function SignUp() {
  let { setUser } = useAuth();
  let [, setCookie] = useCookies();
  let history = useHistory();
  const toast = useToast();
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const MotionButton = motion(Button);
  const MotionHeading = motion(Heading);
  const [show, setShow] = React.useState(false);
  const [showError, setShowError] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [addUser] = useMutation(ADD_USER);

  const handleClick = () => setShow(!show);

  const validatePassword = (password) => {
    // Min 8 characters, at least one uppercase letter, one lowercase letter, one special character, and one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleAddUser = async (event) => {
    event.preventDefault();
    let newUser = {
      username: username,
      email: email,
      password: password,
    };

    if (!validatePassword(password)) {
      toast({
        title: "Password Validation Failed",
        description: "Please ensure your password meets the requirements.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
        backgroundColor: "red.500",
      });
      return; // Return to prevent further code execution
    }

    if (password === confirmPassword && password && username && email) {
      try {
        let { data } = await addUser({ variables: newUser });
        if (data && data.addUser) {
          setShowError(null);
          setUser(data.addUser);
          history.push("/admin/dashboard");
          const { token, user } = data.addUser;
          const userId = user._id;
          Auth.login(token, userId, user);
          setCookie("token", token, { maxAge: 1000000 });
        } else if (data && data.addUser === null) {
          setShowError("User already exists!");
        }

        toast({
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
          render: () => (
            <Box color="white" p={3} bg="purple.500" borderRadius="8px">
              Account Created!
            </Box>
          ),
        });
      } catch (error) {
        console.error("Error signing up", error);
        toast({
          title: "Error logging in",
          description: error.message, // Display the error message
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
          backgroundColor: "red.500",
        });
      }
    } else {
      setShowError("Passwords do not match or some fields are missing!");
    }
  };

  return (
    <DefaultAuth imageBackground={imageAuth} image={imageAuth}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <MotionHeading
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            color={textColor}
            fontSize="36px"
            mb="10px"
          >
            Sign Up
          </MotionHeading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and password to sign up!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <Flex align="center" mb="25px">
            <HSeparator />
            {/* <Text color='gray.400' mx='14px'>
              or
            </Text> */}
            <HSeparator />
          </Flex>
          {showError && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>{showError}!</AlertTitle>
              <AlertDescription>Try again!</AlertDescription>
            </Alert>
          )}
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              variant="auth"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setShowError(null);
              }}
              isRequired={true}
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="Enter your email"
              mb="24px"
              fontWeight="500"
              size="lg"
            />
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Username<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              variant="auth"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setShowError(null);
              }}
              isRequired={true}
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="Enter your username"
              mb="24px"
              fontWeight="500"
              size="lg"
            />
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                variant="auth"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setShowError(null);
                  // Additional logic for real-time feedback can be added here if needed
                }}
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="12px"
                size="lg"
                type={show ? "text" : "password"}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>

            <VStack spacing={1} alignItems="start" mt={2}>
              <HStack>
                <Icon
                  as={password.length >= 8 ? FaCheck : FaTimes}
                  color={password.length >= 8 ? "green.400" : "red.400"}
                />
                <Text fontSize="sm">Minimum 8 characters</Text>
              </HStack>
              <HStack>
                <Icon
                  as={/[A-Z]/.test(password) ? FaCheck : FaTimes}
                  color={/[A-Z]/.test(password) ? "green.400" : "red.400"}
                />
                <Text fontSize="sm">At least one uppercase letter</Text>
              </HStack>
              <HStack>
                <Icon
                  as={/[a-z]/.test(password) ? FaCheck : FaTimes}
                  color={/[a-z]/.test(password) ? "green.400" : "red.400"}
                />
                <Text fontSize="sm">At least one lowercase letter</Text>
              </HStack>
              <HStack>
                <Icon
                  as={/[\W_]/.test(password) ? FaCheck : FaTimes}
                  color={/[\W_]/.test(password) ? "green.400" : "red.400"}
                />
                <Text fontSize="sm">At least one special character</Text>
              </HStack>
              <HStack>
                <Icon
                  as={/\d/.test(password) ? FaCheck : FaTimes}
                  color={/\d/.test(password) ? "green.400" : "red.400"}
                />
                <Text fontSize="sm">At least one number</Text>
              </HStack>
            </VStack>

            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Confirm Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                variant="auth"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                isRequired={true}
                fontSize="sm"
                placeholder="Confirm your password"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <Flex justifyContent="space-between" align="center" mb="24px">
              <FormControl display="flex" alignItems="center">
                <Checkbox
                  id="remember-login"
                  colorScheme="brandScheme"
                  me="10px"
                />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  fontWeight="normal"
                  color={textColor}
                  fontSize="sm"
                >
                  Keep me logged in
                </FormLabel>
              </FormControl>
            </Flex>
            <MotionButton
              onClick={handleAddUser}
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Sign Up
            </MotionButton>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Already have an account?
              <NavLink to="/auth/sign-in">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Sign In
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}
