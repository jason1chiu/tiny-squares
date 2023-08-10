import React, { useEffect } from 'react';
import { Center, Box } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import Confetti from 'react-confetti';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_PREMIUM_STATUS } from '../../../utils/mutations';
import { useLocation } from "react-router-dom";

function SuccessPage() {
  const location = useLocation();
  const currentUserId = localStorage.getItem('user_id');
  const urlParams = new URLSearchParams(location.search);
  const userId = urlParams.get("userId");

  const [updateUserPremiumStatus] = useMutation(UPDATE_USER_PREMIUM_STATUS);
  
  useEffect(() => {
    // Extract userId from the query parameter using useLocation()

    console.log(userId);
    console.log(currentUserId);

    if (currentUserId && userId === currentUserId) {
      // Call the updateUserPremiumStatus mutation
      updateUserPremiumStatus({
        variables: {
          userId: userId,
          premium: true, 
        },
      })
    }
  }, [updateUserPremiumStatus, currentUserId, userId]);


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
