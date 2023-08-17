// React imports from "react";
import { MdEdit } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import EditProfileModal from "components/modal/EditProfileModal";
import { MdNotificationsNone } from 'react-icons/md';
import { BsShop } from "react-icons/bs";
import { CartModal } from "components/shared/store/components/CartModal";
import { useCookies } from "react-cookie";
// import Tutorial from "components/navbar/tutorial";
import premiumBadge from "assets/img/badge/premium.png";
import { motion } from "framer-motion";

// Chakra imports
import {
  Avatar,
  Button,
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
  IconButton,
  Box,
} from "@chakra-ui/react";

import PropTypes from "prop-types";

// Apollo imports
import { useMutation } from "@apollo/client";

// File imports
import routes from "routes";
import { ItemContent } from "components/menu/ItemContent";
import { SidebarResponsive } from "components/sidebar/Sidebar";
import { LOGOUT_USER } from "utils/mutations";
import { useAuth } from "contexts/auth.context";
import { GET_ME } from "utils/queries";
import { useQuery } from "@apollo/client";

export default function HeaderLinks(props) {
  let [, , removeCookie] = useCookies();
  let { user, setUser } = useAuth();
  const { loading, data } = useQuery(GET_ME);
  const textColorBrand = useColorModeValue('brand.700', 'brand.400');
  const [logout] = useMutation(LOGOUT_USER);
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const MotionMenuList = motion(MenuList);
  const MotionMenuItem = motion(MenuItem);
  const menuVariants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const menuItemVariants = {
    open: { y: 0, opacity: 1, scale: 1 },
    closed: { y: 50, opacity: 0, scale: 0.3 },
  };

  const handleLogout = async () => {
    try {
      let email = data.me.email;
      await logout({ variables: { email } });
      setUser(false);
      removeCookie("token");
      localStorage.clear();
      setTimeout(() => history.push("/"), 100);
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

  const {
    isOpen: cartModalIsOpen,
    onOpen: openCartModal,
    onClose: closeCartModal,
  } = useDisclosure();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    user &&
    user.user && (
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
          <MenuButton p="0px">
            <Icon mt="9px" as={MdNotificationsNone} color={navbarIcon} w="24px" h="24px" />
          </MenuButton>
          <MenuList
            boxShadow={shadow}
            p="20px"
            borderRadius="20px"
            bg={menuBg}
            border="none"
            mt="22px"
            me={{ base: '30px', md: 'unset' }}
            minW={{ base: 'unset', md: '400px', xl: '450px' }}
            maxW={{ base: '360px', md: 'unset' }}>
            <Flex justify="space-between" w="100%" mb="20px">
              <Text fontSize="md" fontWeight="600" color={textColor}>
                Notifications
              </Text>
              <Text fontSize="sm" fontWeight="500" color={textColorBrand} ms="auto" cursor="pointer">
                Mark all read
              </Text>
            </Flex>
            <Flex flexDirection="column">
              <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} px="0" borderRadius="8px" mb="10px">
                <ItemContent info="Horizon UI Dashboard PRO" aName="Alicia" />
              </MenuItem>
              <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} px="0" borderRadius="8px" mb="10px">
                <ItemContent info="Horizon Design System Free" aName="Josh Henry" />
              </MenuItem>
            </Flex>
          </MenuList>
        </Menu>
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
                <ItemContent info="info" aName="name" />
              </MenuItem>
            </Flex>
          </MenuList>
        </Menu>
        <Menu>
          <IconButton
            icon={
              <Box position="relative">
                {!data.me.premium && (
                  <>
                    <BsShop size="24" tm="100px" />
                    <img
                      src={premiumBadge}
                      alt="Premium Badge"
                      style={{
                        position: "absolute",
                        top: "-18px",
                        right: "-10px",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  </>
                )}
              </Box>
            }
            color={navbarIcon}
            _hover={{ color: "secondaryGray.900" }}
            onClick={openCartModal}
          />
          <CartModal isOpen={cartModalIsOpen} onClose={closeCartModal} />
        </Menu>
        <Menu>
          <MenuButton p="0px">
            <Avatar
              _hover={{ cursor: "pointer" }}
              color="white"
              src={data.me.avatar}
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
                  _hover={{ bg: "none" }}
                  _focus={{ bg: "none" }}
                  color={textColor}
                  borderRadius="8px"
                  px="14px"
                  onClick={onOpen} // open the modal when this item is clicked
                  variants={menuItemVariants}
                >
                  <Icon as={MdEdit} w={5} h={5} mr={2} /> Edit Profile
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
    )
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
