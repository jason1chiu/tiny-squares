import React from 'react';
import { Center, Box } from '@chakra-ui/react';
import { Link } from "react-router-dom";

function CancelPage() {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        fontSize="50px"
      >
      <p>Your order has been cancelled. <br />

        <Link to={"/"}>
            <Center fontSize="2rem" css={{
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: 'blue',
                },
              }}>Back to Main Page</Center>
        </Link>
      </p>
    
      </Box>
    </>
  );
}

export default CancelPage;
