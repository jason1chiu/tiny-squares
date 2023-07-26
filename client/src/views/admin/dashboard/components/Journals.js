
// import { Text, useColorModeValue, Link, Tooltip } from "@chakra-ui/react"; // <-- add Link and Tooltip imports
// import { useHistory } from "react-router-dom"; // <-- add useHistory import
// import Journal from "./Journal";
// import Journal1 from "assets/img/jp.png";
// import { GET_JOURNALS } from "utils/queries";

// import { useQuery } from "@apollo/client";

// import Card from "components/card/card.js";
// import React from "react";

// import { useAuth } from "contexts/auth.context";

// export default function Journals(props) {
//   const { data } = useQuery(GET_JOURNALS);
//   const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
//   const textColorSecondary = "gray.400";
//   const cardShadow = useColorModeValue(
//     "0px 18px 40px rgba(112, 144, 176, 0.12)",
//     "unset"
//   );

//   const hasJournals = data?.journals && data.journals.length > 0;

//   const history = useHistory(); 

//   return (
//     <Card mb={{ base: "0px", lg: "20px" }} align='center'>
//       <Tooltip label="View all journals" fontSize="md">
//         <Link
//           onClick={() => history.push('/admin/journals')}
//           color={textColorPrimary}
//           fontWeight="bold"
//           fontSize="2xl"
//           mt="10px"
//           mb="4px"
//           _hover={{ color: "gray.500" }}
//         >
//           Journals
//         </Link>
//       </Tooltip>
//       {hasJournals ? (
//         <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
//           Update your journals daily
//         </Text>
//       ) : (
//         <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
//           You have no journals yet!
//         </Text>
//       )}
//       {(data?.journals ?? []).map((journal, index) => (
//         <Journal
//           key={journal._id}
//           boxShadow={cardShadow}
//           mb="20px"
//           image={Journal1} 
//           ranking={index + 1}
//           title={journal.name}
//           journal={journal} 
//         />
//       ))}
//     </Card>
//   );
// }


import { Text, useColorModeValue, Link, Tooltip } from "@chakra-ui/react"; // <-- add Link and Tooltip imports
import { useHistory } from "react-router-dom"; // <-- add useHistory import
import Journal from "./Journal";
import Journal1 from "assets/img/jp.png";
import { GET_JOURNALS } from "utils/queries";

import { useQuery } from "@apollo/client";

import Card from "components/card/card.js";
import React from "react";

import { useAuth } from "contexts/auth.context";

export default function Journals(props) {
  const { data } = useQuery(GET_JOURNALS);
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  // Get today's date at midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const unupdatedJournals = data?.journals.filter(journal => {
    const lastUpdated = new Date(journal.lastUpdated);
    return lastUpdated.getTime() < today.getTime();
  });

  const hasJournals = unupdatedJournals?.length > 0;

  const history = useHistory();

  return (
    <Card mb={{ base: "0px", lg: "20px" }} align='center'>
      <Tooltip label="View all journals" fontSize="md">
        <Link
          onClick={() => history.push('/admin/journals')}
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mt="10px"
          mb="4px"
          _hover={{ color: "gray.500" }}
        >
          Journals
        </Link>
      </Tooltip>
      {hasJournals ? (
        <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
          Update your journals daily
        </Text>
      ) : (
        <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
          No Journals to Update
        </Text>
      )}
      {unupdatedJournals?.map((journal, index) => (
        <Journal
          key={journal._id}
          boxShadow={cardShadow}
          mb="20px"
          image={Journal1}
          ranking={index + 1}
          title={journal.name}
          journal={journal}
        />
      ))}
    </Card>
  );
}