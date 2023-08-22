import React, { useEffect } from 'react';
import { Center, Box } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import Confetti from 'react-confetti';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER_PREMIUM_STATUS } from '../../../utils/mutations';
import { useLocation } from "react-router-dom";
import { GET_ME } from "utils/queries";

function SuccessPage() {
  const location = useLocation();
  const {loading, data, error } = useQuery(GET_ME);
  const currentUserId = localStorage.getItem('user_id');
  const urlParams = new URLSearchParams(location.search);
  const userId = urlParams.get("userId");
  let content;

  const [updateUserPremiumStatus] = useMutation(UPDATE_USER_PREMIUM_STATUS);
  
  useEffect(() => {

    if (currentUserId && userId === currentUserId) {
 
      updateUserPremiumStatus({
        variables: {
          userId: userId,
          premium: true, 
        },
      })
    }
  }, [updateUserPremiumStatus, currentUserId, userId]);

  if (loading) {
    return <p>Loading...</p>; // Display a loading indicator if data is being fetched
  }

  if (error) {
    return <p>Error: {error.message}</p>; // Display an error message if there's an error
  }


  if (currentUserId && userId === currentUserId) {
    content = (
      <>
        <Confetti />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          fontSize="50px"
        >
          <p><Center>Thank You For Your Support, {data?.me?.username}! 🎊<br /></Center> 
          <p><Center>You now have premium FOREVER!</Center></p>

            <Link to={"/admin/dashboard"}>
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
  } else {
    content = (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        fontSize="50px"
      >
        <p>Access Denied! You are not authorized to view this page.</p>
  
      </Box>
    );
  }

  return <>{content}</>;
}

export default SuccessPage;
