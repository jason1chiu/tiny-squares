// React imports from "react";
import { MdShoppingCart, MdEdit } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import EditProfileModal from "components/modal/EditProfileModal";
import { CartContext } from 'components/shared/store/js/CartContext'
import { useContext } from 'react'
import { BsShop } from "react-icons/bs";
import { CartModal } from 'components/shared/store/components/CartModal'
import { useCookies } from "react-cookie";


import { motion } from 'framer-motion';
import BuyOptionsModal from 'components/shared/store/components/BuyOptionsModal'

// Chakra imports
import { Avatar, Button, Flex, Icon, Link, Menu, MenuButton, MenuItem, MenuList, Text, Badge, useColorModeValue, useDisclosure, IconButton, Box } from "@chakra-ui/react";

import PropTypes from "prop-types";

// Apollow imports
import { useMutation } from "@apollo/client"

// File imports
import routes from "routes";
import { ItemContent } from "components/menu/ItemContent";
import { SidebarResponsive } from "components/sidebar/Sidebar";
import { LOGOUT_USER, UPDATE_USER } from "utils/mutations";
import { useAuth } from "contexts/auth.context";

export default function HeaderLinks(props) {
  let [ cookies, setCookie, removeCookie ] = useCookies();
  let { user, setUser } = useAuth();
  let email = user.user.email;
  const [logout] = useMutation(LOGOUT_USER);
  const [updatedUser] = useMutation(UPDATE_USER);
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const MotionMenuList = motion(MenuList);
  const MotionMenuItem = motion(MenuItem);
  const menuVariants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    },
  };

  const menuItemVariants = {
    open: { y: 0, opacity: 1, scale: 1 },
    closed: { y: 50, opacity: 0, scale: 0.3 },
  };

  const handleLogout = async () => {
    try {
      await logout({ variables: { email } });
      setUser(null);
      removeCookie('token');
      history.push("/auth/sign-in"); // assuming this is your sign-in route
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const { secondary } = props;

  // Chakra Color Mode
  const navbarIcon = useColorModeValue("gray.400", "white");
  let menuBg = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const ethColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
  const ethBg = useColorModeValue("secondaryGray.300", "navy.900");
  const ethBox = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );

  const cart = useContext(CartContext);
  const totalQuantity = cart.getTotalQuantity();
  const { isOpen: buyOptionsModalIsOpen, onOpen: openBuyOptionsModal, onClose: closeBuyOptionsModal } = useDisclosure();
  const { isOpen: cartModalIsOpen, onOpen: openCartModal, onClose: closeCartModal } = useDisclosure();
  return (
    <Flex
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
      bg={menuBg}
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
      p="10px"
      borderRadius="30px"
      boxShadow={shadow}
    >
      <Flex
        bg={ethBg}
        display={secondary ? "flex" : "none"}
        borderRadius="30px"
        ms="auto"
        p="6px"
        align="center"
        me="6px"
      >
        <Flex
          align="center"
          justify="center"
          bg={ethBox}
          h="29px"
          w="29px"
          borderRadius="30px"
          me="7px"
        >
          <Icon color={ethColor} w="9px" h="14px" as={FaEthereum} />
        </Flex>

      </Flex>
      <SidebarResponsive routes={routes} />
      <Menu>

        <MenuList
          boxShadow={shadow}
          p="20px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
          mt="22px"
          me={{ base: "30px", md: "unset" }}
          minW={{ base: "unset", md: "400px", xl: "450px" }}
          maxW={{ base: "360px", md: "unset" }}
        >
          <Flex flexDirection="column">
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              px="0"
              borderRadius="8px"
              mb="10px"
            >
              <ItemContent info="infor" aName="Name" />
            </MenuItem>
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              px="0"
              borderRadius="8px"
              mb="10px"
            >
              <ItemContent info="infor" aName="name" />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
      <Menu>
        <IconButton
          icon={(
            <Box position="relative">
              <MdShoppingCart size="24" tm="100px" />
              <Badge colorScheme="purple" boxShadow='md' position="absolute" boxSize="20px" borderRadius="full" display="flex" alignItems="center" justifyContent="center" top="-18px" right="-10px" fontSize='.7em'>
                {totalQuantity}
              </Badge>
            </Box>
          )}
          color={navbarIcon}
          _hover={{ color: "secondaryGray.900" }} // replace "yourColor" with the color you want when hovering
          onClick={openCartModal}
        />
        <CartModal isOpen={cartModalIsOpen} onClose={closeCartModal} />
      </Menu>
      <Menu>
        <IconButton
          icon={(
            <Box position="relative">
              <BsShop size="24" tm="100px" />
          
            </Box>
          )}
          color={navbarIcon}
          _hover={{ color: "secondaryGray.900" }} 
          onClick={openBuyOptionsModal}
        />
        <BuyOptionsModal isOpen={buyOptionsModalIsOpen} onClose={closeBuyOptionsModal} />
      </Menu>

      <Menu>
        <MenuButton p="0px">
          <Avatar
            _hover={{ cursor: "pointer" }}
            color="white"
            name={user.user.username}
            bg="#11047A"
            size="sm"
            w="40px"
            h="40px"
          />
        </MenuButton>
        <MotionMenuList
          boxShadow={shadow}
          p="0px"
          mt="10px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
          variants={menuVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
        >
          <Flex w="100%" mb="0px">
            <Text
              ps="20px"
              pt="16px"
              pb="10px"
              w="100%"
              borderBottom="1px solid"
              borderColor={borderColor}
              fontSize="sm"
              fontWeight="700"
              color={textColor}
            >
              👋&nbsp; Hey, {user.user.username}
            </Text>
          </Flex>

          <Flex flexDirection="column" p="10px">

            <Flex flexDirection="column" p="10px">
              <MotionMenuItem
                _hover={{ bg: 'none' }}
                _focus={{ bg: 'none' }}
                color={textColor}
                borderRadius="8px"
                px="14px"
                onClick={onOpen} // open the modal when this item is clicked
                variants={menuItemVariants}
              >
                <Icon as={MdEdit} w={5} h={5} mr={2} />
                <EditProfileModal isOpen={isOpen} onClose={onClose} />
              </MotionMenuItem>

              <MenuItem
                _hover={{ bg: "none" }}
                _focus={{ bg: "none" }}
                color="red.400"
                borderRadius="8px"
                px="14px"
              >
                <Link w="100%" href="#">
                  <Button
                    w="100%"
                    h="44px"
                    variant="no-hover"
                    color={textColor}
                    bg="transparent"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </Button>
                </Link>
              </MenuItem>
            </Flex>
          </Flex>
        </MotionMenuList>
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};