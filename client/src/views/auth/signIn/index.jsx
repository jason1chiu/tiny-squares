// React imports
import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { useLazyQuery } from "@apollo/client";
import { GET_ME } from "utils/queries";

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
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from "@chakra-ui/react";

// Apollo imports
import { useMutation } from "@apollo/client";

// File imports
import { HSeparator } from "components/seperator/Seperator";
import DefaultAuth from "layouts/auth/Default";
import imageAuth from "assets/img/authimage.png";
import { LOGIN_USER } from "utils/mutations.js";
import { useAuth } from "contexts/auth.context";
import Auth from "utils/auth";

export default function SignIn() {
  let [cookies, setCookie] = useCookies();
  const toast = useToast();
  let { user, setUser } = useAuth();
  let history = useHistory();

  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const MotionButton = motion(Button);
  const [show, setShow] = React.useState(false);
  const [showError, setShowError] = React.useState(null);
  const [email, currentEmail] = React.useState("");
  const [password, currentPassword] = React.useState("");
  const [login] = useMutation(LOGIN_USER);

  let [me] = useLazyQuery(GET_ME);

  useEffect(() => {
    if (cookies.token && user === null) {
      me().then((data) => {
        if (data.data) {
          setUser({ user: data.data.me });
          history.push("/admin/dashboard");
        }
      });
    }
  }, [user, cookies]);

  const handleClick = () => setShow(!show);
  const handleLogin = async () => {
    let loginUser = {
      email: email,
      password: password,
    };

    if (email && password) {
      try {
        const { data } = await login({ variables: { ...loginUser } });
        if (data && data.login) {
          setShowError(null);
          setUser(data.login);
          history.push("/");
          const { token, user } = data.login;
          setCookie("token", token, { maxAge: 7200 });
          const userId = user._id;
          Auth.login(token, userId);

          toast({
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
            render: () => (
              <Box color="white" p={3} bg="purple.500" borderRadius="8px">
                Welcome back!
              </Box>
            ),
          });
        } else if (data && data.login === null) {
          setShowError("Incorrect credentials");
        }
      } catch (error) {
        console.error("Erroring logging in", error);
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
      setShowError("Some fields are missing!");
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
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign In
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and password to sign in!
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
              onChange={(e) => {
                currentEmail(e.target.value);
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
                onChange={(e) => {
                  currentPassword(e.target.value);
                  setShowError(null);
                }}
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
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
              onClick={handleLogin}
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
              Sign In
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
              Not registered yet?
              <NavLink to="/auth/sign-up">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Create an Account
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}
