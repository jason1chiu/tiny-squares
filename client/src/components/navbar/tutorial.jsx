import React, { useState, useEffect } from "react";
import { Box, Text, Image, Progress, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useCookies } from 'react-cookie';
import sidebar from "assets/img/tutorial/sidebar.webp";
import createJournal from "assets/img/tutorial/create.webp";
import journals from "assets/img/tutorial/journals.webp";
import pixelJournal from "assets/img/tutorial/pixelj.webp";
import legend from "assets/img/tutorial/legend.webp";
import updateJournal from "assets/img/tutorial/updatejournal.webp";
import pie from "assets/img/tutorial/pie.webp";
import usage from "assets/img/tutorial/usage.webp";

const modalContent = [
    "Welcome to TinySquares pixel journal app!",
    (
        <Box display="flex" justifyContent="space-between">
            <Image bgImage={sidebar} />
            <Text>To add new journal, navigate to the Journals page via the sidebar or Journals section on the Dashboard. You can also download the desktop app by clicking the Download button.</Text>
        </Box>
    ),
    (
        <Box display="flex" justifyContent="space-between">
            <Image bgImage={createJournal} />
            <Text>To Create a new journal, click the +</Text>
        </Box>
    ),
    (
        <Box display="flex" justifyContent="space-between">
            <Image bgImage={journals} />
            <Text>You can edit, update or delete your journals on the Journals page</Text>
        </Box>
    ),
    (
        <Box display="flex" justifyContent="space-between">
            <Image bgImage={pixelJournal} />
            <Text>You can update your journal by clicking the view button.  To add to your legend, enter a label and click the coloured icon to pick the colour. To view legend, select the chevron. To update the journal, select the cell based on the current date.</Text>
        </Box>
    ),
    (
        <Box display="flex" justifyContent="space-between">
            <Image bgImage={legend} />
            <Text>Expand and collapse the legend with the chevron button. Edit a label by clicking the colour icon.  Delete a label by selecting the trash icon</Text>
        </Box>
    ),
    (
        <Box display="flex" justifyContent="space-between">
            <Image bgImage={updateJournal} />
            <Text>When a journal cell is selected, you can select a label based on the legend you have made and enter a journal entry that will be saved and can be viewed later.</Text>
        </Box>
    ),
    (
        <Box display="flex" justifyContent="space-between">
            <Image bgImage={pie} />
            <Text>On the Dashboard, you can view your journal entries in a pie chart.</Text>
        </Box>
    ),
    (
        <Box display="flex" justifyContent="space-between">
            <Image bgImage={usage} />
            <Text>Journal data for every journal will be displayed in the Journal Usage Bar Graph.</Text>
        </Box>
    ),
    (
        <Box display="flex" justifyContent="space-between">
            <Text>You're all set! Exit to continue. To view tutorial again, select the icon on the navbar.</Text>
        </Box>
    ),
];

const steps = [
    {
        target: ".my-first-step",
    },
    {
        target: ".my-second-step",
    },
    {
        target: ".my-third-step",
    },
    {
        target: ".my-fourth-step",
    },
    {
        target: ".my-fifth-step",
    },
    {
        target: ".my-sixth-step",
    },
    {
        target: ".my-seventh-step",
    },
    {
        target: ".my-eighth-step",
    },
    {
        target: ".my-ninth-step",
    },
    {
        target: ".my-tenth-step",
    },
];

export default function Tutorial({ setRun }) {
    const [stepIndex, setStepIndex] = useState(0);
    const [cookies, setCookie] = useCookies(['hasSeenTutorial']);
    const [run, setRunLocal] = useState(false);

    useEffect(() => {
        if (!cookies.hasSeenTutorial) {
            setRunLocal(true);
            setRun(true);
        }
    }, [cookies]);

    const handleJoyrideCallback = (data) => {
        const { status, index } = data;

        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            setRunLocal(false);
            setRun(false);
            setCookie('hasSeenTutorial', 'true');
        } else {
            setStepIndex(index);
        }
    };

    return (
        <Box className="Tutorial">
            <Joyride steps={steps} callback={handleJoyrideCallback} run={run} continuous showProgress showSkipButton />
            <Modal isOpen={run}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        {modalContent[stepIndex]}
                        <Progress colorScheme="purple" size="md" value={((stepIndex + 1) / steps.length) * 100} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}