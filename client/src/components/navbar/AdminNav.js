import {
  Box,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Link,
  Text,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import LinksAdminNav from "components/navbar/LinksAdminNav";
import Joyride, { STATUS } from "react-joyride";
import { MdHelpOutline } from "react-icons/md";
import { tutorialStyles } from "theme/components/tutorial"; // Make sure this path is correct


export default function AdminNavbar(props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);

    return () => {
      window.removeEventListener("scroll", changeNavbar);
    };
  });

  const { secondary, message, brandText } = props;
  const [runTutorial, setRunTutorial] = useState(false);

  const tutorialSteps = [
    {
      target: "#entries-step", // Add appropriate target elements
      content:
        "Compiles your entries from individual journals and displays your data in a pie chart. Hover over the chart for more information.",
        placement: "right",
    },
    {
      target: "#usage-step", // Add appropriate target elements
      content:
        "Compiles data from all your journals and displays it in a bar chart.",
        placement: "right",
    },
    {
      target: "#jlink-step", // Add appropriate target elements
      content: "You can navigate to the journal page by clicking the link.",
      placement: "right",
    },
    {
      target: "#update-step", 
      content:
        "Your journals that have not yet been updated will appear here. Clicking on them will allow you to update them.",
        placement: "left",
    },
    {
    target: "#badge-step", 
    content:
      "You accumulate badges as you update your journals.",
      placement: "right",
  },
  {
    target: "#friend-step", 
    content:
      "You can view friends here. You can view all or add new friends by clicking the Friends link",
      placement: "left",
  },
    
  ];
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRunTutorial(false);
      document.body.style.overflow = "auto"; // Reset overflow when the tutorial ends
    }
  };
  let mainText = useColorModeValue("navy.700", "white");
  let secondaryText = useColorModeValue("gray.700", "white");
  let navbarPosition = "fixed";
  let navbarFilter = "none";
  let navbarBackdrop = "blur(20px)";
  let navbarShadow = "none";
  let navbarBg = useColorModeValue(
    "rgba(244, 247, 254, 0.2)",
    "rgba(11,20,55,0.5)"
  );
  let navbarBorder = "transparent";
  let secondaryMargin = "0px";
  let paddingX = "15px";
  let gap = "0px";
  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <Box
      position={navbarPosition}
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      backgroundPosition="center"
      backgroundSize="cover"
      borderRadius="16px"
      borderWidth="1.5px"
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: "center" }}
      display={secondary ? "block" : "flex"}
      minH="75px"
      justifyContent={{ xl: "center" }}
      lineHeight="25.6px"
      mx="auto"
      mt={secondaryMargin}
      pb="8px"
      right={{ base: "12px", md: "30px", lg: "30px", xl: "30px" }}
      px={{
        sm: paddingX,
        md: "10px",
      }}
      ps={{
        xl: "12px",
      }}
      pt="8px"
      top={{ base: "12px", md: "16px", xl: "18px" }}
      w={{
        base: "calc(100vw - 6%)",
        md: "calc(100vw - 8%)",
        lg: "calc(100vw - 6%)",
        xl: "calc(100vw - 350px)",
        "2xl": "calc(100vw - 365px)",
      }}
    >
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        run={runTutorial}
        steps={tutorialSteps}
        scrollToFirstStep={true}
        scrollToSteps={true}
        styles={tutorialStyles}
      />
      <Flex
        w="100%"
        flexDirection={{
          sm: "column",
          md: "row",
        }}
        alignItems={{ xl: "center" }}
        mb={gap}
      >
        <Box mb={{ sm: "8px", md: "0px" }}>
          <Breadcrumb>
            <BreadcrumbItem color={secondaryText} fontSize="sm" mb="5px">
              <BreadcrumbLink href="#" color={secondaryText}>
                Pages
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem color={secondaryText} fontSize="sm">
              <BreadcrumbLink href="#" color={secondaryText}>
                {brandText}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Link
            color={mainText}
            href="#"
            bg="inherit"
            borderRadius="inherit"
            fontWeight="bold"
            fontSize="34px"
            _hover={{ color: { mainText } }}
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
          >
            {brandText}
          </Link>
          {brandText === "Dashboard" ? (
  <IconButton
    icon={<MdHelpOutline size="20" />}
    color="secondaryGray.500"
    mb="10px"
    bgColor="transparent"
    _hover={{ color: "secondaryGray.700" }}
    onClick={() => {
      setRunTutorial(true);
      document.body.style.overflow = "hidden";
    }}
  />
) : (
  ""
)}
</Box>
        <Box ms="auto" w={{ sm: "100%", md: "unset" }}>
          <LinksAdminNav
            onOpen={props.onOpen}
            logoText={props.logoText}
            secondary={props.secondary}
            fixed={props.fixed}
            scrolled={scrolled}
          />
        </Box>
      </Flex>
      {secondary ? <Text color="white">{message}</Text> : null}
    </Box>
  );
}

AdminNavbar.propTypes = {
  brandText: PropTypes.string,
  variant: PropTypes.string,
  secondary: PropTypes.bool,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
};
