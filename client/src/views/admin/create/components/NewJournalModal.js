import { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input } from "@chakra-ui/react";

function NewJournalModal({ isOpen, onClose, onSubmit }) {
    const [journalName, setJournalName] = useState("");

    const handleInputChange = (event) => {
        setJournalName(event.target.value);
    };

    const handleSubmit = () => {
        onSubmit(journalName);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create a new journal</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input value={journalName} onChange={handleInputChange} placeholder="Journal name" />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        Go
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default NewJournalModal;