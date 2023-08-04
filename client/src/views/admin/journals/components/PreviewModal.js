// import React, { useState } from "react";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Button,
//   useColorModeValue,
//   IconButton,
// } from "@chakra-ui/react";
// import Overview from "components/shared/calendar/index";
// import { MdHelpOutline } from "react-icons/md";
// import Joyride, { STATUS, LIFECYCLE } from 'react-joyride';

// const Overlay = () => <ModalOverlay bg="blackAlpha.700" />;

// export default function JournalModal({ isOpen, onClose, journal }) {
//   const titleColor = useColorModeValue("navy.700", "white");
//   const [runTutorial, setRunTutorial] = useState(false);
//   const navbarIcon = useColorModeValue("gray.400", "white");
//   const tutorialSteps = [
//     {
//       target: '#label-step',
//       content: 'Create a new journal by clicking the + button',
//     },
//     {
//       target: '#color-step',
//       content: 'Your Journals will appear here. Click the view button to update your journal.',
//     },
//     {
//       target: '#add-step',
//       content: 'Your Journals will appear here. Click the view button to update your journal.',
//     },
//     {
//       target: '#legend-step',
//       content: 'Your Journals will appear here. Click the view button to update your journal.',
//     },
//     {
//       target: '#cell-step',
//       content: 'Your Journals will appear here. Click the view button to update your journal.',
//     },
//   ];

//   const handleJoyrideCallback = (data) => {
//     const { status, step, lifecycle, type } = data;
//     const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

//     const modalBody = document.querySelector('.modal-body'); // specify the selector for your ModalBody

//     if (lifecycle === LIFECYCLE.INIT) {
//       const element = document.querySelector(step.target);
//       if (element && modalBody) {
//         const offsetTop = getOffsetTop(element, modalBody);
//         modalBody.scrollTop = offsetTop;
//       }
//     }

//     if (type === "step:after") {
//       const tooltip = document.querySelector('.react-joyride__tooltip');

//       if (tooltip) {
//         tooltip.style.top = parseInt(tooltip.style.top, 10) + 200 + "px";
//       }
//     }

//     if (finishedStatuses.includes(status)) {
//       setRunTutorial(false);
//       document.body.style.overflow = 'auto';
//     }
//   };

//   const getOffsetTop = (element, parent) => {
//     let offsetTop = 0;
//     while (element && element !== parent) {
//       offsetTop += element.offsetTop;
//       element = element.offsetParent;
//     }
//     return offsetTop;
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl" scrollBehavior="inside">
//       <Joyride
//         callback={handleJoyrideCallback}
//         continuous
//         run={runTutorial}
//         steps={tutorialSteps}
//         scrollToFirstStep={false}
//         scrollToSteps={false}
//         styles={{
//           options: {
//             zIndex: 10000,
//           },
//         }}
//       />
//       <Overlay />
//       <ModalContent>
//         <ModalHeader color={titleColor} borderBottom="1px" borderBottomColor="secondaryGray.200">{journal.name}{" "}
//           <IconButton
//             icon={<MdHelpOutline size="24" />}
//             color={navbarIcon}
//             variant="ghost"
//             _hover={{ color: "secondaryGray.900" }}
//             onClick={() => {
//               setRunTutorial(true);
//               document.body.style.overflow = 'hidden';
//             }}
//           /> 
//         </ModalHeader>
//         <ModalCloseButton />
//         <ModalBody overflowY="auto" maxHeight="70vh">
//           <Overview journal_id={journal._id} />
//         </ModalBody>
//         <ModalFooter borderTop="1px" borderTopColor="secondaryGray.200">
//           <Button onClick={onClose}>Close</Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// }

import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useColorModeValue,
  IconButton,
  Box,
} from "@chakra-ui/react";
import Overview from "components/shared/calendar/index";
import Legend from "components/shared/calendar/components/legend/Legend";
import { MdHelpOutline } from "react-icons/md";
import Joyride, { STATUS, LIFECYCLE } from 'react-joyride';
import { useQuery } from "@apollo/client";
import { GET_JOURNAL } from "utils/queries";
import { tutorialStyles } from "theme/components/tutorial";

const Overlay = () => <ModalOverlay bg="blackAlpha.700" />;

export default function JournalModal({ isOpen, onClose, journal }) {
  const { data, refetch } = useQuery(GET_JOURNAL, {
    variables: {
      id: journal._id,
    },
  });
  const titleColor = useColorModeValue("navy.700", "white");
  const [runTutorial, setRunTutorial] = useState(false);
  const navbarIcon = useColorModeValue("gray.400", "white");
  const tutorialSteps = [
    {
      target: '#label-step',
      content: 'Create a new journal by clicking the + button',
    },
    {
      target: '#color-step',
      content: 'Your Journals will appear here. Click the view button to update your journal.',
    },
    {
      target: '#add-step',
      content: 'Your Journals will appear here. Click the view button to update your journal.',
    },
    {
      target: '#legend-step',
      content: 'Your Journals will appear here. Click the view button to update your journal.',
    },
    {
      target: '#cell-step',
      content: 'Your Journals will appear here. Click the view button to update your journal.',
      placement: 'center',
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { status, step, lifecycle, type } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    const modalBody = document.querySelector('.modal-body'); // specify the selector for your ModalBody

    if (lifecycle === LIFECYCLE.INIT) {
      const element = document.querySelector(step.target);
      if (element && modalBody) {
        const offsetTop = getOffsetTop(element, modalBody);
        modalBody.scrollTop = offsetTop;
      }
    }

    if (type === "step:after") {
      const tooltip = document.querySelector('.react-joyride__tooltip');

      if (tooltip) {
        tooltip.style.top = parseInt(tooltip.style.top, 10) + 200 + "px";
      }
    }

    if (finishedStatuses.includes(status)) {
      setRunTutorial(false);
      document.body.style.overflow = 'auto';
    }
  };

  const getOffsetTop = (element, parent) => {
    let offsetTop = 0;
    while (element && element !== parent) {
      offsetTop += element.offsetTop;
      element = element.offsetParent;
    }
    return offsetTop;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl" scrollBehavior="inside">
      <Joyride
  callback={handleJoyrideCallback}
  continuous
  run={runTutorial}
  steps={tutorialSteps}
  scrollToFirstStep={false}
  scrollToSteps={false}
  styles={tutorialStyles}
/>
      <Overlay />
      <ModalContent>
      <ModalHeader color={titleColor} borderBottom="1px" borderBottomColor="secondaryGray.200">
  <Box display="flex" alignItems="center" width="100%">
    <Box display="flex" alignItems="center">
      {journal.name}{" "}
      <IconButton
        icon={<MdHelpOutline size="20" />}
        color={navbarIcon}
        variant="ghost"
        _hover={{ color: "secondaryGray.900" }}
        onClick={() => {
          setRunTutorial(true);
          document.body.style.overflow = 'hidden';
        }}
      /> 
    </Box>
    <Box flexGrow={1}></Box> 
    <Legend
      journalId={journal._id}
      refetchEntries={refetch} 
    />
    <Box flexGrow={1}></Box> 
    <ModalCloseButton />
  </Box>
</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto" maxHeight="70vh" id="cell-step">
          <Overview journal_id={journal._id} data={data} refetch={refetch} />
        </ModalBody>
        <ModalFooter borderTop="1px" borderTopColor="secondaryGray.200">
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}