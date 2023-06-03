import React, { useState } from 'react';
import { Box, Center, useColorModeValue } from '@chakra-ui/react';
import { MdAddCircle } from 'react-icons/md';
import Card from "components/card/card";
import NewJournalModal from "views/admin/create/components/NewJournalModal";

function NewCard() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const iconColor = useColorModeValue('secondaryGray.600', 'secondaryGray.600');
    const iconHoverColor = useColorModeValue('brand.500', 'white');

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleAddJournal = async (journalName) => {
        const response = await fetch('/api/journal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: journalName }),
        });
    
        if (response.ok) {
            const newJournal = await response.json();
            // Here you could add newJournal to your component state,
            // which will automatically re-render the component to show the new journal
            closeModal();
        } else {
            console.error('Error:', response);
        }
    };

    return (
        <Card 
            p='20px'
            _hover={{
                boxShadow: 'lg',
            }}
            onClick={openModal} // Open the modal when the card is clicked
        >
            <Box
                h='200px'
                display='flex'
                alignItems='center'
                justifyContent='center'
                borderRadius='md'
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                cursor='pointer'
                transition='color 0.2s'
                color={hover ? iconHoverColor : iconColor}
            >
                <Center>
                    <MdAddCircle size='150px' />
                </Center>
            </Box>
            <NewJournalModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleAddJournal} />
        </Card>
    );
}

export default NewCard;