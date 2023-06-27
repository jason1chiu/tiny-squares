// React imports
import React, { useState, useEffect } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";

// Chakra imports
import { Box, Flex, Stack, Button } from "@chakra-ui/react";

// File imports
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";

function SidebarContent(props) {
  const { routes } = props;
  const [installEvent, setInstallEvent] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallEvent(e);
    });
  }, []);

  // Add this function somewhere in your component, or import it from elsewhere
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
    <Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
      <Brand />
      <Stack direction='column' mb='auto' mt='8px'>
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
          <Links routes={routes} />
          {/* Add the download button here */}
          <Button leftIcon={<IoCloudDownloadOutline />} onClick={handleDownload} m={4}>
            Download
          </Button>
        </Box>
      </Stack>
      <Box
        ps='20px'
        pe={{ md: "16px", "2xl": "0px" }}
        mt='60px'
        mb='40px'
        borderRadius='30px'
      >
      </Box>
    </Flex>
  );
}

export default SidebarContent;

// import { Box, Flex, Stack } from "@chakra-ui/react";

// import Brand from "components/sidebar/components/Brand";
// import Links from "components/sidebar/components/Links";

// import React from "react";

// function SidebarContent(props) {
//     const { routes } = props;
//     // SIDEBAR
//     return (
//       <Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
//         <Brand />
//         <Stack direction='column' mb='auto' mt='8px'>
//           <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
//             <Links routes={routes} />
//           </Box>
//         </Stack>

//         <Box
//         ps='20px'
//         pe={{ md: "16px", "2xl": "0px" }}
//         mt='60px'
//         mb='40px'
//         borderRadius='30px'>
//       </Box>
//     </Flex>
//   );
// }

// export default SidebarContent;