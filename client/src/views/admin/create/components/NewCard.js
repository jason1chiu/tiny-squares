import React, { useState } from 'react';
import { Box, Center, useColorModeValue, ScaleFade } from '@chakra-ui/react';
import { MdAddCircle } from 'react-icons/md';
import Card from "components/card/card";

function NewCard({ onAddJournal }) {
    const [hover, setHover] = useState(false);
    const iconColor = useColorModeValue('secondaryGray.600', 'secondaryGray.600');
    const iconHoverColor = useColorModeValue('brand.500', 'white');

    return (
        <Card 
            p='20px'
            _hover={{
                boxShadow: 'lg',
            }}>
            <Box
                h='200px'
                display='flex'
                alignItems='center'
                justifyContent='center'
                borderRadius='md'
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={onAddJournal} // placeholder for the actual add new journal function
                cursor='pointer'
                transition='color 0.2s'
                color={hover ? iconHoverColor : iconColor}
            >
                <Center>
                    <MdAddCircle size='150px' />
                </Center>
            </Box>
        </Card>
    );
}

export default NewCard;