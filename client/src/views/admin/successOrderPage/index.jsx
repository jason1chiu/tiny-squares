import React, { useEffect } from 'react';
import { Center, Box } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import Confetti from 'react-confetti';

function SuccessPage() {
  return (
    <>
      <Confetti />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        fontSize="50px"
      >
        <p>Thank You For Your Order! 🎊 <br />

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

export default SuccessPage;
