import { Button, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import React, { useState, useEffect } from "react";
import Logo from "assets/img/ts.png"

function DownloadButton() {
  const [installEvent, setInstallEvent] = useState(null);
  const bgColor = "linear-gradient(135deg, #6f2dbd 0%, #b69dde 100%)";
  const borderColor = useColorModeValue("white", "navy.800");

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallEvent(e);
    });
  }, []);

  const handleDownload = () => {
    if (!installEvent) {
      return;
    }
    // Show the prompt
    installEvent.prompt();
    // Wait for the user to respond to the prompt
    installEvent.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      setInstallEvent(null);
    });
  };

  return (
    <Flex
      justify='center'
      direction='column'
      align='center'
      bg={bgColor}
      borderRadius='30px'
      position='relative'
      mr={{base: "5", md: "0", xl: "5"}}
      ml="2">
      <Flex
        border='5px solid'
        borderColor={borderColor}
        bg='linear-gradient(135deg, #6f2dbd 0%, #b69dde 100%)'
        borderRadius='50%'
        w='84px'
        h='84px'
        align='center'
        justify='center'
        mx='auto'
        position='absolute'
        left='50%'
        top='-47px'
        transform='translate(-50%, 0%)'>
        <Image src={Logo} w='40px' h='40px' />
      </Flex>
      <Flex
        direction='column'
        mb='12px'
        align='center'
        justify='center'
        px='15px'
        pt='55px'>
        <Text
          fontSize={{ base: "lg", xl: "18px" }}
          color='white'
          fontWeight='bold'
          lineHeight='150%'
          textAlign='center'
          px='10px'
          mt="10px"
          mb='6px'>
          Download TinySquares
        </Text>
        <Text
          fontSize='14px'
          color={"white"}
          fontWeight='500'
          px='10px'
          mb='6px'
          textAlign='center'>
          Click the button below to download the application!
        </Text>
      </Flex>
      <Button
        leftIcon={<IoCloudDownloadOutline />}
        onClick={handleDownload}
        bg='whiteAlpha.300'
        _hover={{ bg: "whiteAlpha.200" }}
        _active={{ bg: "whiteAlpha.100" }}
        mb={{ sm: "16px", xl: "24px" }}
        color={"white"}
        fontWeight='regular'
        fontSize='sm'
        minW='185px'
        mx='auto'>
        Download
      </Button>
    </Flex>
  );
}

export default DownloadButton;