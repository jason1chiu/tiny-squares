import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import Overview from "components/shared/calendar/index";
import { MdHelpOutline } from "react-icons/md";
import Joyride, { CallBackProps, STATUS } from 'react-joyride';

const Overlay = () => <ModalOverlay bg="blackAlpha.700" />;

export default function JournalModal({ isOpen, onClose, journal }) {
  const titleColor = useColorModeValue("navy.700", "white");
  const [runTutorial, setRunTutorial] = useState(false);
  const navbarIcon = useColorModeValue("gray.400", "white");
  const modalBodyRef = React.useRef(null);
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
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { status, step, type } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
  
    if (type === 'step:before') {
      const element = document.querySelector(step.target);
      if (element && modalBodyRef.current) {
        const offsetTop = getOffsetTop(element);
        modalBodyRef.current.scrollTop = offsetTop;
      }
    }
  
    if (finishedStatuses.includes(status)) {
      setRunTutorial(false);
      document.body.style.overflow = 'auto';
    }
  };
  const getOffsetTop = element => {
    let offsetTop = 0;
    while(element) {
      offsetTop += element.offsetTop;
      element = element.offsetParent;
    }
    return offsetTop;
  }
  return (
    <Modal  isOpen={isOpen} onClose={onClose} isCentered size="xl" scrollBehavior="inside">
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        run={runTutorial}
        steps={tutorialSteps}
        scrollToFirstStep={false}
        scrollToSteps={true}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
      <Overlay />
      <ModalContent>
        <ModalHeader color={titleColor} borderBottom="1px" borderBottomColor="secondaryGray.200">{journal.name}{" "} <IconButton
            icon={<MdHelpOutline size="24" />}
            color={navbarIcon}
            variant="ghost"
            _hover={{ color: "secondaryGray.900" }}
            onClick={() => {
              setRunTutorial(true);
              document.body.style.overflow = 'hidden'; // Prevent scrolling on the body
            }}
          /> </ModalHeader>
        <ModalCloseButton />
        <ModalBody ref={modalBodyRef}>
          <Overview journal_id={journal._id}/>
        </ModalBody>

        <ModalFooter borderTop="1px" borderTopColor="secondaryGray.200">
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
